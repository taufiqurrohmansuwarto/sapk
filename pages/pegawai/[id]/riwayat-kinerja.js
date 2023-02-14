import { rwKinerja } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatKinerja() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(
        ["riwayat-kinerja", id],
        () => rwKinerja(id),
        {
            refetchOnWindowFocus: false
        }
    );

    const columns = [
        {
            title: "Tahun",
            dataIndex: "tahun",
            key: "tahun"
        },
        {
            title: "Hasil Kinerja",
            dataIndex: "hasil_kinerja",
            key: "hasil_kinerja"
        },
        {
            title: "Perilaku Kerja",
            dataIndex: "perilaku_kerja",
            key: "perilaku_kerja"
        },
        {
            title: "Kuadran Kerja",
            dataIndex: "kuadran_kinerja",
            key: "kuadran_kinerja"
        }
    ];

    return (
        <PegawaiLayout title="Riwayat Kinerja">
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                rowKey={(row) => row?.id}
                loading={isLoading}
            />
        </PegawaiLayout>
    );
}

RiwayatKinerja.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatKinerja.getLayout = function getLayout(page) {
    return <Layout title="Test">{page}</Layout>;
};

export default RiwayatKinerja;
