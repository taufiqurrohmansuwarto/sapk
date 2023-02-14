import { rwJabatan } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatJabatan() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(
        ["riwayat-jabatan", id],
        () => rwJabatan(id),
        {
            refetchOnWindowFocus: false
        }
    );

    const columns = [
        {
            title: "Nama Jabatan",
            dataIndex: "nama_jabatan",
            key: "nama_jabatan"
        },
        {
            title: "Nama Unor",
            dataIndex: "nama_unor",
            key: "nama_unor"
        },

        {
            title: "Asal",
            dataIndex: "asal_nama",
            key: "asal_nama"
        },
        {
            title: "No. SK",
            dataIndex: "nomor_sk",
            key: "nomor_sk"
        },
        {
            title: "Tgl. SK",
            dataIndex: "tanggal_sk",
            key: "tanggal_sk"
        },
        {
            title: "TMT Jabatan",
            dataIndex: "tmt_jabatan",
            key: "tmt_jabatan"
        },
        {
            title: "TMT Pelantikan",
            dataIndex: "tmt_pelantikan",
            key: "tmt_pelantikan"
        }
    ];

    return (
        <PegawaiLayout title="Riwayat Jabatan">
            <Table
                columns={columns}
                rowKey={(row) => row?.id}
                dataSource={data}
                pagination={false}
                loading={isLoading}
            />
        </PegawaiLayout>
    );
}

RiwayatJabatan.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatJabatan.getLayout = function getLayout(page) {
    return <Layout title="Test">{page}</Layout>;
};

export default RiwayatJabatan;
