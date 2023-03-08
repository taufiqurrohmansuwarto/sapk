import { statistikPemberhentian } from "@/controller/statistik.controller";
import auth from "@/middleware/auth";
import checkRole from "@/middleware/check-role";
import nc from "next-connect";
const handler = nc();

handler
    .use(
        auth,
        checkRole({
            group: "MASTER",
            role: "ADMIN"
        })
    )
    .get(statistikPemberhentian);

export default handler;
