import { rwPendidikan } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatPendidikan() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(["riwayat-kgb", id], () =>
        rwPendidikan(id)
    );
    return (
        <PegawaiLayout title="Riwayat Pendidikan">
            <Table loading={isLoading} dataSource={data} />
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
