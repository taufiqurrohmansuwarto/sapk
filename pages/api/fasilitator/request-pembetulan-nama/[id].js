import nc from "next-connect";
import {
    patch,
    remove
} from "../../../../controller/request-pembetulan-nama.controller";
import auth from "../../../../middleware/auth";
const handler = nc();

export default handler.use(auth).patch(patch).delete(remove);
