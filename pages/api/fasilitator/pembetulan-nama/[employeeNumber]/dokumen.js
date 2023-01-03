mport nc from "next-connect";
import { pembetulanNama } from "../../../../../controller/sapk.controller";
import auth from "../../../../../middleware/auth";
const handler = nc();

export default handler.use(auth).get(pembetulanNama);
