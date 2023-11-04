const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = async (schema_name, opn, trackerId, clause, value, date) => {
    let result
    try {
        if (opn == 'findFirst') {
            result = await prisma[schema_name].findFirst({
                where: {
                    tracker_id: trackerId,
                    date: new Date(date),
                }
            })
        }
        else if (opn == 'create') {
            result = await prisma[schema_name].create({
                data: {
                    tracker_id: trackerId,
                    [clause]: value,
                    date: new Date(date),
                }
            })
        }
        else if (opn == 'update') {
            result = await prisma[schema_name].updateMany({
                where: {
                    tracker_id: trackerId,
                    date: new Date(date),
                },
                data: {
                    [clause]: value,
                }
            })
        }
        return { success: true, data: result }
    }
    catch (err) {
        return { success: false, data: err.message };
    }
}