import { Button, Input, message, Space } from "antd";
import FileSaver from "file-saver";
import { useState } from "react";
import { filePembetulanNama } from "../../services/fasilitator.service";
import Layout from "../../src/components/Layout";
import PageContainer from "../../src/components/PageContainer";

const Feeds = () => {
    const [nip, setNip] = useState();
    const [loading, setLoading] = useState(false);

    const downloadHasil = async () => {
        setLoading(true);
        try {
            if (!nip) {
                message.warn("isi nip nya bos");
            } else {
                const result = await filePembetulanNama(nip);
                await FileSaver.saveAs(result);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <>
            <PageContainer
                title="Download dokumen pengusulan perubahan nama SAPK"
                subTitle="Berbagi"
            >
                <Space>
                    <Input
                        value={nip}
                        onChange={(e) => setNip(e?.target?.value)}
                    />
                    <Button
                        loading={loading}
                        disabled={loading}
                        onClick={downloadHasil}
                    >
                        Clek!
                    </Button>
                </Space>
            </PageContainer>
        </>
    );
};

Feeds.Auth = {
    roles: ["USER", "FASILITATOR", "ADMIN"],
    groups: ["PTTPK", "MASTER"]
};

Feeds.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Feeds;
