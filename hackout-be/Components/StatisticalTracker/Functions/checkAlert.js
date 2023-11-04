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
module.exports = async (window_size = 3, threshold, standard_min, standard_max, dataPoints, newData) => {
    try {
        if (newData < standard_min || newData > standard_max) {
            return 'emergency';
        }
        if (dataPoints.length - 1 !== 0) {
            const dataPoints = await alterDataPoints(dataPoints, standard_min, standard_max);
            const movingAverages = await calculateMovingAverage(dataPoints, window_size);
            for (let i = 0; i < movingAverages.length - 1; i++) {
                const diff = Math.abs(movingAverages[i] - movingAverages[i + 1]);
                if (diff > threshold) {
                    console.log("Change in pattern detected");
                    return 'alert';
                }
            }
        }
        return 'normal';
    }
    catch (err) {
        return { success: false, data: err };
    }
}