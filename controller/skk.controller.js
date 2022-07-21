const index = async (req, res) => {
    try {
        const { fetcher } = req;
        const result = await fetcher.get(`/siasn/skk/usulan`);
        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(400).json({ code: 400, message: "Internal Server Error" });
    }
};

const indexById = async (req, res) => {
    try {
        const { fetcher } = req;
        const { id } = req?.query;
        const result = await fetcher.get(`/siasn/skk/usulan/${id}`);
        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(400).json({ code: 400, message: "Internal Server Error" });
    }
};

module.exports = {
    index,
    indexById
};
