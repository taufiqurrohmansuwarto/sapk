import nc from "next-connect";
import { dashboard } from "../../../../controller/data-import.controller";
import auth from "../../../../middleware/auth";
const handler = nc();

export default handler.use(auth).get(dashboard);
