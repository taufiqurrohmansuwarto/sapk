import nc from "next-connect";
import { listDataVerifikator } from "../../../../../controller/verifikator.controller";
import auth from "../../../../../middleware/auth";
const handler = nc();

handler.use(auth).get(listDataVerifikator);

export default handler;
