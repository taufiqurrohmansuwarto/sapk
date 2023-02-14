import { Table } from "antd";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatHukdis() {
    return (
        <PegawaiLayout title="Riwayat Hukuman Disiplin">
            <Table />
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
