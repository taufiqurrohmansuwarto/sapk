import { Table } from "antd";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatJabatan() {
    return (
        <PegawaiLayout title="Riwayat Jabatan">
            <Table />
        </PegawaiLayout>
    );
}

RiwayatJabatan.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatJabatan.getLayout = function getLayout(page) {
    return <Layout title="Test">{page}</Layout>;
};

export default RiwayatJabatan;
