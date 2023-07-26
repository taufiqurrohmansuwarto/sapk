import { getTreeRef } from "@/controller/siasn-controller";
import siasnMiddleware from "@/middleware/siasn.middleware.js";
import nc from "next-connect";
const handler = nc();

export default handler.use(siasnMiddleware).get(getTreeRef);
