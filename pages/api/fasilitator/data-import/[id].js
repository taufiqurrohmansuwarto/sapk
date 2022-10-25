import nc from "next-connect";
import { detail } from "../../../../controller/data-import-personal-controller";
import auth from "../../../../middleware/auth";
const handler = nc();

handler.use(auth).get(detail);

export default handler;
