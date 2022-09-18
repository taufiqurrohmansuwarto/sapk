const { default: prisma } = require("../lib/prisma");
const ExcelJS = require("exceljs");

// transform data into excel from json data using xlsx
const index = async (req, res) => {
    try {
        const { customId } = req?.user;
        const type = req?.query?.type || "all";

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Data Import");

        if (type === "all") {
            const result = await prisma.data_import.findMany({});
            worksheet.columns = [
                { header: "Nama", key: "nama", width: 30 },
                { header: "NIP", key: "nip", width: 30 },
                { header: "ID_PEGAWAI", key: "pegawai_id", width: 30 },
                { header: "UNOR_ID", key: "unor_id", width: 30 },
                { header: "JFU_ID", key: "jfu_id", width: 30 },
                { header: "JFT_ID", key: "jft_id", width: 30 },
                { header: "NO_SK", key: "no_sk", width: 30 },
                { header: "TGL_SK", key: "tgl_sk", width: 30 },
                { header: "Operator", key: "operator", width: 30 },
                { header: "Tanggal Entri", key: "created_at", width: 30 }
            ];

            worksheet.addRows(result);
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=" + "data-import-all.xlsx"
            );
            await workbook.xlsx.write(res);
            res.status(200).end();
        } else if (type === "personal") {
            const result = await prisma.data_import.findMany({
                where: {
                    operator: customId
                }
            });

            worksheet.columns = [
                { header: "Nama", key: "nama", width: 30 },
                { header: "NIP", key: "nip", width: 30 },
                { header: "ID_PEGAWAI", key: "pegawai_id", width: 30 },
                { header: "UNOR_ID", key: "unor_id", width: 30 },
                { header: "JFU_ID", key: "jfu_id", width: 30 },
                { header: "JFT_ID", key: "jft_id", width: 30 },
                { header: "NO_SK", key: "no_sk", width: 30 },
                { header: "TGL_SK", key: "tgl_sk", width: 30 },
                { header: "Operator", key: "operator", width: 30 },
                { header: "Tanggal Entri", key: "created_at", width: 30 }
            ];

            worksheet.addRows(result);
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=" + "data-import-personal.xlsx"
            );
            await workbook.xlsx.write(res);
            res.status(200).end();
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ code: 400, message: "error" });
    }
};

module.exports = {
    index
};
