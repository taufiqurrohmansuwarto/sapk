import { Table } from "antd";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatKinerja() {
    return (
        <PegawaiLayout title="Riwayat Kinerja">
            <Table />
        </PegawaiLayout>
    );
}

RiwayatKinerja.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatKinerja.getLayout = function getLayout(page) {
    return <Layout title="Test">{page}</Layout>;
};

export default RiwayatKinerja;
