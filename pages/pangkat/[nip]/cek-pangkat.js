import { Card, Tabs } from "antd";
import Layout from "../../../src/components/Layout";
import PageContainer from "../../../src/components/PageContainer";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { dataUtamaService } from "@/services/siasn.services";
import AngkaKredit from "src/components/pangkat/AngkaKredit";
import Hukdis from "src/components/pangkat/Hukdis";
import Jabatan from "src/components/pangkat/Jabatan";
import Skp22 from "src/components/pangkat/Skp22";

const Index = () => {
    const router = useRouter();
    const handleBack = () => router.back();

    const { nip } = router.query;

    const { data, isLoading } = useQuery(
        ["data-utama", nip],
        () => dataUtamaService(nip),
        {
            refetchOnWindowFocus: false
        }
    );

    return (
        <PageContainer
            loading={isLoading}
            onBack={handleBack}
            title="Bantuan Kenaikan Pangkat"
            subTitle={`${data?.nama} - ${data?.nipBaru}`}
        >
            <Card loading={isLoading}>
                <div>{JSON.stringify(data)}</div>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Angka Kredit" key="1">
                        <AngkaKredit nip={nip} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Hukuman Disiplin" key="2">
                        <Hukdis nip={nip} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Jabatan" key="3">
                        <Jabatan nip={nip} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="SKP 22" key="4">
                        <Skp22 nip={nip} />
                    </Tabs.TabPane>
                </Tabs>
            </Card>
        </PageContainer>
    );
};

Index.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

Index.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Index;
