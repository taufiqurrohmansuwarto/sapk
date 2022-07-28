import nc from "next-connect";
const handler = nc();
import { referenceUnor } from "../../../../../controller/sapk.controller";
import auth from "../../../../../middleware/auth";

export default handler.use(auth).get(referenceUnor);
