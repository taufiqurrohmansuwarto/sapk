import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { rwJabatanSapk } from "../../../services/fasilitator.service";
import Layout from "../../../src/components/Layout";
import PageContainer from "../../../src/components/PageContainer";

const RiwayatJabatan = () => {
    const router = useRouter();

    const { data, isLoading, error } = useQuery(
        ["data-rw-jabatan", router?.query?.nip],
        () => rwJabatanSapk(router?.query?.nip)
    );

    return (
        <PageContainer
            title="Data Integrasi"
            style={{ minHeight: "92vh" }}
            subTitle="Riwayat Jabatan"
        >
            {JSON.stringify(data)}
        </PageContainer>
    );
};

RiwayatJabatan.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatJabatan.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default RiwayatJabatan;
