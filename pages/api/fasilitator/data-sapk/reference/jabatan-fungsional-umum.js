import nc from "next-connect";
const handler = nc();

import { referenceJabatanFungsionalUmum } from "../../../../../controller/sapk.controller";

export default handler.get(referenceJabatanFungsionalUmum);
