import { Table } from "antd";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function DataUtama() {
    return (
        <PegawaiLayout title="Data Utama">
            <Table />
        </PegawaiLayout>
    );
}

DataUtama.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

DataUtama.getLayout = function getLayout(page) {
    return <Layout title="Test">{page}</Layout>;
};

export default DataUtama;
