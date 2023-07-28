import { rwAngkakredit } from "@/services/master.service";
import {
    dataAngkaKredit,
    getTokenSIASNService,
    postAngkaKreditService
} from "@/services/siasn.services";
import { FileAddOutlined } from "@ant-design/icons";
import { Stack } from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal,
    Row,
    Table,
    Upload
} from "antd";
import { useState } from "react";
import FormRiwayatJabatan from "./FormRiwayatJabatan";
import { API_URL } from "src/utils/util";
import axios from "axios";

// const data = {
//     bulanMulaiPenilaian: "string",
//     bulanSelesaiPenilaian: "string",
//     id: "string",
//     isAngkaKreditPertama: "string",
//     kreditBaruTotal: "string",
//     kreditPenunjangBaru: "string",
//     kreditUtamaBaru: "string",
//     nomorSk: "string",
//     path: [
//         {
//             dok_id: "string",
//             dok_nama: "string",
//             dok_uri: "string",
//             object: "string",
//             slug: "string"
//         }
//     ],
//     pnsId: "string",
//     pnsUserId: "string",
//     rwJabatanId: "string",
//     tahunMulaiPenilaian: "string",
//     tahunSelesaiPenilaian: "string",
//     tanggalSk: "string"
// };

const FormAngkaKredit = ({ visible, onCancel, nip }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const queryClient = useQueryClient();

    const [fileList, setFileList] = useState([]);

    const handleChange = (info) => {
        let fileList = [...info.fileList];

        fileList = fileList.slice(-1);

        fileList = fileList.map((file) => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });

        setFileList(fileList);
    };

    const onFinish = async () => {
        setLoading(true);
        try {
            const result = await form.validateFields();
            const { selesaiPenilaian, mulaiPenilaian, ...rest } = result;
            const data = {
                ...rest,
                bulanMulaiPenailan: mulaiPenilaian.format("M"),
                bulanSelesaiPenailan: selesaiPenilaian.format("M"),
                tahunMulaiPenailan: mulaiPenilaian.format("YYYY"),
                tahunSelesaiPenailan: selesaiPenilaian.format("YYYY"),
                isAngkaKreditPertama: rest?.isAngkaKreditPertama ? "1" : "0",
                isIntegrasi: rest?.isIntegrasi ? "1" : "0",
                isKonversi: rest?.isKonversi ? "1" : "0",
                tanggalSk: rest?.tanggalSk.format("DD-MM-YYYY")
            };

            const currentFile = fileList[0]?.originFileObj;

            if (currentFile) {
                const result = await getTokenSIASNService();

                const wso2 = result?.accessToken?.wso2;
                const sso = result?.accessToken?.sso;

                const formData = new FormData();

                formData.append("file", currentFile);
                formData.append("id_ref_dokumen", "879");
                const hasil = await axios.post(
                    `${API_URL}/upload-dok`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${wso2}`,
                            Auth: `bearer ${sso}`
                        }
                    }
                );

                const postData = {
                    ...data,
                    path: [hasil?.data?.data]
                };

                await postAngkaKreditService({
                    nip,
                    data: postData
                });

                queryClient.invalidateQueries("angka-kredit");
                setLoading(false);
                onCancel();
                setFileList([]);
            } else {
                await postAngkaKreditService({
                    nip,
                    data
                });

                queryClient.invalidateQueries("angka-kredit");
                setLoading(false);
                onCancel();
                setFileList([]);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <Modal
            confirmLoading={loading}
            title="Tambah Angka Kredit"
            centered
            visible={visible}
            width={800}
            onCancel={onCancel}
            onOk={onFinish}
        >
            <Form form={form} layout="vertical">
                <Upload
                    maxCount={1}
                    accept=".pdf"
                    onChange={handleChange}
                    fileList={fileList}
                >
                    <Button icon={<FileAddOutlined />}>Upload</Button>
                </Upload>
                <Form.Item required name="nomorSk" label="Nomor SK">
                    <Input />
                </Form.Item>
                <Form.Item required name="tanggalSk" label="Tanggal SK">
                    <DatePicker format={"DD-MM-YYYY"} />
                </Form.Item>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            required
                            name="mulaiPenilaian"
                            label="Mulai Penilaian"
                        >
                            <DatePicker picker="month" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            required
                            name="selesaiPenilaian"
                            label="Selesai Penilaian"
                        >
                            <DatePicker picker="month" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item
                            required
                            name="kreditUtamaBaru"
                            label="Kredit Utama Baru"
                        >
                            <InputNumber />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="kreditPenunjangBaru"
                            label="Kredit Penunjang Baru"
                            required
                        >
                            <InputNumber />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            required
                            name="kreditBaruTotal"
                            label="Kredit Baru Total"
                        >
                            <InputNumber />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    valuePropName="checked"
                    name="isAngkaKreditPertama"
                    lable="Angka Kredit Pertama"
                >
                    <Checkbox>Angka Kredit Pertama?</Checkbox>
                </Form.Item>
                <Form.Item
                    valuePropName="checked"
                    name="isIntegrasi"
                    lable="Integrasi?"
                >
                    <Checkbox>Integrasi</Checkbox>
                </Form.Item>
                <Form.Item
                    valuePropName="checked"
                    name="isKonversi"
                    lable="Konversi?"
                >
                    <Checkbox>Konversi</Checkbox>
                </Form.Item>
                <FormRiwayatJabatan nip={nip} name="rwJabatanId" />
            </Form>
        </Modal>
    );
};

function AngkaKredit({ nip }) {
    const { data, isLoading } = useQuery(["angka-kredit", nip], () =>
        dataAngkaKredit(nip)
    );

    const { data: dataRwAngkakredit, isLoading: isLoadingAngkaKredit } =
        useQuery(["angkat-kredit-master", nip], () => rwAngkakredit(nip));

    const [visible, setVisible] = useState(false);

    const handleVisible = () => setVisible(true);
    const handleCancel = () => setVisible(false);

    const columns = [
        {
            title: "File",
            key: "path",
            render: (_, record) => {
                return (
                    <>
                        {record?.path && (
                            <div>
                                <a
                                    href={`/sapk/api/fasilitator/siasn/download?file_path=${record?.path?.[879]?.dok_uri}`}
                                    target="_blank"
                                >
                                    File
                                </a>
                            </div>
                        )}
                    </>
                );
            }
        },
        {
            title: "Nomor SK",
            dataIndex: "nomorSk"
        },
        {
            title: "Bulan Mulai Penilaian",
            dataIndex: "bulanMulaiPenailan"
        },
        {
            title: "Tahun Mulai Penilaian",
            dataIndex: "tahunMulaiPenailan"
        },
        {
            title: "Bulan Selesai Penilaian",
            dataIndex: "bulanSelesaiPenailan"
        },
        {
            title: "Tahun Selesai Penilaian",
            dataIndex: "tahunSelesaiPenailan"
        },
        {
            title: "Kredit Utama Baru",
            dataIndex: "kreditUtamaBaru"
        },
        {
            title: "Kredit Penunjang Baru",
            dataIndex: "kreditPenunjangBaru"
        },
        {
            title: "Kredit Baru Total",
            dataIndex: "kreditBaruTotal"
        },
        {
            title: "Nama Jabatan",
            dataIndex: "namaJabatan"
        }
    ];

    const columnsMaster = [
        {
            title: "File",
            key: "file",
            render: (_, record) => {
                return (
                    <a href={record?.file_pak} target="_blank">
                        File
                    </a>
                );
            }
        },
        {
            title: "Nomor SK",
            dataIndex: "no_sk"
        },
        {
            title: "Kredit Utama Baru",
            dataIndex: "nilai_unsur_utama_baru"
        },

        {
            title: "Kredit Baru Total",
            dataIndex: "nilai_pak"
        }
    ];

    return (
        <Stack>
            <FormAngkaKredit
                nip={nip}
                visible={visible}
                onCancel={handleCancel}
            />
            <Table
                title={() => (
                    <Button
                        onClick={handleVisible}
                        icon={<FileAddOutlined />}
                        type="primary"
                    >
                        Angka Kredit
                    </Button>
                )}
                columns={columns}
                rowKey={(record) => record.id}
                pagination={false}
                loading={isLoading}
                dataSource={data}
            />
            <Table
                columns={columnsMaster}
                rowKey={(record) => record.pak_id}
                pagination={false}
                loading={isLoading}
                dataSource={dataRwAngkakredit}
            />
        </Stack>
    );
}

export default AngkaKredit;
