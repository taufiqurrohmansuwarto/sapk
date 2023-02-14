import { rwPMK } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatPMK() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(["riwayat-pmk", id], () => rwPMK(id));
    return (
        <PegawaiLayout title="Riwayat PMK">
            <Table loading={isLoading} dataSource={data} />
        </PegawaiLayout>
    );
}

RiwayatPMK.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatPMK.getLayout = function getLayout(page) {
    return <Layout title="Riwayat PMK">{page}</Layout>;
};

export default RiwayatPMK;
