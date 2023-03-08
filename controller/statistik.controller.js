const URL = `/siasn-ws/statistik`;

const statistikPemberhentian = async (req, res) => {
    try {
        const { fetcher } = req;
        const result = await fetcher.get(`${URL}/pemberhentian`);
        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

const statistikSKK = async (req, res) => {
    try {
        const { fetcher } = req;
        const result = await fetcher.get(`${URL}/skk`);
        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

const statistikKenaikanPangkat = async (req, res) => {
    try {
        const { fetcher } = req;
        const result = await fetcher.get(`${URL}/kenaikan-pangkat`);
        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

const statistikPindahInstansi = async (req, res) => {
    try {
        const { fetcher } = req;
        const result = await fetcher.get(`${URL}/pindah-instansi`);
        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", code: 500 });
    }
};

module.exports = {
    statistikPemberhentian,
    statistikSKK,
    statistikKenaikanPangkat,
    statistikPindahInstansi
};
