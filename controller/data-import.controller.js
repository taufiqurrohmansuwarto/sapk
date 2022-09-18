const { default: prisma } = require("../lib/prisma");

const index = async (req, res) => {
    try {
        const type = req?.query?.type || "all";
        const { customId } = req?.user;
        const search = req?.query?.search || "";
        const page = parseInt(req?.query?.page) || 1;
        const limit = parseInt(req?.query?.limit) || 50;

        let query = {};
        if (type === "all") {
            query = {};
        } else if (type === "operator") {
            query = {
                where: {
                    operator: customId
                }
            };
        }

        if (search) {
            query = {
                // where nip or nama contains search
                where: {
                    ...query?.where,
                    OR: [
                        {
                            nama: {
                                contains: search,
                                mode: "insensitive"
                            }
                        },
                        {
                            nip: {
                                contains: search,
                                mode: "insensitive"
                            }
                        }
                    ]
                }
            };
        }

        const total = await prisma.data_import.count(query);

        const result = await prisma.data_import.findMany({
            ...query,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { created_at: "desc" }
        });
        res.json({
            data: result,
            total,
            page,
            limit
        });
    } catch (error) {
        console.log(error);
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
        const { customId } = req?.user;
        await prisma.data_import.deleteMany({
            where: {
                nip,
                operator: customId
            }
        });
        res.json({ message: "Data berhasil dihapus" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = {
    index,
    create,
    remove
};
