module.exports.rwJabatanSiasn = async (req, res) => {
    try {
        const { fetcher } = req;
        const { nip } = req?.query;
        const result = await fetcher.get(`/siasn/pegawai/${nip}/rw-jabatan`);
        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(400).json({ code: 400, message: "Internal Server Error" });
    }
};
