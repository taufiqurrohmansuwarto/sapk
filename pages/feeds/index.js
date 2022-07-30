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
    Modal,
    Skeleton,
    Space
} from "antd";
import FileSaver from "file-saver";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { StringDiff } from "react-string-diff";
import ReactWhatsapp from "react-whatsapp";
import {
    filePembetulanNama,
    informasiPembetulanNama,
    tambahkanData
} from "../../services/fasilitator.service";
import Layout from "../../src/components/Layout";
import PageContainer from "../../src/components/PageContainer";
import { useSession } from "next-auth/react";

const TombolTambahkan = ({ data }) => {
    const [visible, setVisible] = useState(false);
    const { mutate: create, isLoading } = useMutation(
        (data) => tambahkanData(data),
        {
            onError: (error) => {
                alert(error?.response?.data?.message);
                console.log(error);
            },
            onSuccess: () => {
                message.success("hahaha");
                setVisible(false);
            }
        }
    );

    const [form] = Form.useForm();

    const handleCancel = () => setVisible(false);
    const showModal = () => setVisible(true);

    const handleTambahData = async () => {
        // those properties are, nip, nama_master, nama_sapk, pembetulan
        try {
            const data = await form.validateFields();
            const data_post = {
                nama_master: data?.nama,
                nip: data?.nip,
                nama_sapk: data?.nama_sapk,
                pembetulan: data?.pembetulan
            };
            create(data_post);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Modal
                visible={visible}
                onCancel={handleCancel}
                title="Form Pembetulan Nama"
                centered
                onOk={handleTambahData}
                confirmLoading={isLoading}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{ ...data, pembetulan: data?.nama }}
                >
                    <Form.Item name="nip" label="NIP">
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item name="nama" label="Nama Master">
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item name="nama_sapk" label="Nama SAPK">
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item
                        help="Bisa diedit kalau sekiranya salah"
                        name="pembetulan"
                        label="Nama Seharusnya"
                        rules={[
                            {
                                required: true,
                                message: "Nama Seharusnya harus diisi"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Button onClick={showModal}>Tambahkan</Button>
        </div>
    );
};

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
                    <TombolTambahkan data={data} />
                </Space>
            </>
        );
    }
};

const Feeds = () => {
    const { data, status } = useSession();
    return (
        <>
            <PageContainer
                title="Beranda"
                subTitle="Solusi SIASN,SIMASTER dan SAPK"
                style={{ height: "92vh" }}
            >
                <Card>
                    <div>Hallo, {data?.user?.name}. Sehat ga? </div>
                </Card>
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
