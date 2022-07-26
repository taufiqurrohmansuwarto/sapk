import { useQuery } from "@tanstack/react-query";
import { Divider, Row, Col, Card, Table, Button } from "antd";
import { useRouter } from "next/router";
import {
    masterRwJabatan,
    rwJabatanSapk
} from "../../../services/fasilitator.service";
import Layout from "../../../src/components/Layout";
import PageContainer from "../../../src/components/PageContainer";

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

const TableRiwayatMaster = ({ data, loading }) => {
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
                    return <Button>Trans</Button>;
                } else {
                    return null;
                }
            }
        }
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

    return (
        <PageContainer
            title="Data Integrasi"
            style={{ minHeight: "92vh" }}
            subTitle="Riwayat Jabatan"
        >
            <Row gutter={16}>
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
                            data={dataMaster}
                            loading={loadingMasterJabatan}
                        />
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
