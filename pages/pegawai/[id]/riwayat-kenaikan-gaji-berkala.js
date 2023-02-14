import { Table } from "antd";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatKGB() {
    return (
        <PegawaiLayout title="Riwayat Kenaikan Gaji Berkala">
            <Table />
        </PegawaiLayout>
    );
}

RiwayatKGB.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatKGB.getLayout = function getLayout(page) {
    return <Layout title="Riwayat Kenaikan Gaji Berkala">{page}</Layout>;
};

export default RiwayatKGB;
