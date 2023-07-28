import { rwSkp } from "@/services/master.service";
import {
    dataSkp22,
    getTokenSIASNService,
    postSkp22Service,
    referensiUnor
} from "@/services/siasn.services";
import { FileAddOutlined } from "@ant-design/icons";
import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Modal, Select, Table, Upload, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "src/utils/util";
import FormCariPegawai from "./FormCariPegawai";

// const data = {
//     hasilKinerjaNilai: 0,
//     id: "string",
//     kuadranKinerjaNilai: 0,
//     path: [
//         {
//             dok_id: "string",
//             dok_nama: "string",
//             dok_uri: "string",
//             object: "string",
//             slug: "string"
//         }
//     ],
//     penilaiGolongan: "string",
//     penilaiJabatan: "string",
//     penilaiNama: "string",
//     penilaiNipNrp: "string",
//     penilaiUnorNama: "string",
//     perilakuKerjaNilai: 0,
//     pnsDinilaiOrang: "string",
//     statusPenilai: "string",
//     tahun: 0
// };

const FormSKP22 = ({ visible, onCancel, nip }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const handleFinish = async () => {
        try {
            setLoading(true);
            const data = await form.validateFields();

            const currentFile = fileList[0]?.originFileObj;

            if (currentFile) {
                const result = await getTokenSIASNService();

                const wso2 = result?.accessToken?.wso2;
                const sso = result?.accessToken?.sso;

                const formData = new FormData();

                formData.append("file", currentFile);
                formData.append("id_ref_dokumen", "873");

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

                const hasilAkhir = {
                    ...data,
                    path: [hasil?.data?.data]
                };

                await postSkp22Service({
                    nip,
                    data: hasilAkhir
                });

                message.success("Berhasil menambahkan SKP 22");
                setFileList([]);
                onCancel();
                setLoading(false);
            } else {
                await postSkp22Service({
                    nip,
                    data
                });

                message.success("Berhasil menambahkan SKP 22");
                setFileList([]);
                onCancel();
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Tambah SKP 22 SIASN"
            centered
            visible={visible}
            confirmLoading={loading}
            onCancel={onCancel}
            onOk={handleFinish}
            width={1000}
        >
            <Upload
                maxCount={1}
                accept=".pdf"
                onChange={handleChange}
                fileList={fileList}
            >
                <Button icon={<FileAddOutlined />}>Upload</Button>
            </Upload>
            <Form layout="vertical" form={form}>
                <Form.Item
                    name="hasilKinerjaNilai"
                    label="Hasil Kerja Nilai"
                    required
                >
                    <Select>
                        <Select.Option value="1">
                            DIATAS EKSPETASI
                        </Select.Option>
                        <Select.Option value="2">
                            SESUAI EKSPETASI
                        </Select.Option>
                        <Select.Option value="3">
                            DIBAWAH EKSPETASI
                        </Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="perilakuKerjaNilai"
                    label="Perilaku Kerja Nilai"
                    required
                >
                    <Select>
                        <Select.Option value="1">
                            DIATAS EKSPETASI
                        </Select.Option>
                        <Select.Option value="2">
                            SESUAI EKSPETASI
                        </Select.Option>
                        <Select.Option value="3">
                            DIBAWAH EKSPETASI
                        </Select.Option>
                    </Select>
                </Form.Item>
                <FormCariPegawai name="penilai" />
            </Form>
        </Modal>
    );
};

function Skp22({ nip, id }) {
    const [visible, setVisible] = useState(false);
    const { data: tree, isLoading: isLoadingTree } = useQuery(
        ["ref-unor"],
        () => referensiUnor(),
        {
            refetchOnWindowFocus: false
        }
    );

    const handleVisible = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const { data, isLoading } = useQuery(
        ["data-skp-22", nip],
        () => dataSkp22(nip),
        {
            enabled: !!nip
        }
    );

    const { data: dataMaster, isLoading: isLoadingMaster } = useQuery(
        ["data-master-skp", nip],
        () => rwSkp(nip),
        {
            enabled: !!nip
        }
    );

    const columns = [
        {
            title: "Hasil Kinerja",
            dataIndex: "hasilKinerja"
        },
        {
            title: "Hasil Kinerja Nilai",
            dataIndex: "hasilKinerjaNilai"
        },
        {
            title: "Kuadran Kinerja",
            dataIndex: "kuadranKinerja"
        },
        {
            title: "Nama Penilai",
            dataIndex: "namaPenilai"
        },
        {
            title: "Unor Penilai",
            dataIndex: "penilaiUnorNm"
        },
        {
            title: "Perilaku Kerja",
            dataIndex: "perilakuKerja"
        },
        {
            title: "Perilaku Kerja Nilai",
            dataIndex: "PerilakuKerjaNilai"
        },
        {
            title: "Status Penilai",
            dataIndex: "statusPenilai"
        },
        {
            title: "Tahun",
            dataIndex: "tahun"
        }
    ];

    const columnMaster = [
        {
            title: "File",
            key: "file_skp",
            render: (_, record) => (
                <a href={record?.file_skp} target="_blank">
                    File
                </a>
            ),
            width: 100
        },
        {
            title: "Tahun",
            dataIndex: "tahun"
        },
        {
            title: "Hasil Kerja",
            dataIndex: "hasil_kerja"
        },
        {
            title: "Perilaku Kerja",
            dataIndex: "perilaku"
        }
    ];

    return (
        <Stack>
            <FormSKP22
                unor={tree}
                nip={nip}
                visible={visible}
                onCancel={handleCancel}
            />
            <Table
                title={() => (
                    <Button
                        onClick={handleVisible}
                        type="primary"
                        icon={<FileAddOutlined />}
                    >
                        SKP22 SIASN
                    </Button>
                )}
                pagination={false}
                columns={columns}
                loading={isLoading}
                rowKey={(row) => row?.id}
                dataSource={data}
            />
            <Table
                pagination={false}
                columns={columnMaster}
                loading={isLoadingMaster}
                rowKey={(row) => row?.skp_id}
                dataSource={dataMaster}
            />
        </Stack>
    );
}

export default Skp22;
