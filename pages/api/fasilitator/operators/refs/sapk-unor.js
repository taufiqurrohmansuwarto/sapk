import auth from "@/middleware/auth";
import nc from "next-connect";
import { referenceUnor } from "@/controller/sapk.controller";

const handler = nc();

export default handler.use(auth).get(referenceUnor);
