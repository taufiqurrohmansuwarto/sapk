// check apa sudah dientri apa belom
import moment from "moment";

const { default: prisma } = require("../lib/prisma");

const detail = async (req, res) => {
    try {
        const result = await prisma.data_import.findUnique({
            where: {
                nip: req?.query?.id
            }
        });

        if (!result) {
            res.json({
                code: 200,
                description: "Data belum dientri oleh petugas operator",
                type: "success",
                message: "Data Belum dientri"
            });
        } else {
            res.json({
                code: 200,
                description: `Data sudah dientri oleh ${
                    result?.operator
                } pada tanggal ${moment(result?.created_at).format(
                    "DD-MM-YYYY"
                )}`,
                message: "Data sudah dientri, ndak usah dientri lagi",
                type: "error"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ code: 400, message: "Internal Server Error" });
    }
};

module.exports = {
    detail
};
