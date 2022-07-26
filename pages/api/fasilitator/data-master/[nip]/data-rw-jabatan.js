import nc from "next-connect";
import { masterRwJabatan } from "../../../../../controller/master.controller";
import auth from "../../../../../middleware/auth";
const handler = nc();

export default handler.use(auth).get(masterRwJabatan);
