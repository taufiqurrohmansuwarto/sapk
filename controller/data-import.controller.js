const { default: prisma } = require("../lib/prisma");

const index = async (req, res) => {
    try {
        const result = await prisma.data_import.findMany({
            take: 6000,
            orderBy: {
                created_at: "desc"
            }
        });
        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const create = async (req, res) => {
    try {
        const { customId } = req?.user;
        const result = await prisma.data_import.create({
            data: {
                ...req.body,
                operator: customId
            }
        });
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const remove = async (req, res) => {
    try {
        const nip = req?.query?.nip;
        await prisma.data_import.delete({
            where: {
                nip
            }
        });
        res.json({ message: "Data berhasil dihapus" });
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    index,
    create,
    remove
};
