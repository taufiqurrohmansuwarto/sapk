import { rwCtln } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatCLTN() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(["riwayat-cltn", id], () =>
        rwCtln(id)
    );
    return (
        <PegawaiLayout title="Riwayat CLTN">
            {JSON.stringify(data)}
            <Table loading={isLoading} />
        </PegawaiLayout>
    );
}

RiwayatCLTN.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatCLTN.getLayout = function getLayout(page) {
    return <Layout title="Riwayat CLTN">{page}</Layout>;
};

export default RiwayatCLTN;
