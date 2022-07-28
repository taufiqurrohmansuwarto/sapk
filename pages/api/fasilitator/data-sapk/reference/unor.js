import nc from "next-connect";
const handler = nc();
import { referenceUnor } from "../../../../../controller/sapk.controller";

export default handler.get(referenceUnor);
