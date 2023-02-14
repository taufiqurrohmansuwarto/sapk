import { rwHukdis } from "@/services/fasilitator.service";
import { Table } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatHukdis() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(["riwayat-hukdis", id], () =>
        rwHukdis(id)
    );

    return (
        <PegawaiLayout title="Riwayat Hukuman Disiplin">
            {JSON.stringify(data)}
            <Table loading={isLoading} />
        </PegawaiLayout>
    );
}

RiwayatHukdis.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatHukdis.getLayout = function getLayout(page) {
    return <Layout title="Riwayat Hukdis">{page}</Layout>;
};

export default RiwayatHukdis;
