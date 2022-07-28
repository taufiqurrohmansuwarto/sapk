import nc from "next-connect";
const handler = nc();

import { referenceJabatanFungsionalUmum } from "../../../../../controller/sapk.controller";
import auth from "../../../../../middleware/auth";

export default handler.use(auth).get(referenceJabatanFungsionalUmum);
