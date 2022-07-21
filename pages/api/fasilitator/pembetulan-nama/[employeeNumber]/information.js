import nc from "next-connect";
<<<<<<< HEAD
import { information } from "../../../../../controller/sapk.controller";
import auth from "../../../../../middleware/auth";
const handler = nc();

export default handler.use(auth).get(information);
=======
import auth from "../../../../../middleware/auth";
const handler = nc();
import { informasiPembetulanNama } from "../../../../../controller/sapk.controller";

export default handler.use(auth).get(informasiPembetulanNama);
>>>>>>> 6b81ccfb331abffb9cb5caaab3e90166ea9d52c0
