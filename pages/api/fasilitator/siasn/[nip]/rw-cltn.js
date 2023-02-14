import { cltn } from "@/controller/siasn-ws-proxy.controller";
import auth from "@/middleware/auth";
import nc from "next-connect";

const handler = nc();

export default handler.use(auth).get(cltn);
