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

module.exports = {
    listVerifikator,
    listDataVerifikator
};
