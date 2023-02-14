import { rwAngkaKredit } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function DataAnak() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(
        ["riwayat-angka-kredit", id],
        () => rwAngkaKredit(id),
        {
            refetchOnWindowFocus: false
        }
    );

    const columns = [
        {
            title: "Nomer SK",
            dataIndex: "nomor_sk",
            key: "nomor_sk"
        },
        {
            title: "Total Kredit Baru",
            dataIndex: "kredit_utama_baru",
            key: "kredit_utama_baru"
        },
        {
            title: "Bulan Mulai Penilaian",
            dataIndex: "bulan_mulai_penilaian",
            key: "bulan_mulai_penilaian"
        },
        {
            title: "Tanggal SK",
            dataIndex: "tanggal_sk",
            key: "tanggal_sk"
        },
        {
            title: "Tahun Selesai Penilaian",
            dataIndex: "tahun_selesai_penilaian",
            key: "tahun_selesai_penilaian"
        },
        {
            title: "Kredit Penunjang Baru",
            dataIndex: "kredit_penunjang_baru",
            key: "kredit_penunjang_baru"
        }
    ];

    return (
        <PegawaiLayout title="Riwayat Angka Kredit">
            <Table
                columns={columns}
                dataSource={data}
                rowKey={(row) => row?.id}
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
    return <Layout title="Riwayat Angka Kredit">{page}</Layout>;
};

export default DataAnak;
