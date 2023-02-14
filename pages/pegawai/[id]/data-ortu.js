import { dataOrtu, dataPasangan } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function DataOrtu() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(
        ["data-ortu", id],
        () => dataOrtu(id),
        {
            refetchOnWindowFocus: false
        }
    );

    const columns = [
        { title: "Nama", key: "nama", dataIndex: "nama" },
        {
            title: "Alamat",
            key: "alamat",
            dataIndex: "alamat"
        },
        {
            title: "Jenis Kelamin",
            key: "jenis_kelamin",
            dataIndex: "jenis_kelamin"
        },
        {
            title: "Status",
            key: "jenis_kawin_nama",
            dataIndex: "jenis_kawin_nama"
        },
        {
            title: "Tanggal Menikah",
            key: "tggl_menikah",
            dataIndex: "tggl_menikah"
        },
        {
            title: "Akta Menikah",
            key: "akta_menikah",
            dataIndex: "akta_menikah"
        }
    ];

    return (
        <PegawaiLayout title="Data Orang Tua">
            {JSON.stringify(data)}
            <Table
                columns={columns}
                dataSource={data}
                rowKey={(row) => row?.id}
                loading={isLoading}
                pagination={false}
            />
        </PegawaiLayout>
    );
}

DataOrtu.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

DataOrtu.getLayout = function getLayout(page) {
    return <Layout title="Data Orang Tua">{page}</Layout>;
};

export default DataOrtu;
