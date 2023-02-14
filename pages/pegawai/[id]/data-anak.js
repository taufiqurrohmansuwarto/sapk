import { dataAnak } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function DataAnak() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(["data-anak", id], () => dataAnak(id));
    const columns = [
        {
            title: "Nama Anak",
            dataIndex: "nama",
            key: "nama"
        }
    ];

    return (
        <PegawaiLayout title="Data Anak">
            {JSON.stringify(data)}
            <Table
                rowKey={(row) => row?.id}
                columns={columns}
                pagination={false}
                loading={isLoading}
            />
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
