import nc from "next-connect";
import auth from "../../../../../../middleware/auth";

import { referenceDetailJabatanFungsional } from "'../../../../../../controller/sapk.controller";
const handler = nc();

export default handler.use(auth).get(referenceDetailJabatanFungsional);
