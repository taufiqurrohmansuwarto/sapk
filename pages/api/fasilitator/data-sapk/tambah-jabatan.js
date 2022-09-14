import nc from "next-connect";
import auth from "../../../../middleware/auth";
import { postJabatanSapk } from "../../../../controller/sapk.controller";

const handler = nc();

export default handler.use(auth).post(postJabatanSapk);
