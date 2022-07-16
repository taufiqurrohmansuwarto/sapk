import { DownloadOutlined } from "@ant-design/icons";
import { useDebouncedValue } from "@mantine/hooks";
import {
    Button,
    Card,
    Divider,
    Descriptions,
    Input,
    message,
    Skeleton,
    Space,
    Form
} from "antd";
import FileSaver from "file-saver";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useQuery } from "react-query";
import {
    filePembetulanNama,
    informasiPembetulanNama
} from "../../services/fasilitator.service";
import Layout from "../../src/components/Layout";
import PageContainer from "../../src/components/PageContainer";

const DataUser = ({ data }) => {
    if (isEmpty(data)) {
        return null;
    } else {
        const [loading, setLoading] = useState(false);
        const downloadHasil = async () => {
            setLoading(true);
            try {
                if (!data?.nip) {
                    message.warn("isi nip nya bos");
                } else {
                    const result = await filePembetulanNama(data?.nip);
                    await FileSaver.saveAs(
                        result,
                        `${data?.nip}_${data?.nama}.zip`
                    );
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        return (
            <>
                <Descriptions title="User Info">
                    <Descriptions.Item label="Nama">
                        {data?.nama}
                    </Descriptions.Item>
                    <Descriptions.Item label="NIP">
                        {data?.nip}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tanggal Lahir">
                        {data?.tanggal_lahir}
                    </Descriptions.Item>
                    <Descriptions.Item label="TMT CPNS">
                        {data?.tmt_pangkat_cpns}
                    </Descriptions.Item>
                    <Descriptions.Item label="TMT PNS">
                        {data?.tmt_pangkat_pns}
                    </Descriptions.Item>
                    <Descriptions.Item label="Nomer Handphone">
                        {data?.no_hp}
                    </Descriptions.Item>
                </Descriptions>
                <Button
                    type="primary"
                    loading={loading}
                    disabled={loading}
                    onClick={downloadHasil}
                    icon={<DownloadOutlined />}
                >
                    Unduh File Pendukung
                </Button>
            </>
        );
    }
};

const Feeds = () => {
    const [nip, setNip] = useState();
    const [debounceValue] = useDebouncedValue(nip, 500);
    const { data, isLoading, refetch } = useQuery(
        ["user-perbaikan-nama", debounceValue],
        () => informasiPembetulanNama(debounceValue),
        {
            enabled: !!debounceValue
        }
    );

    return (
        <>
            <PageContainer
                title="Percepatan Perubahan nama"
                subTitle="SAPK"
                style={{ height: "92vh" }}
            >
                <Card>
                    <Form.Item label="NIP" help="Cari berdasarkan NIP">
                        <Input
                            style={{ width: "40%" }}
                            value={nip}
                            onChange={(e) => setNip(e?.target?.value)}
                        />
                    </Form.Item>
                    <Divider />
                    <Skeleton loading={isLoading}>
                        <DataUser data={data} />
                    </Skeleton>
                </Card>
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
