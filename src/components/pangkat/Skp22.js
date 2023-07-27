import { rwSkp } from "@/services/master.service";
import { dataSkp22, referensiUnor } from "@/services/siasn.services";
import { FileAddOutlined } from "@ant-design/icons";
import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, Modal, Table } from "antd";
import { useState } from "react";

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

const FormSKP22 = ({ visible, onCancel, id, unor }) => {
    const [form] = Form.useForm();

    const handleFinish = async () => {
        const result = await form.validateFields();
        console.log(result);
    };

    return (
        <Modal
            title="Tambah SKP 22 SIASN"
            centered
            visible={visible}
            onCancel={onCancel}
            onOk={handleFinish}
            width={1000}
        >
            <Form layout="vertical" form={form}>
                <Form.Item name="hasilKinerjaNilai" label="Hasil Kinerja Nilai">
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="kuadranKinerjaNilai"
                    label="Kuadran Kinerja Nilai"
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="perilakuKinerjaNilai"
                    label="Perilaku Kinerja Nilai"
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item name="penilaiGolongan" label="Penilai Golongan">
                    <Input />
                </Form.Item>
                <Form.Item name="penilaiJabatan" label="Penilai Jabatan">
                    <Input />
                </Form.Item>
                <Form.Item name="penilaiNama" label="Penilai Nama">
                    <Input />
                </Form.Item>
                <Form.Item name="penilaiNipNrp" label="Penilai NIP/NRP">
                    <Input />
                </Form.Item>
                <Form.Item name="penilaiUnorNama" label="Penilai Unor Nama">
                    <Input />
                </Form.Item>
                <Form.Item name="pnsDinilaiOrang" label="PNS dinilai Orang">
                    <Input />
                </Form.Item>
                <Form.Item name="statusPenilai" label="Status Penilai">
                    <Input />
                </Form.Item>
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
                id={id}
                visible={visible}
                onCancel={handleCancel}
            />
            {JSON.stringify(data)}
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
                rowKey={(row) => row?.id}
                dataSource={dataMaster}
            />
        </Stack>
    );
}

export default Skp22;
