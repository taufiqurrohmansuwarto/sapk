import { Table } from "antd";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function DataPasangan() {
    return (
        <PegawaiLayout title="Data Pasangan">
            <Table />
        </PegawaiLayout>
    );
}

DataPasangan.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

DataPasangan.getLayout = function getLayout(page) {
    return <Layout title="Test">{page}</Layout>;
};

export default DataPasangan;
