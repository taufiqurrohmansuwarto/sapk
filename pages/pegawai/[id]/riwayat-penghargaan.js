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
    return (
        <PegawaiLayout title="Riwayat Penghargaan">
            <Table
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
