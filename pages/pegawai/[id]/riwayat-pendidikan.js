import { rwPendidikan } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatPendidikan() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(
        ["riwayat-pendidikan", id],
        () => rwPendidikan(id),
        {
            refetchOnWindowFocus: false
        }
    );

    const columns = [
        {
            title: "Tingkat Pendidikan",
            dataIndex: "tingkat_pendidikan_nama",
            key: "tingkat_pendidikan_nama"
        },
        {
            title: "Pendidikan",
            dataIndex: "pendidikan_nama",
            key: "pendidikan_nama"
        },
        {
            title: "Nama Sekolah",
            dataIndex: "nama_sek",
            key: "nama_sek"
        },
        {
            title: "Tgl. Lulus",
            dataIndex: "tgl_tahun_lulus",
            key: "tgl_tahun_lulus"
        },
        {
            title: "Gelar Depan",
            dataIndex: "glr_depan",
            key: "glr_depan"
        },
        {
            title: "Gelar Belakang",
            dataIndex: "glr_belakang",
            key: "glr_belakang"
        },
        {
            title: "No. Ijazah",
            dataIndex: "nomor_ijazah",
            key: "nomor_ijazah"
        }
    ];

    return (
        <PegawaiLayout title="Riwayat Pendidikan">
            <Table
                columns={columns}
                loading={isLoading}
                pagination={false}
                rowKey={(row) => row?.id}
                dataSource={data}
            />
        </PegawaiLayout>
    );
}

RiwayatPendidikan.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatPendidikan.getLayout = function getLayout(page) {
    return <Layout title="Riwayat Pendidikan">{page}</Layout>;
};

export default RiwayatPendidikan;
