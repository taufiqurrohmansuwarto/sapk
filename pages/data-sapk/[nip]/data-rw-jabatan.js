import { useDebouncedValue } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    Alert,
    Button,
    Card,
    Col,
    Collapse,
    DatePicker,
    Divider,
    Form,
    Input,
    message,
    Modal,
    Row,
    Select,
    Skeleton,
    Spin,
    Table,
    TreeSelect
} from "antd";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
    addJabatanSapk,
    bypassJabatanSIASN,
    createDataImport,
    detailJf,
    detailJfu,
    informasiPembetulanNama,
    masterRwJabatan,
    refUnor,
    rwJabatanSapk,
    siasnRwJabatan,
    simpanJaban
} from "../../../services/fasilitator.service";
import Checker from "../../../src/components/Checker";
import DetailPegawai from "../../../src/components/DetailPegawai";
import Layout from "../../../src/components/Layout";
import PageContainer from "../../../src/components/PageContainer";
import { useSession } from "next-auth/react";

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
    const [showUpdate, setShowUpdate] = useState(false);

    const handleShow = () => setShowUpdate(true);
    const handleCancel = () => setShowUpdate(false);

    const handleRemove = async (row) => {
        alert(row?.id);
    };

    const handleUpdate = async (row) => {};

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
        { title: "Tgl SK", dataIndex: "tanggal_sk", key: "tanggal_sk" },
        {
            title: "Aksi",
            key: "aksi",
            render: (_, row) => {
                return (
                    <>
                        <a onClick={() => handleRemove(row)}>Hapus</a>
                        <Divider type="vertical" />
                        <a>Update</a>
                    </>
                );
            }
        }
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

const FormJFU = ({ name, help }) => {
    const [jfu, setJfu] = useState(undefined);
    const [debounceValue] = useDebouncedValue(jfu, 500);

    const { data: dataJfu, isLoading: isLoadingJfu } = useQuery(
        ["data-jfu", debounceValue],
        () => detailJfu(debounceValue),
        {
            enabled: Boolean(debounceValue)
        }
    );

    return (
        <>
            <Form.Item
                label={`Jabatan Fungsional Umum - (${help})`}
                rules={[{ required: true }]}
                name={name}
                // help={help}
            >
                <Select
                    showSearch
                    filterOption={false}
                    placeholder="Pilih Jabatan Fungsional Umum"
                    loading={isLoadingJfu}
                    notFoundContent={
                        isLoadingJfu && debounceValue ? (
                            <Spin size="small" />
                        ) : null
                    }
                    onSearch={(value) => setJfu(value)}
                >
                    {dataJfu?.map((item) => (
                        <Select.Option key={item?.id} value={item?.id}>
                            {item?.nama} - {item?.cepat_kode}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </>
    );
};

const FormJFT = ({ name, help }) => {
    const [jfu, setJfu] = useState(undefined);
    const [debounceValue] = useDebouncedValue(jfu, 500);

    const { data: dataJfu, isLoading: isLoadingJfu } = useQuery(
        ["data-jfu", debounceValue],
        () => detailJf(debounceValue),
        {
            enabled: Boolean(debounceValue)
        }
    );

    return (
        <>
            <Form.Item
                label={`Jabatan Fungsional Tertentu - (${help})`}
                rules={[{ required: true }]}
                name={name}
            >
                <Select
                    showSearch
                    filterOption={false}
                    placeholder="Pilih Jabatan Fungsional Tertentu"
                    loading={isLoadingJfu}
                    notFoundContent={
                        isLoadingJfu && debounceValue ? (
                            <Spin size="small" />
                        ) : null
                    }
                    onSearch={(value) => setJfu(value)}
                >
                    {dataJfu?.map((item) => (
                        <Select.Option key={item?.id} value={item?.id}>
                            {item?.nama} - {item?.cepat_kode}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </>
    );
};

const DialogFormMaster = ({
    visible,
    handleCancel,
    userData,
    id,
    unor,
    user
}) => {
    const [form] = Form.useForm();
    const router = useRouter();

    const client = useQueryClient();

    const { mutate: tambahJabatanSIASN, isLoading } = useMutation(
        (data) => bypassJabatanSIASN(data),
        {
            onError: (e) => console.log(e),
            onSuccess: () => {
                message.success("wkkwkw");
                client.invalidateQueries(["data-rw-jabatan-siasn"]);
                handleCancel();
            }
        }
    );

    const { mutate: tambahJabatanSapk, isLoading: isLoadingTambahJabatanSapk } =
        useMutation((data) => addJabatanSapk(data), {
            onError: (e) => alert(e),
            onSuccess: () => {
                message.success("berhasil");
                client.invalidateQueries(["data-rw-jabatan-sapk"]);
                handleCancel();
            }
        });

    const { mutate: tambahImport, isLoading: isLoadingTambahImport } =
        useMutation((data) => createDataImport(data), {
            onError: (e) =>
                alert(
                    "Pasien sudah dientri oleh petugas lain harap cek kembali di menu full import"
                ),
            onSuccess: () => {
                message.success("Berhasil ditambahkan");
                handleCancel();
            }
        });

    const queryClient = useQueryClient();

    const { mutate: saveJabatan, isLoading: isLoadingSaveJabatan } =
        useMutation((data) => simpanJaban(data), {
            onError: (e) => {
                message.error("Gagal ditambahkan");
            },
            onSuccess: () => {
                queryClient.invalidateQueries(["data-rw-jabatan"]);
                message.success("Berhasil ditambahkan");
                handleCancel();
            }
        });

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
                // tambah_riwayat_unor_saja
            } = result;

            let jenis_jabatan_id = jenis_jabatan === "Fungsional" ? "2" : "4";

            const pemprovId = "A5EB03E23CCCF6A0E040640A040252AD";
            const bkdId = "466D9577BDB70F89E050640A29022FEF";

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

            const data = {
                nip: router?.query?.nip,
                pegawai_id: id,
                unor_id: unor_id,
                jft_id: fungsional_id ? fungsional_id : "",
                jfu_id: fungsional_umum_id ? fungsional_umum_id : "",
                no_sk: nomor_sk,
                tgl_sk: moment(tgl_sk).format("DD-MM-YYYY"),
                tmt_jabatan: moment(tmt_jabatan).format("DD-MM-YYYY"),
                tmt_pelantikan: moment(tmt_pelantikan).format("DD-MM-YYYY"),
                nama: user?.nama
                // tambah_riwayat_unor_saja
            };

            // we fucking need usulan id
            const postDataSIASN = {
                pnsId: user?.id_sapk,
                tmtJabatan: moment(tmt_jabatan).format("DD-MM-YYYY"),
                tanggalSk: moment(tgl_sk).format("DD-MM-YYYY"),
                tmtPelantikan: moment(tmt_pelantikan).format("DD-MM-YYYY"),
                // jabatan_struktural_id: "-",
                jabatanFungsionalId: fungsional_id ? fungsional_id : "-",
                jabatanFungsionalUmumId: fungsional_umum_id
                    ? fungsional_umum_id
                    : "-",
                unorId: unor_id,
                nomorSk: nomor_sk,
                jenisJabatan: jenis_jabatan_id,
                eselonId: "",
                // slave
                // unorId: "466D9577BDB70F89E050640A29022FEF",
                satuanKerjaId: "A5EB03E24213F6A0E040640A040252AD",
                instansiId: "A5EB03E23CCCF6A0E040640A040252AD"
            };

            saveJabatan(postDataSIASN);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            centered
            title="Transfer Data Ke SIASN"
            maskClosable={false}
            confirmLoading={isLoadingSaveJabatan}
            visible={visible}
            destroyOnClose
            width={800}
            onCancel={handleCancel}
            onOk={handleSubmit}
        >
            {/* <Collapse>
                <Collapse.Panel header="Data SIMASTER">
                    <Form layout="vertical">
                        <Form.Item label="Jenis Jabatan">
                            <Input readOnly value={userData?.jenis_jabatan} />
                        </Form.Item>
                        <Form.Item label="Jabatan">
                            <Input readOnly value={userData?.jabatan} />
                        </Form.Item>
                        <Form.Item label="Unor SIMASTER">
                            <Input readOnly value={user?.skpd} />
                        </Form.Item>
                    </Form>
                </Collapse.Panel>
            </Collapse> */}
            {/* <Divider /> */}
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
                <Form.Item
                    rules={[{ required: true }]}
                    name="jenis_jabatan"
                    label={`Jenis Jabatan - (${userData?.jenis_jabatan})`}
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
                    label={`Unor - (${user?.skpd})`}
                    rules={[{ required: true }]}
                    // help={user?.skpd}
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
                            <FormJFT
                                help={userData?.jabatan}
                                name="fungsional_id"
                            />
                        ) : getFieldValue("jenis_jabatan") === "Pelaksana" ? (
                            <FormJFU
                                help={userData?.jabatan}
                                name="fungsional_umum_id"
                            />
                        ) : null
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
            <a href={userData?.file} target="_blank">
                Lihat SK
            </a>
            <Button>Pakai SK Ini</Button>
        </Modal>
    );
};

const TableRiwayatMaster = ({
    dataTerakhirSapk,
    data,
    loading,
    id,
    unor,
    user
}) => {
    const [visible, setVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    const { data: currentUser } = useSession();

    const handleOpen = async (user) => {
        // handle api to membuat usulan
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
        { title: "Aktif", dataIndex: "aktif", key: "aktif" },
        {
            title: "Aksi",
            dataIndex: "aksi",
            render: (_, row) => {
                return (
                    <>
                        {currentUser?.user?.role === "ADMIN" && (
                            <Button onClick={() => handleOpen(row)}>
                                Transfer
                            </Button>
                        )}
                    </>
                );
            }
        }
    ];

    return (
        <>
            <DialogFormMaster
                dataTerakhirSapk={dataTerakhirSapk}
                visible={visible}
                handleOpen={handleOpen}
                unor={unor}
                handleCancel={handleCancel}
                userData={userData}
                user={user}
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

    const { data: dataSiasn, isLoading: loadingSiasn } = useQuery(
        ["data-rw-jabatan-siasn", router?.query?.nip],
        () => siasnRwJabatan(router?.query?.nip)
    );

    const LinkSIASN = () => (
        <Link href={`/pegawai/${currentUser?.nip}/data-utama`}>Data SIASN</Link>
    );

    return (
        <PageContainer
            onBack={() => router?.back()}
            title="Data Integrasi"
            style={{ minHeight: "92vh" }}
            subTitle={<LinkSIASN />}
        >
            <Row>
                <Col span={18} push={1}>
                    <Card>
                        <Checker id={router?.query?.nip} />

                        <Skeleton loading={currentUserLoading}>
                            <Row gutter={[8, 8]}>
                                <Col span={24}>
                                    <DetailPegawai user={currentUser} />
                                </Col>
                            </Row>
                            <Alert
                                type="success"
                                description="Dengan mengacu pada data terakhir pada SIMASTER, maka data pada SIASN sudah sesuai dengan SIMASTER"
                                showIcon
                                message="Perhatian: Sesuaikan jabatan pada SIASN dengan SIMASTER"
                                style={{ marginTop: 10, marginBottom: 10 }}
                            />
                            <Row gutter={[8, 8]}>
                                <Col span={24}>
                                    <Card title="SIMASTER">
                                        <TableRiwayatMaster
                                            dataTerakhirSapk={
                                                data?.[data?.length - 1]
                                                    ? data[data?.length - 1]
                                                    : null
                                            }
                                            unor={dataUnor}
                                            data={dataMaster}
                                            user={currentUser}
                                            loading={loadingMasterJabatan}
                                            id={currentUser?.id_sapk}
                                        />
                                    </Card>
                                </Col>
                                <Col span={24}>
                                    <Card title="SIASN">
                                        <TableRiwayatSIASN
                                            data={dataSiasn}
                                            loading={loadingSiasn}
                                        />
                                    </Card>
                                </Col>
                            </Row>
                        </Skeleton>
                    </Card>
                </Col>
            </Row>
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
