import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useRouter } from "next/router";
import rwPmk from "pages/api/fasilitator/siasn/[nip]/rw-pmk";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatPMK() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(["riwayat-pmk", id], () => rwPmk(id));
    return (
        <PegawaiLayout title="Riwayat PMK">
            <Table loading={isLoading} dataSource={data} />
        </PegawaiLayout>
    );
}

RiwayatPMK.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatPMK.getLayout = function getLayout(page) {
    return <Layout title="Riwayat PMK">{page}</Layout>;
};

export default RiwayatPMK;
