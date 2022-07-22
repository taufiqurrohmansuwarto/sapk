import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getListLayananSKKById } from "../../../services/fasilitator.service";
import Layout from "../../../src/components/Layout";
import PageContainer from "../../../src/components/PageContainer";

const DetailLayananSKK = () => {
    const router = useRouter();

    const { data, isLoading } = useQuery(
        ["detail-layanan-skk", router?.query?.id],
        () => getListLayananSKKById(router?.query?.id)
    );

    if (isLoading) {
        return <div>loading...</div>;
    }

    return (
        <PageContainer title="Detail Layanan" subTitle="Detail Layanan SKK">
            <div>{JSON.stringify(data)}</div>
        </PageContainer>
    );
};

DetailLayananSKK.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

DetailLayananSKK.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default DetailLayananSKK;
