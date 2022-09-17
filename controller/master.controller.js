const { orderBy } = require("lodash");
const { serializeRwJabatanMaster } = require("../utils/serialize");

module.exports.masterRwJabatan = async (req, res) => {
    try {
        const { nip } = req?.query;
        const { fetcher } = req;
        const result = await fetcher.get(`/master/pegawai/${nip}/rw-jabatan`);
        const hasilku = serializeRwJabatanMaster(result?.data);

        if (hasilku?.length) {
            const sorting = orderBy(
                hasilku,
                [
                    (obj) => {
                        const [day, month, year] = obj?.tmt_jabatan.split("-");
                        return new Date(year, month - 1, day);
                    }
                ],
                ["asc"]
            );

            res.json(sorting);
        } else {
            res.json(null);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ code: 400, message: "Internal Server Error" });
    }
};
