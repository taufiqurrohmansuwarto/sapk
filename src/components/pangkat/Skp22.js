import { rwSkp } from "@/services/master.service";
import { dataSkp22, referensiUnor } from "@/services/siasn.services";
import { FileAddOutlined } from "@ant-design/icons";
import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Modal, Select, Table, TreeSelect } from "antd";
import { useState } from "react";

const FormSKP22 = ({ visible, onCancel, id, unor }) => {
    const [form] = Form.useForm();

    return (
        <Modal
            title="Tambah SKP 22 SIASN"
            centered
            visible={visible}
            onCancel={onCancel}
        >
            <Form form={form}>
                {id}

                <Form.Item name="Unor">
                    <TreeSelect treeData={unor} showSearch />
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
