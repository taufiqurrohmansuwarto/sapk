import Layout from "../../../src/components/Layout";
import PageContainer from "../../../src/components/PageContainer";

const RiwayatJabatan = () => {
    return <PageContainer>data utama</PageContainer>;
};

RiwayatJabatan.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatJabatan.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default RiwayatJabatan;
