import { dataUtama } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function DataUtama() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(["data-pasangan", id], () =>
        dataUtama(id)
    );
    return (
        <PegawaiLayout title="Data Utama">
            {JSON.stringify(data)}
            <Table loading={isLoading} />
        </PegawaiLayout>
    );
}

DataUtama.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

DataUtama.getLayout = function getLayout(page) {
    return <Layout title="Data Utama">{page}</Layout>;
};

export default DataUtama;
