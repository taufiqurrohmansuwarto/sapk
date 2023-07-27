import { dataJabatan } from "@/services/siasn.services";
import { FileAddFilled, FileOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Modal, Table } from "antd";
import { useState } from "react";
import FormUnitOrganisasi from "./FormUnitOrganisasi";

const FormEntri = ({ visible, onCancel }) => {
    const [form] = Form.useForm();
    const handleFinish = async () => {};

    return (
        <Modal visible={visible} onCancel={onCancel}>
            <Form form={form} onFinish={handleFinish}>
                <FormUnitOrganisasi name="unorId" />
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

    const columns = [
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

    return (
        <div>
            <FormEntri onCancel={handleClose} visible={visible} />
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
        </div>
    );
}

export default Jabatan;
