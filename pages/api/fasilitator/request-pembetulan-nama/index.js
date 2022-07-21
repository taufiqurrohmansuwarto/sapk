import nc from "next-connect";
import {
    index,
    patch,
    post,
    remove
} from "../../../../controller/request-pembetulan-nama.controller";
import auth from "../../../../middleware/auth";
const handler = nc();

export default handler
    .use(auth)
    .get(index)
    .patch(patch)
    .delete(remove)
    .post(post);
