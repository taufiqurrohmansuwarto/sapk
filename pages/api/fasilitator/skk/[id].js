import nc from "next-connect";
import { indexById } from "../../../../controller/skk.controller";
import auth from "../../../../middleware/auth";
const handler = nc();

export default handler.use(auth).get(indexById);
