import nc from "next-connect";
import { remove } from "../../../../../controller/data-import.controller";
import auth from "../../../../../middleware/auth";
const handler = nc();

export default handler.use(auth).delete(remove);
