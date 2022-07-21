import nc from "next-connect";
import { information } from "../../../../../controller/sapk.controller";
import auth from "../../../../../middleware/auth";
const handler = nc();

export default handler.use(auth).get(information);
