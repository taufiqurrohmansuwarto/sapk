import { dataPasangan } from "@/services/fasilitator.service";
import { Table } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function DataPasangan() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(["data-pasangan", id], () =>
        dataPasangan(id)
    );

    return (
        <PegawaiLayout title="Data Pasangan">
            {JSON.stringify(data)}
            <Table loading={isLoading} />
        </PegawaiLayout>
    );
}

DataPasangan.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

DataPasangan.getLayout = function getLayout(page) {
    return <Layout title="Data Pasangan">{page}</Layout>;
};

export default DataPasangan;
