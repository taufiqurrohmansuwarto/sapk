const arrayToTree = require("array-to-tree");
const { default: axios } = require("axios");
const { loginSso, loginWso2 } = require("fetcher/siasn");
const moment = require("moment");

const getTreeRef = async (req, res) => {
    try {
        const { siasnRequest: request } = req;
        const result = await request.get("/referensi/ref-unor");
        const data = result?.data?.data;
        const dataFlat = data?.map((d) => ({
            id: d?.Id,
            key: d?.Id,
            parentId: d?.DiatasanId,
            name: d?.NamaUnor,
            value: d?.Id,
            label: d?.NamaUnor,
            title: d?.NamaUnor
        }));

        const tree = arrayToTree(dataFlat, {
            parentProperty: "parentId",
            customID: "id"
        });
        res.json(tree);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" });
    }
};

const getSkp = async (req, res) => {
    try {
        const { siasnRequest: request } = req;
        const { nip } = req?.query;
        const result = await request.get(`/pns/rw-skp/${nip}`);
        res.json(result?.data);
    } catch (error) {
        console.log(error);
    }
};

const getSkp2022 = async (req, res) => {
    try {
        const { siasnRequest: request } = req;
        const { nip } = req?.query;
        const result = await request.get(`/pns/rw-skp22/${nip}`);
        res.json(result?.data?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" });
    }
};

const detailSkp2022 = async (req, res) => {
    try {
        const { siasnRequest: request } = req;
        const result = await request.get("/pns/rw-skp22/1999103052019031008");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" });
    }
};

const getAngkaKredit = async (req, res) => {
    try {
        const { siasnRequest: request } = req;
        const { nip } = req?.query;

        const result = await request.get(`/pns/rw-angkakredit/${nip}`);
        res.json(result?.data?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" });
    }
};

const daftarKenaikanPangkat = async (req, res) => {
    try {
        const { siasnRequest: request } = req;

        const periode = req?.query?.periode || moment().format("YYYY-MM-DD");

        const result = await request.get(
            `/pns/list-kp-instansi?periode=${periode}`
        );

        res.json(result?.data?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" });
    }
};

const getDiklat = async (req, res) => {
    try {
        const { siasnRequest: request } = req;
        const { nip } = req?.query;

        const result = await request.get(`/pns/rw-diklat/${nip}`);
        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" });
    }
};

const getDataUtamPns = async (req, res) => {
    try {
        const { siasnRequest: request } = req;
        const { nip } = req?.query;
        const result = await request.get(`/pns/data-utama/${nip}`);
        res.json(result?.data?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" });
    }
};

const downloadDokumen = async (req, res) => {
    try {
        const { siasnRequest: request } = req;
        const { filePath } = req?.query;
        const result = await request.get(`/download-dok?filePath=${filePath}`, {
            responseType: "arrayBuffer"
        });

        res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Length": result?.data?.length
        });

        res.end(Buffer.from(result?.data, "binary"));
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" });
    }
};

const getHukdis = async (req, res) => {
    try {
        const { siasnRequest: request } = req;
        const { nip } = req?.query;

        const result = await request.get(`/pns/rw-hukdis/${nip}`);
        res.json(result?.data?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" });
    }
};

const getJabatan = async (req, res) => {
    try {
        const { siasnRequest: request } = req;

        const { nip } = req?.query;

        const result = await request.get(`/pns/rw-jabatan/${nip}`);
        res.json(result?.data?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" });
    }
};

const postRiwayatJabatan = async (req, res) => {
    try {
        const { siasnRequest: request } = req;
        const { nip } = req?.query;
        const body = req?.body;

        // cekId
        const dataUtama = await request.get(`/pns/data-utama/${nip}`);
        const id = dataUtama?.data?.data?.id;
        const data = {
            ...body,
            pnsId: id
        };

        await request.post(`/jabatan/save`, data);

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" });
    }
};

const getRefJfu = async (req, res) => {
    try {
        const { jabatan } = req?.query;
        const result = await axios.get(
            `https://siasn.bkd.jatimprov.go.id/pemprov-api/vendor/reference/ref-jfu/${jabatan}`
        );
        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" });
    }
};

const getRefJft = async (req, res) => {
    try {
        const { jabatan } = req?.query;
        const result = await axios.get(
            `https://siasn.bkd.jatimprov.go.id/pemprov-api/vendor/reference/ref-jft/${jabatan}`
        );
        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" });
    }
};

const getTokenSIASN = async (req, res) => {
    try {
        const firstToken = await loginSso();
        const secondToken = await loginWso2();
        res.json({
            accessToken: {
                sso: firstToken,
                wso2: secondToken
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" });
    }
};

module.exports = {
    getTreeRef,
    getSkp,
    getSkp2022,
    getAngkaKredit,
    daftarKenaikanPangkat,
    getDiklat,
    getDataUtamPns,
    downloadDokumen,
    getHukdis,
    getJabatan,
    getRefJfu,
    getRefJft,
    getTokenSIASN,
    postRiwayatJabatan
};
