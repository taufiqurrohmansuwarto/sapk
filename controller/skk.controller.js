import axios from "axios";
const index = async (req, res, next) => {
    try {
        const { fetcher } = req;
        const result = await fetcher.get(`/siasn/skk/usulan`);
        res.json(result?.data);
    } catch (error) {
        // console.log(error);
        if (axios.isAxiosError(error)) {
            const { code, message } = error?.response?.data;
            res.status(code).json({ code, message });
        } else {
            res.status(400).json({
                code: 400,
                message: "Internal Server Error"
            });
        }
    }
};

const indexById = async (req, res) => {
    try {
        const { fetcher } = req;
        const { id } = req?.query;
        const result = await fetcher.get(`/siasn/skk/usulan/${id}`);
        if (result?.data?.nip) {
            const hasil = await fetcher.get(
                `/siasn/pegawai/${result?.data?.nip}/detail`
            );
            res.json({ ...result?.data, detail_pegawai: hasil?.data });
        } else {
            res.json(null);
        }
    } catch (error) {
        res.status(400).json({ code: 400, message: "Internal Server Error" });
    }
};

module.exports = {
    index,
    indexById
};
