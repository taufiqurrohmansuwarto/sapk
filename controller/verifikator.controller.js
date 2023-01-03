const xlsx = require("xlsx");

const listVerifikator = async (req, res) => {
    try {
        const { fetcher } = req;
        const result = await fetcher.get(`/siasn/verifikator`);
        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Internal Server Error"
        });
    }
};

const listDataVerifikator = async (req, res) => {
    try {
        const { fetcher } = req;
        const { id } = req?.query;
        const result = await fetcher.get(`/siasn/verifikator/${id}`);
        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
};

const getExcel = async (req, res) => {
    try {
        const { fetcher } = req;
        const { id } = req?.query;
        const result = await fetcher.get(`/siasn/verifikator/${id}`);

        const hasil = result?.data?.results;

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(hasil);
        xlsx.utils.book_append_sheet(wb, ws, "Data Verifikator");
        const excel = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="Data Verifikator.xlsx"`
        );
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.send(excel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
};

module.exports = {
    listVerifikator,
    listDataVerifikator,
    getExcel
};
