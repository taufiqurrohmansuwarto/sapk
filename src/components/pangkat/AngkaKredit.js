import { rwAngkakredit } from "@/services/master.service";
import { dataAngkaKredit } from "@/services/siasn.services";
import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
    Button,
    Checkbox,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal,
    Table
} from "antd";
import { useState } from "react";
import FormRiwayatJabatan from "./FormRiwayatJabatan";

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

    const onFinish = async () => {
        const result = await form.validateFields();
        const { selesaiPenilaian, mulaiPenilaian, ...rest } = result;
        const data = {
            ...rest,
            bulanMulaiPenilaian: mulaiPenilaian.format("MM"),
            bulanSelesaiPenilaian: selesaiPenilaian.format("MM"),
            tahunMulaiPenilaian: mulaiPenilaian.format("YYYY"),
            tahunSelesaiPenilaian: selesaiPenilaian.format("YYYY"),
            isAngkaKreditPertama: rest?.isAngkaKreditPertama ? "1" : "0"
        };
        console.log(data);
    };

    return (
        <Modal
            title="Tambah Angka Kredit"
            centered
            visible={visible}
            width={800}
            onCancel={onCancel}
            onOk={onFinish}
        >
            <Form form={form} layout="vertical">
                <Form.Item required name="nomorSk" label="Nomor SK">
                    <Input />
                </Form.Item>
                <Form.Item
                    required
                    name="mulaiPenilaian"
                    label="Mulai Penilaian"
                >
                    <DatePicker picker="month" />
                </Form.Item>
                <Form.Item
                    required
                    name="selesaiPenilaian"
                    label="Selesai Penilaian"
                >
                    <DatePicker picker="month" />
                </Form.Item>
                <Form.Item
                    required
                    name="kreditUtamaBaru"
                    label="Kredit Utama Baru"
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="kreditPenunjangBaru"
                    label="Kredit Penunjang Baru"
                    required
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    required
                    name="kreditBaruTotal"
                    label="Kredit Baru Total"
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    valuePropName="checked"
                    name="isAngkaKreditPertama"
                    lable="Angka Kredit Pertama"
                >
                    <Checkbox>Angka Kredit Pertama?</Checkbox>
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
            title: "Kredit Baru Total",
            dataIndex: "kreditBaruTotal"
        },
        {
            title: "Nama Jabatan",
            dataIndex: "namaJabatan"
        },
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
                                    Download
                                </a>
                            </div>
                        )}
                    </>
                );
            }
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
                    <Button onClick={handleVisible}>Tambah Angka Kredit</Button>
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
