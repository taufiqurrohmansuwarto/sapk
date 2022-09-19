import nc from "next-connect";
import auth from "../../../../../../middleware/auth";
export const config = {
    api: {
        responseLimit: "8mb"
    }
};

import { referenceDetailJabatanFungsional } from "../../../../../../controller/sapk.controller";
const handler = nc();

export default handler.use(auth).get(referenceDetailJabatanFungsional);
