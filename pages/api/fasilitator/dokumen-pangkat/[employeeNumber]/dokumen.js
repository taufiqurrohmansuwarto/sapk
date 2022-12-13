import nc from "next-connect";
import { dokumenKenaikanPangkat } from "../../../../../controller/dokumen-kenaikan-pangkat.controller";
import auth from "../../../../../middleware/auth";
const handler = nc();

export default handler.use(auth).get(dokumenKenaikanPangkat);
