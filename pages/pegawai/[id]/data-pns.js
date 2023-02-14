import { dataPasangan } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function DataPNS() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(["data-pns", id], () =>
        dataPasangan(id)
    );
    return (
        <PegawaiLayout title="Data PNS">
            <Table />
        </PegawaiLayout>
    );
}

DataPNS.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

DataPNS.getLayout = function getLayout(page) {
    return <Layout title="Data PNS">{page}</Layout>;
};

export default DataPNS;
