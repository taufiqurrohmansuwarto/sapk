import { rwPenghargaan } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatPenghargaan() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(
        ["riwayat-penghargaan", id],
        () => rwPenghargaan(id),
        {
            refetchOnWindowFocus: false
        }
    );

    const columns = [
        {
            title: "Jenis Penghargaan",
            key: "nama_penghargaan",
            dataIndex: "nama_penghargaan"
        },
        { title: "Tahun Perolehan", key: "tahun", dataIndex: "tahun" },
        { title: "Nomor SK", dataIndex: "sk_nomor", dataIndex: "sk_nomor" },
        {
            title: "Tanggal SK",
            dataIndex: "sk_tanggal",
            dataIndex: "sk_tanggal"
        }
    ];
    return (
        <PegawaiLayout title="Riwayat Penghargaan">
            <Table
                columns={columns}
                pagination={false}
                dataSource={data}
                loading={isLoading}
                rowKey={(row) => row?.id}
            />
        </PegawaiLayout>
    );
}

RiwayatPenghargaan.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatPenghargaan.getLayout = function getLayout(page) {
    return <Layout title="Riwayat Penghargaan">{page}</Layout>;
};

export default RiwayatPenghargaan;
