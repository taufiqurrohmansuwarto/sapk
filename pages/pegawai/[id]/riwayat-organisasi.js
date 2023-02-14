import { Table } from "antd";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatOrganisasi() {
    return (
        <PegawaiLayout title="Riwayat Organisasi">
            <Table />
        </PegawaiLayout>
    );
}

RiwayatOrganisasi.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatOrganisasi.getLayout = function getLayout(page) {
    return <Layout title="Riwayat Organisasi">{page}</Layout>;
};

export default RiwayatOrganisasi;
