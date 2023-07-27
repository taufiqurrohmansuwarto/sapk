import { Card, Divider, Tabs } from "antd";
import Layout from "../../../src/components/Layout";
import PageContainer from "../../../src/components/PageContainer";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { dataUtamaService } from "@/services/siasn.services";
import AngkaKredit from "src/components/pangkat/AngkaKredit";
import Hukdis from "src/components/pangkat/Hukdis";
import Jabatan from "src/components/pangkat/Jabatan";
import Skp22 from "src/components/pangkat/Skp22";
import KenaikanPangkatOktober2023 from "src/components/pangkat/KenaikanPangkat";
import { Stack } from "@mantine/core";

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
                <Stack>
                    <KenaikanPangkatOktober2023 nip={nip} />
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="Jabatan" key="3">
                            <Jabatan nip={nip} id={data?.id} />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="SKP 22" key="4">
                            <Skp22 nip={nip} id={data?.id} />
                        </Tabs.TabPane>

                        <Tabs.TabPane tab="Angka Kredit" key="1">
                            <AngkaKredit nip={nip} id={data?.id} />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Hukuman Disiplin" key="2">
                            <Hukdis nip={nip} id={data?.id} />
                        </Tabs.TabPane>
                    </Tabs>
                </Stack>
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
