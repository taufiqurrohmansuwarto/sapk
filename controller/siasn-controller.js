const arrayToTree = require("array-to-tree");

const getTreeRef = async (req, res) => {
    try {
        const { siasnRequest: request } = req;
        const result = await request.get("/referensi/ref-unor");
        const data = result?.data?.data;
        const dataFlat = data?.map((d) => ({
            id: d?.Id,
            parentId: d?.DiatasanId,
            name: d?.NamaUnor,
            value: d?.Id,
            label: d?.NamaUnor
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
        res.json(result?.data);
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
        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" });
    }
};

module.exports = {
    getTreeRef,
    getSkp,
    getSkp2022,
    getAngkaKredit
};
