import { Table } from "antd";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatPendidikan() {
    return (
        <PegawaiLayout title="Riwayat Pendidikan">
            <Table />
        </PegawaiLayout>
    );
}

RiwayatPendidikan.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatPendidikan.getLayout = function getLayout(page) {
    return <Layout title="Riwayat Pendidikan">{page}</Layout>;
};

export default RiwayatPendidikan;
