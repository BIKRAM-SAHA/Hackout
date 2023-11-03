const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = async (threshold = 10, dataPoints, newData) => {
    try {
        if (dataPoints[dataPoints.length - 1] !== 0 && dataPoints - 1 !== 0 && newData === 0) {
            return 'emergency';
        }

    }
    catch (err) {
        return { success: false, data: err };
    }
}