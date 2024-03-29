import {
    dataJabatan,
    getTokenSIASNService,
    postJabatan
} from "@/services/siasn.services";
import { FileAddFilled, FileAddOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
    Button,
    DatePicker,
    Form,
    Input,
    Modal,
    Select,
    Table,
    Upload,
    message
} from "antd";
import moment from "moment";
import { useState } from "react";
import FormJFT from "./FormJFT";
import FormJFU from "./FormJFU";
import FormUnitOrganisasi from "./FormUnitOrganisasi";
import { API_URL } from "src/utils/util";
import axios from "axios";
import { masterRwJabatan } from "@/services/fasilitator.service";
import { Stack } from "@mantine/core";

const format = "DD-MM-YYYY";

const FormEntri = ({ visible, onCancel, nip }) => {
    const queryClient = useQueryClient();
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
            const {
                tmt_jabatan,
                tgl_sk,
                tmt_pelantikan,
                fungsional_id,
                fungsional_umum_id,
                unor_id,
                nomor_sk,
                jenis_jabatan
            } = await form.validateFields();

            let jenis_jabatan_id = jenis_jabatan === "Fungsional" ? "2" : "4";

            const data = {
                tmtJabatan: moment(tmt_jabatan).format("DD-MM-YYYY"),
                tanggalSk: moment(tgl_sk).format("DD-MM-YYYY"),
                tmtPelantikan: moment(tmt_pelantikan).format("DD-MM-YYYY"),
                jabatanFungsionalId: fungsional_id ? fungsional_id : "-",
                jabatanFungsionalUmumId: fungsional_umum_id
                    ? fungsional_umum_id
                    : "-",
                unorId: unor_id,
                nomorSk: nomor_sk,
                jenisJabatan: jenis_jabatan_id,
                eselonId: "",
                satuanKerjaId: "A5EB03E24213F6A0E040640A040252AD",
                instansiId: "A5EB03E23CCCF6A0E040640A040252AD"
            };

            const currentFile = fileList[0]?.originFileObj;

            if (currentFile) {
                const result = await getTokenSIASNService();

                const wso2 = result?.accessToken?.wso2;
                const sso = result?.accessToken?.sso;

                const formData = new FormData();

                formData.append("file", currentFile);
                formData.append("id_ref_dokumen", "872");
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

                await postJabatan({
                    nip,
                    data: postData
                });

                onCancel();
                form.resetFields();
                setFileList([]);
                setLoading(false);
            } else {
                await postJabatan({
                    nip,
                    data
                });
                onCancel();
                form.resetFields();
                setFileList([]);
                setLoading(false);
            }
            queryClient.invalidateQueries("data-jabatan");
            message.success("Data berhasil disimpan");
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <Modal
            title="Entri Jabatan SIASN"
            width={800}
            visible={visible}
            onOk={handleFinish}
            onCancel={onCancel}
            confirmLoading={loading}
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Upload
                    beforeUpload={() => false}
                    maxCount={1}
                    accept=".pdf"
                    onChange={handleChange}
                    fileList={fileList}
                >
                    <Button icon={<FileAddOutlined />}>Upload</Button>
                </Upload>
                <FormUnitOrganisasi name="unor_id" />
                <Form.Item
                    rules={[{ required: true, message: "Tidak boleh kosong" }]}
                    name="jenis_jabatan"
                    label="Jenis Jabatan"
                >
                    <Select
                        onChange={() => {
                            form.setFieldsValue({
                                fungsional_id: null,
                                fungsional_umum_id: null
                            });
                        }}
                    >
                        <Select.Option value="Pelaksana">
                            Pelaksana
                        </Select.Option>
                        <Select.Option value="Fungsional">
                            Fungsional
                        </Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                        prevValues.jenis_jabatan !== currentValues.jenis_jabatan
                    }
                >
                    {({ getFieldValue }) =>
                        getFieldValue("jenis_jabatan") === "Fungsional" ? (
                            <FormJFT name="fungsional_id" />
                        ) : getFieldValue("jenis_jabatan") === "Pelaksana" ? (
                            <FormJFU name="fungsional_umum_id" />
                        ) : null
                    }
                </Form.Item>
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: "'Nomer SK Tidak boleh kosong"
                        }
                    ]}
                    name="nomor_sk"
                    label="Nomor SK"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: "TMT Jabatan Tidak boleh kosong"
                        }
                    ]}
                    name="tmt_jabatan"
                    label="TMT Jabatan"
                >
                    <DatePicker format={format} />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true }]}
                    name="tmt_pelantikan"
                    label="TMT Pelantikan"
                >
                    <DatePicker format={format} />
                </Form.Item>
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: "Tanggal SK Tidak boleh kosong"
                        }
                    ]}
                    name="tgl_sk"
                    label="Tanggal SK"
                >
                    <DatePicker format={format} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const checkJenisJabatan = (data) => {
    let result = "";
    const jabatanPelaksana = !!data?.jabatanFungsionalUmumNama;
    const jabatanFungsional = !!data?.jabatanFungsionalNama;
    const jabatanStruktural = !!data?.namaJabatan;

    if (jabatanFungsional) {
        result = "Fungsional";
    } else if (jabatanPelaksana) {
        result = "Pelaksana";
    } else if (jabatanStruktural) {
        result = "Struktural";
    }

    return result;
};

const namaJabatan = (data) => {
    let result = "";
    const jabatanPelaksana = !!data?.jabatanFungsionalUmumNama;
    const jabatanFungsional = !!data?.jabatanFungsionalNama;
    const jabatanStruktural = !!data?.namaJabatan;

    if (jabatanFungsional) {
        result = data?.jabatanFungsionalNama;
    } else if (jabatanPelaksana) {
        result = data?.jabatanFungsionalUmumNama;
    } else if (jabatanStruktural) {
        result = data?.namaJabatan;
    }

    return result;
};

const jenisJabatanSiasn = (data) => {
    const { jenis_jabatan_nama } = data;
    let result = "";
    if (jenis_jabatan_nama === "Jabatan Struktural") {
        result = "Struktural";
    } else if (jenis_jabatan_nama === "Jabatan Fungsional Tertentu") {
        result = "Fungsional";
    } else if (jenis_jabatan_nama === "Jabatan Fungsional Umum") {
        result = "Pelaksana";
    }

    return result;
};

function Jabatan({ nip }) {
    const [visible, setVisible] = useState(false);
    const handleOpen = () => setVisible(true);
    const handleClose = () => setVisible(false);

    const { data, isLoading } = useQuery(
        ["data-jabatan", nip],
        () => dataJabatan(nip),
        {
            enabled: !!nip
        }
    );

    const { data: dataMaster, isLoading: loadingMasterJabatan } = useQuery(
        ["data-rw-jabatan-master", nip],
        () => masterRwJabatan(nip)
    );

    const columns = [
        {
            title: "File",
            key: "file",
            render: (_, row) => {
                return (
                    <>
                        {row?.path && (
                            <a
                                href={`/sapk/api/fasilitator/siasn/download?file_path=${row?.path?.[872]?.dok_uri}`}
                                target="_blank"
                            >
                                File
                            </a>
                        )}
                    </>
                );
            }
        },
        {
            title: "Jenis",
            key: "jenis_jabatan",
            render: (row) => <div>{checkJenisJabatan(row)}</div>
        },
        {
            title: "Jabatan",
            key: "nama_jabatan",

            render: (row) => <div>{namaJabatan(row)}</div>
        },

        {
            title: "Unor",
            dataIndex: "unorNama"
        },
        { title: "No. SK", dataIndex: "nomorSk", key: "nomorSk" },
        { title: "TMT Jab", dataIndex: "tmtJabatan", key: "tmtJabatan" },
        { title: "Tgl SK", dataIndex: "tanggalSk", key: "tanggalSk" }
    ];

    const columnsMaster = [
        {
            title: "Jenis",
            dataIndex: "jenis_jabatan",
            render: (_, record) => {
                return (
                    <div>
                        <a href={record?.file} target="_blank">
                            {record?.jenis_jabatan}
                        </a>
                    </div>
                );
            }
        },
        {
            title: "Jabatan",
            key: "jabatan",
            dataIndex: "jabatan"
        },
        {
            title: "Unor",
            key: "unor",
            dataIndex: "unor"
        },
        { title: "No. SK", dataIndex: "nomor_sk", key: "nomor_sk" },
        { title: "TMT. Jab", dataIndex: "tmt_jabatan", key: "tmt_jabatan" },
        { title: "Tgl. SK", dataIndex: "tgl_sk", key: "tgl_sk" },
        { title: "Aktif", dataIndex: "aktif", key: "aktif" }
    ];

    return (
        <div>
            <FormEntri nip={nip} onCancel={handleClose} visible={visible} />
            <Stack>
                <Table
                    title={() => (
                        <Button onClick={handleOpen} icon={<FileAddFilled />}>
                            Jabatan
                        </Button>
                    )}
                    columns={columns}
                    dataSource={data}
                    loading={isLoading}
                    rowKey={(row) => row?.id}
                    pagination={false}
                />
                <Table
                    columns={columnsMaster}
                    dataSource={dataMaster}
                    loading={loadingMasterJabatan}
                    rowKey={(row) => row?.id}
                    pagination={false}
                />
            </Stack>
        </div>
    );
}

export default Jabatan;
