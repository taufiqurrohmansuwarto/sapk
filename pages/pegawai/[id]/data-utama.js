import { dataUtama } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Divider, Form, Input, Skeleton, Space } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function DataUtama() {
    const router = useRouter();
    const id = router.query.id;
    const form = Form.useForm();

    const { data, isLoading } = useQuery(["data-pasangan", id], () =>
        dataUtama(id)
    );
    return (
        <PegawaiLayout title="Data Utama">
            {/* {JSON.stringify(data)} */}
            <Skeleton loading={isLoading}>
                <Form
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 20 }}
                    style={{ maxWidth: 600 }}
                    initialValues={data}
                    autoComplete="off"
                >
                    <Form.Item label="NIP" name="nip_baru">
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item label="ID Pegawai" name="id">
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item label="Nama Lengkap" name="nama">
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item
                        label="Instansi Kerja"
                        name="instansi_kerja_nama"
                    >
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item
                        label="Instansi Induk Nama"
                        name="instansi_induk_nama"
                    >
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item label="Unor Nama" name="unor_nama">
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item label="Unor Induk Nama" name="unor_induk_nama">
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item label="Kanreg" name="kanreg_induk_nama">
                        <Input readOnly />
                    </Form.Item>
                </Form>
            </Skeleton>
        </PegawaiLayout>
    );
}

DataUtama.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

DataUtama.getLayout = function getLayout(page) {
    return <Layout title="Data Utama">{page}</Layout>;
};

export default DataUtama;
