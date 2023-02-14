import { rwSKP } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatSKP() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(["riwayat-skp", id], () => rwSKP(id), {
        refetchOnWindowFocus: false
    });

    const columns = [
        { title: "Tahun", dataIndex: "tahun", key: "tahun" },
        { title: "Nilai SKP", dataIndex: "nilai_skp", key: "nilai_skp" },
        {
            title: "Orientasi Pelayanan",
            dataIndex: "orientasi_pelayanan",
            key: "orientasi_pelayanan"
        },
        { title: "Komitmen", dataIndex: "komitmen", key: "komitmen" },
        { title: "Kerja Sama", dataIndex: "kerjasama", key: "kerjasama" },
        {
            title: "Perilaku Kerja",
            dataIndex: "nilai_perilaku_kerja",
            key: "nilai_perilaku_kerja"
        },
        {
            title: "Prestasi Kerja",
            dataIndex: "nilai_prestasi_kerja",
            key: "nilai_prestasi_kerja"
        },
        { title: "Disiplin", dataIndex: "disiplin", key: "disiplin" },
        {
            title: "Inisiatif Kerja",
            dataIndex: "inisiatif_kerja",
            key: "inisiatif_kerja"
        },
        {
            title: "Nilai Integrasi",
            dataIndex: "nilai_integrasi",
            key: "nilai_integrasi"
        },
        {
            title: "Peraturan",
            dataIndex: "jenis_peraturan",
            key: "jenis_peraturan"
        }
    ];

    return (
        <PegawaiLayout title="Riwayat SKP">
            <Table
                columns={columns}
                rowKey={(row) => row?.id}
                pagination={false}
                loading={isLoading}
                dataSource={data}
            />
        </PegawaiLayout>
    );
}

RiwayatSKP.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatSKP.getLayout = function getLayout(page) {
    return <Layout title="Riwayat SKP">{page}</Layout>;
};

export default RiwayatSKP;
