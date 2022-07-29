import nc from "next-connect";
import { readToken } from "../../../controller/siasn.controller";
import auth from "../../../middleware/auth";
const handler = nc();

export default handler.use(auth).get(readToken);
