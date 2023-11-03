const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = async (threshold = 10, dataPoints, newData) => {
    try {
        if (dataPoints.length - 1 !== 0 && dataPoints[dataPoints.length - 2] !== 0 && newData === 0) {
            return 'emergency';
        }
        if(newData<threshold){
            return 'alert';
        }
        return 'normal';
    }
    catch (err) {
        return { success: false, data: err };
    }
}