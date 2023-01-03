import nc from "next-connect";
import { listVerifikator } from "../../../../controller/verifikator.controller";
import auth from "../../../../middleware/auth";

const handler = nc();

handler.use(auth).get(listVerifikator);

export default handler;
