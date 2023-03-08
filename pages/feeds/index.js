import { Divider } from "antd";
import { useSession } from "next-auth/react";
import DashboarStatistik from "src/components/DashboarStatistik";
import Dashboard from "../../src/components/Dashboard";
import Layout from "../../src/components/Layout";
import PageContainer from "../../src/components/PageContainer";

const Feeds = () => {
    const { data, status } = useSession();
    return (
        <>
            <PageContainer
                title="Beranda"
                subTitle="Solusi SIASN,SIMASTER dan SAPK"
                style={{ minHeight: "100vh" }}
            >
                <Dashboard user={data} />
                <Divider />
                {data?.user?.role === "ADMIN" && <DashboarStatistik />}
            </PageContainer>
        </>
    );
};

Feeds.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

Feeds.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Feeds;
