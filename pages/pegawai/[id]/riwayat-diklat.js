import { rwDiklat } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatDiklat() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(
        ["riwayat-diklat", id],
        () => rwDiklat(id),
        {
            refetchOnWindowFocus: false
        }
    );

    const columns = [
        {
            title: "Nama diklat",
            dataIndex: "nama_diklat",
            key: "nama_diklat"
        },
        {
            title: "Nomer",
            dataIndex: "nomor",
            key: "nomor"
        },
        {
            title: "Tahun",
            dataIndex: "tahun",
            key: "tahun"
        },
        {
            title: "Jenis Diklat",
            dataIndex: "jenis_diklat_nama",
            key: "jenis_diklat_nama"
        },
        {
            title: "Jumlah Jam",
            dataIndex: "jumlah_jam",
            key: "jumlah_jam"
        },
        {
            title: "Institusi Penyelenggara",
            dataIndex: "institusi_penyelenggara",
            key: "institusi_penyelenggara"
        },
        {
            title: "Tanggal Kursus",
            dataIndex: "tanggal_kursus",
            key: "tanggal_kursus"
        },
        {
            title: "Tanggal Selesai",
            dataIndex: "tanggal_selesai",
            key: "tanggal_selesai"
        }
    ];

    return (
        <PegawaiLayout title="Riwayat Diklat">
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                loading={isLoading}
            />
        </PegawaiLayout>
    );
}

RiwayatDiklat.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatDiklat.getLayout = function getLayout(page) {
    return <Layout title="Riwayat Diklat">{page}</Layout>;
};

export default RiwayatDiklat;
