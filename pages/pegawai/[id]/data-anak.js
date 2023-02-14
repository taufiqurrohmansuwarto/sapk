import { Table } from "antd";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function DataAnak() {
    return (
        <PegawaiLayout title="Data Anak">
            <Table />
        </PegawaiLayout>
    );
}

DataAnak.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

DataAnak.getLayout = function getLayout(page) {
    return <Layout title="Data Anak">{page}</Layout>;
};

export default DataAnak;
