import { statistikKenaikanPangkat } from "@/controller/statistik.controller";
import auth from "@/middleware/auth";
import checkRole from "@/middleware/check-role";
import nc from "next-connect";
const handler = nc();

handler
    .use(
        auth,
        checkRole({
            role: "ADMIN",
            group: "MASTER"
        })
    )
    .get(statistikKenaikanPangkat);

export default handler;
