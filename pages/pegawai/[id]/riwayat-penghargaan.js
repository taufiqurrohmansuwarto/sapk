import { Table } from "antd";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatPenghargaan() {
    return (
        <PegawaiLayout title="Riwayat Penghargaan">
            <Table />
        </PegawaiLayout>
    );
}

RiwayatPenghargaan.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatPenghargaan.getLayout = function getLayout(page) {
    return <Layout title="Riwayat Penghargaan">{page}</Layout>;
};

export default RiwayatPenghargaan;
