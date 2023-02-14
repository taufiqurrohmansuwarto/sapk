import { Table } from "antd";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatCLTN() {
    return (
        <PegawaiLayout title="Riwayat CLTN">
            <Table />
        </PegawaiLayout>
    );
}

RiwayatCLTN.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatCLTN.getLayout = function getLayout(page) {
    return <Layout title="Riwayat CLTN">{page}</Layout>;
};

export default RiwayatCLTN;
