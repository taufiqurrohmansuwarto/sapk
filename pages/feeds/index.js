import { DownloadOutlined } from "@ant-design/icons";
import { parsePhoneNumber } from "awesome-phonenumber";
import { useDebouncedValue } from "@mantine/hooks";
import {
    Alert,
    Button,
    Card,
    Descriptions,
    Divider,
    Form,
    Input,
    message,
    Skeleton,
    Space
} from "antd";
import FileSaver from "file-saver";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useQuery } from "react-query";
import { StringDiff } from "react-string-diff";
import ReactWhatsapp from "react-whatsapp";
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
                <Descriptions title="Informasi Pegawai SAPK">
                    <Descriptions.Item label="Nama">
                        {data?.nama_sapk}
                    </Descriptions.Item>
                    <Descriptions.Item label="NIP Baru SAPK">
                        {data?.nip_sapk}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tanggal Lahir SAPK">
                        {data?.tanggal_lahir_sapk}
                    </Descriptions.Item>
                </Descriptions>

                <Divider />
                <Descriptions title="Informasi Pegawai E-Master">
                    <Descriptions.Item label="Nama">
                        {data?.nama}
                    </Descriptions.Item>
                    <Descriptions.Item label="NIP">
                        {data?.nip}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tanggal Lahir">
                        {data?.tanggal_lahir?.replaceAll("/", "-")}
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
                <Divider />
                <Alert
                    description="Perbandingan nama, jika nama berwarna hitam artinya tidak masalah atau sama. Jika ada huruf berwarna hijau maka ada penambahan, jika berwarna merah ada pengurangan huruf"
                    message="Perhatian"
                    type="warning"
                    showIcon
                    style={{ marginBottom: 10 }}
                />
                <Descriptions title="Hasil Komparasi">
                    <Descriptions.Item label="Nama">
                        <StringDiff
                            newValue={data?.nama}
                            oldValue={data?.nama_sapk}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="NIP">
                        <StringDiff
                            newValue={data?.nip}
                            oldValue={data?.nip_sapk}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="Tanggal Lahir">
                        <StringDiff
                            newValue={data?.tanggal_lahir?.replaceAll("/", "-")}
                            oldValue={data?.tanggal_lahir_sapk}
                        />
                    </Descriptions.Item>
                </Descriptions>
                <Space>
                    <ReactWhatsapp
                        number={`${parsePhoneNumber(
                            data?.no_hp,
                            "ID"
                        ).getNumber()}`}
                        message="Hallo kami dari BKD Provinsi Jawa Timur"
                    >
                        Call Pasien
                    </ReactWhatsapp>
                    <Button
                        type="primary"
                        loading={loading}
                        disabled={loading}
                        onClick={downloadHasil}
                        icon={<DownloadOutlined />}
                    >
                        Unduh File Pendukung
                    </Button>
                </Space>
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
