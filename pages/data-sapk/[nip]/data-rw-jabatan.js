import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import {
    Divider,
    Row,
    Col,
    Card,
    Table,
    Button,
    Modal,
    Skeleton,
    Form,
    Input,
    DatePicker,
    Select,
    TreeSelect
} from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
    informasiPembetulanNama,
    masterRwJabatan,
    refJabatanFungsional,
    refJabatanFungsionalUmum,
    refUnor,
    rwJabatanSapk,
    siasnRwJabatan
} from "../../../services/fasilitator.service";
import DetailPegawai from "../../../src/components/DetailPegawai";
import Layout from "../../../src/components/Layout";
import PageContainer from "../../../src/components/PageContainer";
import { transformDate } from "../../../src/utils/util";

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

const unor = (data) => {
    const induk = data?.unorIndukNama;
    const bawahan = data?.unorNama;

    return `${induk} - ${bawahan}`;
};

// fucking components
const TableRiwayatJabatanSAPK = ({ data, loading }) => {
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
            key: "unor",
            render: (row) => <div>{unor(row)}</div>
        },
        { title: "No. SK", dataIndex: "nomorSk", key: "nomorSk" },
        { title: "TMT Jab", dataIndex: "tmtJabatan", key: "tmtJabatan" },
        { title: "Tgl SK", dataIndex: "tanggalSk", key: "tanggalSk" }
    ];

    return (
        <Table
            size="small"
            dataSource={data}
            pagination={false}
            loading={loading}
            rowKey={(row) => row?.id}
            columns={columns}
        />
    );
};

const TableRiwayatSIASN = ({ data, loading }) => {
    const columns = [
        {
            title: "Jenis",
            key: "jenis_jabatan_nama",
            // dataIndex: "jenis_jabatan_nama"
            render: (row) => <div>{jenisJabatanSiasn(row)}</div>
        },
        {
            title: "Jabatan",
            key: "nama_jabatan",
            dataIndex: "nama_jabatan"
            // render: (row) => <div>{namaJabatan(row)}</div>
        },

        {
            title: "Unor",
            key: "unor_nama",
            dataIndex: "unor_nama"
        },
        { title: "No. SK", dataIndex: "nomor_sk", key: "nomor_sk" },
        { title: "TMT Jab", dataIndex: "tmt_jabatan", key: "tmt_jabatan" },
        { title: "Tgl SK", dataIndex: "tanggal_sk", key: "tanggal_sk" }
    ];

    return (
        <>
            {/* {JSON.stringify(data)} */}
            <Table
                size="small"
                dataSource={data}
                pagination={false}
                loading={loading}
                rowKey={(row) => row?.id}
                columns={columns}
            />
        </>
    );
};

const DialogFormMaster = ({
    visible,
    handleCancel,
    userData,
    id,
    unor,
    fungsional,
    fungsionalUmum
}) => {
    const [form] = Form.useForm();

    useEffect(() => {}, [userData]);

    const format = "DD-MM-YYYY";

    const handleSubmit = async () => {
        try {
            const result = await form.validateFields();
            const {
                tmt_pelantikan,
                tmt_jabatan,
                tgl_sk,
                nomor_sk,
                id,
                unor_id,
                fungsional_id,
                fungsional_umum_id,
                jenis_jabatan
            } = result;

            let jenis_jabatan_id = jenis_jabatan === "Fungsional" ? "2" : "4";
            console.log(jenis_jabatan);

            const postDataSapk = {
                id: null,
                jenisJabatan: jenis_jabatan_id,
                unorId: unor_id,
                eselonId: "",
                instansiId: "A5EB03E23CCCF6A0E040640A040252AD",
                pnsId: id,
                jabatanFungsionalId: fungsional_id ? fungsional_id : "",
                jabatanFungsionalUmumId: fungsional_umum_id
                    ? fungsional_umum_id
                    : "",
                nomorSk: nomor_sk,
                tanggalSk: moment(tgl_sk).format("DD-MM-YYYY"),
                tmtJabatan: moment(tmt_jabatan).format("DD-MM-YYYY"),
                tmtPelantikan: moment(tmt_pelantikan).format("DD-MM-YYYY"),
                pnsUserId: id
            };

            // alert(JSON.stringify(postDataSapk));
            console.log(postDataSapk);
        } catch (error) {}
    };

    return (
        <Modal
            centered
            title="Transfer Data"
            visible={visible}
            destroyOnClose
            width={1200}
            onCancel={handleCancel}
            onOk={handleSubmit}
        >
            <div>
                {userData?.jenis_jabatan} : {userData?.jabatan}
            </div>
            <div>unor : {userData?.unor}</div>
            <Divider />
            <Form
                form={form}
                initialValues={{
                    id,
                    tmt_jabatan: moment(userData?.tmt_jabatan, format),
                    tmt_pelantikan: moment(userData?.tmt_jabatan, format),
                    tgl_sk: moment(userData?.tgl_sk, format),
                    nomor_sk: userData?.nomor_sk,
                    jenis_jabatan: userData?.jenis_jabatan
                }}
                layout="vertical"
            >
                <Form.Item name="id" label="ID Pegawai SAPK">
                    <Input readOnly />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true }]}
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
                    name="unor_id"
                    label="Unor"
                    rules={[{ required: true }]}
                >
                    <TreeSelect
                        showSearch
                        treeNodeFilterProp="title"
                        treeData={unor}
                    />
                </Form.Item>
                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                        prevValues.jenis_jabatan !== currentValues.jenis_jabatan
                    }
                >
                    {({ getFieldValue }) =>
                        getFieldValue("jenis_jabatan") === "Fungsional" ? (
                            <Form.Item
                                name="fungsional_id"
                                label="Fungsional"
                                rules={[{ required: true }]}
                            >
                                <Select optionFilterProp="nama" showSearch>
                                    {fungsional?.map((f) => (
                                        <Select.Option
                                            key={f?.id}
                                            value={f?.id}
                                            nama={f?.nama}
                                        >
                                            {f?.nama}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        ) : (
                            <Form.Item
                                name="fungsional_umum_id"
                                label="Pelaksana"
                                rules={[{ required: true }]}
                            >
                                <Select optionFilterProp="nama" showSearch>
                                    {fungsionalUmum?.map((f) => (
                                        <Select.Option
                                            key={f?.id}
                                            value={f?.id}
                                            nama={f?.nama}
                                        >
                                            {f?.nama}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        )
                    }
                </Form.Item>
                <Form.Item
                    rules={[{ required: true }]}
                    name="nomor_sk"
                    label="Nomor SK"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true }]}
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
                    rules={[{ required: true }]}
                    name="tgl_sk"
                    label="Tanggal SK"
                >
                    <DatePicker format={format} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const TableRiwayatMaster = ({
    data,
    loading,
    id,
    unor,
    fungsional,
    fungsionalUmum
}) => {
    const [visible, setVisible] = useState(false);
    const [userData, setUserData] = useState(null);

    const handleOpen = (user) => {
        setUserData(user);
        setVisible(true);
    };
    const handleCancel = () => {
        setUserData(null);
        setVisible(false);
    };

    const columns = [
        {
            title: "Jenis",
            key: "jenis_jabatan",
            dataIndex: "jenis_jabatan"
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
        { title: "TMT Jab", dataIndex: "tmt_jabatan", key: "tmt_jabatan" },
        { title: "Tgl SK", dataIndex: "tgl_sk", key: "tgl_sk" },
        { title: "Aktif", dataIndex: "aktif", key: "aktif" },
        {
            title: "Aksi",
            dataIndex: "aksi",
            render: (_, row) => {
                if (row?.jenis_jabatan !== "Struktural") {
                    return (
                        <Button onClick={() => handleOpen(row)}>Trans</Button>
                    );
                } else {
                    return null;
                }
            }
        }
    ];

    return (
        <>
            <DialogFormMaster
                visible={visible}
                handleOpen={handleOpen}
                unor={unor}
                fungsional={fungsional}
                fungsionalUmum={fungsionalUmum}
                handleCancel={handleCancel}
                userData={userData}
                id={id}
            />
            <Table
                size="small"
                dataSource={data}
                pagination={false}
                loading={loading}
                rowKey={(row) => row?.id}
                columns={columns}
            />
        </>
    );
};

const RiwayatJabatan = () => {
    const router = useRouter();

    const { data, isLoading, error } = useQuery(
        ["data-rw-jabatan", router?.query?.nip],
        () => rwJabatanSapk(router?.query?.nip)
    );

    const { data: dataMaster, isLoading: loadingMasterJabatan } = useQuery(
        ["data-rw-jabatan-master", router?.query?.nip],
        () => masterRwJabatan(router?.query?.nip)
    );

    const { data: currentUser, isLoading: currentUserLoading } = useQuery(
        ["user-perbaikan-nama", router?.query?.nip],
        () => informasiPembetulanNama(router?.query?.nip)
    );

    const { data: dataUnor } = useQuery(["ref-unor"], () => refUnor(), {
        refetchOnWindowFocus: false
    });
    const { data: dataJabatanFungsional } = useQuery(
        ["ref-fungsional"],
        () => refJabatanFungsional(),
        {
            refetchOnWindowFocus: false
        }
    );
    const { data: dataJabatanFungsionalUmum } = useQuery(
        ["ref-fungsional-umum"],
        () => refJabatanFungsionalUmum(),
        {
            refetchOnWindowFocus: false
        }
    );

    const { data: dataSiasn, isLoading: loadingSiasn } = useQuery(
        ["data-rw-jabatan-siasn", router?.query?.nip],
        () => siasnRwJabatan(router?.query?.nip)
    );

    return (
        <PageContainer
            onBack={() => router?.back()}
            title="Data Integrasi"
            style={{ minHeight: "92vh" }}
            subTitle="Riwayat Jabatan"
        >
            <Skeleton loading={currentUserLoading}>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <DetailPegawai user={currentUser} />
                    </Col>
                </Row>
                <Divider>Padanan Data </Divider>
                <Row gutter={[8, 8]}>
                    <Col span={11}>
                        <Card title="Data Riwayat Jabatan SAPK">
                            <TableRiwayatJabatanSAPK
                                loading={isLoading}
                                data={data}
                            />
                        </Card>
                    </Col>
                    <Col span={13}>
                        <Card title="Data Riwayat Jabatan Master">
                            <TableRiwayatMaster
                                unor={dataUnor}
                                fungsional={dataJabatanFungsional}
                                fungsionalUmum={dataJabatanFungsionalUmum}
                                data={dataMaster}
                                loading={loadingMasterJabatan}
                                id={currentUser?.id_sapk}
                            />
                        </Card>
                    </Col>
                </Row>
                <Divider />
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Card title="Data Riwayat Jabatan SIASN">
                            <TableRiwayatSIASN
                                data={dataSiasn}
                                loading={loadingSiasn}
                            />
                        </Card>
                    </Col>
                </Row>
            </Skeleton>
        </PageContainer>
    );
};

RiwayatJabatan.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatJabatan.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default RiwayatJabatan;
