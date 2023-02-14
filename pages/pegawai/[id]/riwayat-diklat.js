import { Table } from "antd";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatDiklat() {
    return (
        <PegawaiLayout title="Riwayat Diklat">
            <Table />
        </PegawaiLayout>
    );
}

RiwayatDiklat.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatDiklat.getLayout = function getLayout(page) {
    return <Layout title="Test">{page}</Layout>;
};

export default RiwayatDiklat;
