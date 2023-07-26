import siasnMiddleware from "@/middleware/siasn.middleware.js";
import nc from "next-connect";
const handler = nc();

export default handler.use(siasnMiddleware).get(async (req, res) => {
    const { siasnRequest: request } = req;
    const result = await request.get("/jabatan/pns/199103052019031008");
    res.json(result?.data);
});
