import nc from "next-connect";
import { getExcel } from "../../../../../controller/verifikator.controller";
import auth from "../../../../../middleware/auth";
const handler = nc();

export default handler.use(auth).get(getExcel);
