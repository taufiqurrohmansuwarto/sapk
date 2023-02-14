import { Table } from "antd";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function DataPNS() {
    return (
        <PegawaiLayout title="Data PNS">
            <Table />
        </PegawaiLayout>
    );
}

DataPNS.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

DataPNS.getLayout = function getLayout(page) {
    return <Layout title="Data PNS">{page}</Layout>;
};

export default DataPNS;
