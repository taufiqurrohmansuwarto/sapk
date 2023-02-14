import { Table } from "antd";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatPindahInstansi() {
    return (
        <PegawaiLayout title="Riwayat Pindah Instansi">
            <Table />
        </PegawaiLayout>
    );
}

RiwayatPindahInstansi.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatPindahInstansi.getLayout = function getLayout(page) {
    return <Layout title="Riwayat Pindah Instansi">{page}</Layout>;
};

export default RiwayatPindahInstansi;
