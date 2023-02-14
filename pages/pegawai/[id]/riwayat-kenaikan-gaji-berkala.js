import { rwKgb } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatKGB() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(["riwayat-kgb", id], () => rwKgb(id), {
        refetchOnWindowFocus: false
    });

    return (
        <PegawaiLayout title="Riwayat Kenaikan Gaji Berkala">
            <Table
                dataSource={data}
                pagination={false}
                rowKey={(row) => row?.id}
                loading={isLoading}
            />
        </PegawaiLayout>
    );
}

RiwayatKGB.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatKGB.getLayout = function getLayout(page) {
    return <Layout title="Riwayat Kenaikan Gaji Berkala">{page}</Layout>;
};

export default RiwayatKGB;
