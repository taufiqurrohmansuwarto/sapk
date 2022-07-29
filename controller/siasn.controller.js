const { orderBy } = require("lodash");

module.exports.rwJabatanSiasn = async (req, res) => {
    try {
        const { fetcher } = req;
        const { nip } = req?.query;
        const result = await fetcher.get(`/siasn/pegawai/${nip}/rw-jabatan`);

        const sorting = orderBy(
            result?.data,
            [
                (obj) => {
                    const [year, month, day] = obj?.tmt_jabatan?.split("-");
                    return new Date(year, month - 1, day);
                }
            ],
            ["asc"]
        );
        res.json(sorting);
    } catch (error) {
        console.log(error);
        res.status(400).json({ code: 400, message: "Internal Server Error" });
    }
};

module.exports.readToken = async (req, res) => {
    try {
        const { fetcher } = req;
        const result = await fetcher.get(`/siasn/token`);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ code: 400, message: "Internal Server Error" });
    }
};
