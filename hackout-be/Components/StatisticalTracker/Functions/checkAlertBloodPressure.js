const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function alterDataPoints(dataPoints, standard_min, standard_max) {
    for (let i = 0; i < dataPoints.length; i++) {
        if (dataPoints[i] < standard_min) dataPoints[i] = standard_min;
        else if (dataPoints[i] > standard_max) dataPoints[i] = standard_max;
    }
    return dataPoints;
}

async function calculateMovingAverage(dataPoints, window_size) {
    const movingAverages = [];
    for (let i = window_size - 1; i < dataPoints.length; i++) {
        const window = dataPoints.slice(i - window_size + 1, i + 1);
        const average = window.reduce((sum, value) => sum + value, 0) / window_size;
        movingAverages.push(average);
    }
    return movingAverages;
}

module.exports = async (window_size = 3, threshold_sys,threshold_dias, sys_standard_min, sys_standard_max, dias_standard_min, dias_standard_max, systolicDataPoints, diastolicDataPoints, newSystolic, newDiastolic) => {
    try {
        if (newSystolic < sys_standard_min || newSystolic > sys_standard_max || newDiastolic < dias_standard_min || newDiastolic > dias_standard_max) {
            console.log('Emergency detected');
            return 'emergency';
        }

        if (systolicDataPoints.length - 1 !== 0) {
            let systolicDataPointsCopy = systolicDataPoints;
            let diastolicDataPointsCopy = diastolicDataPoints;

            systolicDataPointsCopy = await alterDataPoints(systolicDataPointsCopy, sys_standard_min, sys_standard_max);
            diastolicDataPointsCopy = await alterDataPoints(diastolicDataPointsCopy, dias_standard_min, dias_standard_max);

            const systolicMovingAverages = await calculateMovingAverage(systolicDataPointsCopy, window_size);
            const diastolicMovingAverages = await calculateMovingAverage(diastolicDataPointsCopy, window_size);

            for (let i = 0; i < systolicMovingAverages.length - 1; i++) {
                const systolicDiff = Math.abs(systolicMovingAverages[i] - systolicMovingAverages[i + 1]);
                const diastolicDiff = Math.abs(diastolicMovingAverages[i] - diastolicMovingAverages[i + 1]);

                if (systolicDiff > threshold_sys || diastolicDiff > threshold_dias) {
                    console.log("Change in blood pressure pattern detected");
                    return 'alert';
                }
            }
        }
        return 'normal';
    } catch (err) {
        console.log(err);
        return { success: false, data: err };
    }
}
