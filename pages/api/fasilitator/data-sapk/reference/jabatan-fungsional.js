import nc from "next-connect";
const handler = nc();
import { referenceJabatanFungsional } from "../../../../../controller/sapk.controller";

export default handler.get(referenceJabatanFungsional);
