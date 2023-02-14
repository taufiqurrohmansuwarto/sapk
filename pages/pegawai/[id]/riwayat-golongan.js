import { rwGolongan } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatGolongan() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(["riwayat-diklat", id], () =>
        rwGolongan(id)
    );

    return (
        <PegawaiLayout title="Riwayat Golongan">
            {JSON.stringify(data)}
            <Table loading={isLoading} />
        </PegawaiLayout>
    );
}

RiwayatGolongan.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatGolongan.getLayout = function getLayout(page) {
    return <Layout title="Test">{page}</Layout>;
};

export default RiwayatGolongan;
