import { Table } from "antd";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatGolongan() {
    return (
        <PegawaiLayout title="Riwayat Golongan">
            <Table />
        </PegawaiLayout>
    );
}

RiwayatGolongan.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatGolongan.getLayout = function getLayout(page) {
    return <Layout title="Test">{page}</Layout>;
};

export default RiwayatGolongan;
