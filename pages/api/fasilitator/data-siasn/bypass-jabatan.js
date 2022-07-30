import nc from "next-connect";
import { bypassJabatan } from "../../../../controller/siasn.controller";
import auth from "../../../../middleware/auth";
const handler = nc();

export default handler.use(auth).post(bypassJabatan);
