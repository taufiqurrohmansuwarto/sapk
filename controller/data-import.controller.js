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

const dashboard = async (req, res) => {
    try {
        //  get count of data_import group by operator
        const count = await prisma.$queryRaw`
       select count(*) as value, split_part(operator, '|', 2) as operator_name
from data_import
group by operator
ORDER BY count(*) DESC; 
        `; // get average of data_import by day group by operator

        const averageByDay = await prisma.$queryRaw`
            select count(*) as value, split_part(operator, '|', 2) as operator_name, to_char(created_at, 'dd-mm-yyy') as created_at
from data_import
group by operator, to_char(created_at, 'dd-mm-yyy')
ORDER BY to_char(created_at, 'dd-mm-yyy') DESC;
            `;

        const total = await prisma.$queryRaw`select count(*) from data_import;`;

        const data = { count, averageByDay, total: total[0]?.count };

        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = {
    dashboard,
    index,
    create,
    remove
};
