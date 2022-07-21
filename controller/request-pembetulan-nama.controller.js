const { default: prisma } = require("../lib/prisma");

const post = async (req, res) => {
    try {
        const data = req?.body;
        await prisma.request_pembetulan_nama.create(data);
        res.json({ code: 200, message: "success" });
    } catch (error) {
        console.log(error);
        res.json({ code: 400, message: "Internal Server Error" });
    }
};

const index = async (req, res) => {
    try {
        // wkwkw gausha paging tot
        const result = await prisma.request_pembetulan_nama.find();
        res.json(result);
    } catch (error) {
        console.log(error);
        res.json({ code: 400, message: "Internal Server Error" });
    }
};

const patch = async (req, res) => {
    try {
        const { id } = req?.query;
        const { customId } = req?.user;
        const data = req?.body;

        await prisma.request_pembetulan_nama.patch();
    } catch (error) {
        console.log(error);
        res.json({ code: 400, message: "Internal Server Error" });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req?.query;
        const { customId } = req?.user;
        await prisma.request_pembetulan_nama.delete();
    } catch (error) {
        console.log(error);
        res.json({ code: 400, message: "Internal Server Error" });
    }
};

module.exports = {
    index,
    post,
    patch,
    remove
};
