import { Table } from "antd";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatPMK() {
    return (
        <PegawaiLayout title="Riwayat PMK">
            <Table />
        </PegawaiLayout>
    );
}

RiwayatPMK.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatPMK.getLayout = function getLayout(page) {
    return <Layout title="Riwayat PMK">{page}</Layout>;
};

export default RiwayatPMK;
