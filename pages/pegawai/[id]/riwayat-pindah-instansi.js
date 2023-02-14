import { rwPindahInstansi } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatPindahInstansi() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(["riwayat-pindahinstansi", id], () =>
        rwPindahInstansi(id)
    );
    return (
        <PegawaiLayout title="Riwayat Pindah Instansi">
            <Table loading={isLoading} dataSource={data} />
        </PegawaiLayout>
    );
}

RiwayatPindahInstansi.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatPindahInstansi.getLayout = function getLayout(page) {
    return <Layout title="Riwayat Pindah Instansi">{page}</Layout>;
};

export default RiwayatPindahInstansi;
