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
        },
        {
            title: "Tgl.Lahir",
            dataIndex: "tgl_lhr",
            key: "tgl_lhr"
        },
        {
            title: "Jenis Kelamin",
            dataIndex: "jenis_kelamin",
            key: "jenis_kelamin"
        },
        {
            title: "Status",
            dataIndex: "jenis_kawin_nama",
            key: "jenis_kawin_nama"
        },
        {
            title: "Agama",
            dataIndex: "agama_nama",
            key: "agama_nama"
        },
        {
            title: "Alamat",
            dataIndex: "alamat",
            key: "alamat"
        }
    ];

    return (
        <PegawaiLayout title="Data Anak">
            <Table
                dataSource={data}
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
