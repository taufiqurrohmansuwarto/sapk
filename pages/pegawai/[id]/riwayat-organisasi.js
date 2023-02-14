import { rwOrganisasi } from "@/services/fasilitator.service";
import { Table } from "antd";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatOrganisasi() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(["riwayat-organisasi", id], () =>
        rwOrganisasi(id)
    );

    return (
        <PegawaiLayout title="Riwayat Organisasi">
            {JSON.stringify(data)}
            <Table loading={isLoading} />
        </PegawaiLayout>
    );
}

RiwayatOrganisasi.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatOrganisasi.getLayout = function getLayout(page) {
    return <Layout title="Riwayat Organisasi">{page}</Layout>;
};

export default RiwayatOrganisasi;
