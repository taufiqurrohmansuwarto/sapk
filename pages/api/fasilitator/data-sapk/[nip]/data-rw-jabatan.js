import nc from "next-connect";
import auth from "../../../../../middleware/auth";
import {
    rwJabatanSapk,
    postJabatanSapk
} from "../../../../../controller/sapk.controller";

const handler = nc();

export default handler.use(auth).get(rwJabatanSapk).post(postJabatanSapk);
