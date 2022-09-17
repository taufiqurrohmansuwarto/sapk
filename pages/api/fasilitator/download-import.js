import nc from "next-connect";
import { index } from "../../../controller/import-excel";
import auth from "../../../middleware/auth";
const handler = nc();

export default handler.use(auth).get(index);
