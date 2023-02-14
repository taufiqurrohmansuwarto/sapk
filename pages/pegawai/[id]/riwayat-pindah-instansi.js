import { rwPindahInstansi } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatPindahInstansi() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(
        ["riwayat-pindahinstansi", id],
        () => rwPindahInstansi(id),
        { refetchOnWindowFocus: false }
    );

    const columns = [
        {
            title: "Satuan Kerja Lama",
            dataIndex: "satuan_kerja_induk_nama",
            key: "satuan_kerja_induk_nama"
        },
        {
            title: "Satuan Kerja Baru",
            dataIndex: "satuan_kerja_induk_nama_baru",
            key: "satuan_kerja_induk_nama_baru"
        },
        {
            title: "No. SK BKN",
            dataIndex: "nomor_sk_bkn",
            key: "nomor_sk_bkn"
        },
        {
            title: "Tgl. SK BKN",
            dataIndex: "tgl_sk_bkn",
            key: "tgl_sk_bkn"
        },
        {
            title: "TMT Pindah Instansi",
            dataIndex: "tmt_pi",
            key: "tmt_pi"
        },
        {
            title: "No. Surat Instansi Asal",
            dataIndex: "no_surat_instansi_asal",
            key: "no_surat_instansi_asal"
        },
        {
            title: "No. Surat Instansi Tujugan",
            dataIndex: "no_surat_instansi_tujuan",
            key: "no_surat_instansi_tujuan"
        }
    ];

    return (
        <PegawaiLayout title="Riwayat Pindah Instansi">
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

RiwayatPindahInstansi.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatPindahInstansi.getLayout = function getLayout(page) {
    return <Layout title="Riwayat Pindah Instansi">{page}</Layout>;
};

export default RiwayatPindahInstansi;
