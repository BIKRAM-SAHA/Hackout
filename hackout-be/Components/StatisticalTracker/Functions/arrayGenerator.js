const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (test, param_name) => {
    try {//array should be stored in increasing order of date entered and not on which entry is made
        let dataPoint = [];
        for (let i = 0; i < test.length; i++) {
            dataPoint.push(test[i][param_name]);
        }
        return dataPoint;
    } catch (err) {
        return { success: false, data: err };
    }
}
