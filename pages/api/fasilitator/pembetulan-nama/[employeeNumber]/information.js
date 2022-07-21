import nc from "next-connect";
import auth from "../../../../../middleware/auth";
const handler = nc();
import { informasiPembetulanNama } from "../../../../../controller/sapk.controller";

export default handler.use(auth).get(informasiPembetulanNama);
