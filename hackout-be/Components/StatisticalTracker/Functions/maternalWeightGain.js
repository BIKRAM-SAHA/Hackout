const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = async (dataPoints, newData) => {
    try {
        if (dataPoints.length - 1 !== 0 && dataPoints[dataPoints.length-2]>newData){
            return 'alert';
        }
            return 'normal';
    }
    catch (err) {
        return { success: false, data: err };
    }
}