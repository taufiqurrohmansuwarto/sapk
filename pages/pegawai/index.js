import {
    downloadFileExcel,
    operatorEmployees,
    refMasterUnor
} from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import {
    BackTop,
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    Row,
    Skeleton,
    Space,
    Table,
    TreeSelect,
    Typography
} from "antd";
import FileSaver from "file-saver";
import Link from "next/link";
import { useState } from "react";
import AvatarNext from "src/components/AvatarNext";
import Layout from "src/components/Layout";
import PageContainer from "../../src/components/PageContainer";

function Pegawai() {
    const [query, setQuery] = useState({
        page: 1
    });

    const { data, isLoading, isFetching } = useQuery(
        ["employees", query],
        () => operatorEmployees(query),
        {
            enabled: !!query,
            keepPreviousData: true,
            refetchOnWindowFocus: false
        }
    );

    const { data: unor, isLoading: isLoadingUnor } = useQuery(
        ["ref-unor-master"],
        () => refMasterUnor(),
        {
            refetchOnWindowFocus: false
        }
    );

    const columns = [
        {
            title: "Foto",
            dataIndex: "foto",
            width: 100,
            render: (_, row) => {
                if (!row?.foto) {
                    return null;
                } else {
                    return <AvatarNext src={row?.foto} size={50} />;
                }
            }
        },
        {
            title: "Nama",
            dataIndex: "nama",
            render: (_, row) => (
                <Space size="small" direction="vertical">
                    <Typography.Text>{row?.nama}</Typography.Text>
                    <Typography.Text>{row?.nip_baru}</Typography.Text>
                    <Typography.Text>{row?.tgl_lahir}</Typography.Text>
                </Space>
            )
        },
        {
            title: "UNOR SIMASTER",
            dataIndex: "skpd",
            width: 300,
            key: "skpd"
        },
        {
            title: "UNOR SIASN",
            dataIndex: "unor_siasn",
            width: 300,
            render: (_, row) => (
                <div>
                    {row?.siasn?.unor_induk_nama} - {row?.siasn?.unor_nama}
                </div>
            )
        },
        {
            title: "Jabatan SIMASTER",
            dataIndex: "jabatan",
            key: "jabatan",
            width: 300
        },
        ,
        {
            title: "Jabatan SIASN",
            dataIndex: "jabatan_siasn",
            render: (_, row) => <div>{row?.siasn?.nama_jabatan}</div>,
            width: 300
        },

        {
            title: "Aksi",
            dataIndex: "aksi",
            render: (_, row) => (
                <Space size="small">
                    <Link href={`/pegawai/${row?.nip_baru}/data-utama`}>
                        <a>SIASN</a>
                    </Link>
                    <Divider type="vertical" />
                    <Link href={`/data-sapk/${row?.nip_baru}/data-rw-jabatan`}>
                        <a>Komparasi</a>
                    </Link>
                </Space>
            )
        }
    ];

    const [form] = Form.useForm();
    const handleReset = () => {
        form.resetFields();
        setQuery({
            page: 1
        });
    };

    const handleSubmit = async () => {
        const result = await form.getFieldValue();
        const data = {
            ...result,
            page: 1,
            ...query
        };

        setQuery(data);
    };

    const [loadingDownload, setLoadingDownload] = useState(false);

    const downloadExcel = async () => {
        try {
            const result = await form.getFieldValue();
            let currentQuery = {};

            if (result?.skpd_id) {
                currentQuery = {
                    ...currentQuery,
                    skpd_id: result?.skpd_id
                };
            }
            setLoadingDownload(true);
            const hasil = await downloadFileExcel(currentQuery);
            await FileSaver.saveAs(hasil, "data-pegawai.xlsx");
            setLoadingDownload(false);
        } catch (error) {
            console.log(error);
            setLoadingDownload(false);
        }
    };

    const FilterForm = () => {
        return (
            <Skeleton loading={isLoadingUnor}>
                <Form form={form} onFinish={handleSubmit}>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label="NIP atau Nama" name="search">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item label="Unit Organisasi" name="skpd_id">
                                <TreeSelect
                                    treeData={unor}
                                    showSearch
                                    treeNodeFilterProp="name"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: "right" }}>
                            <Space>
                                <Button htmlType="submit" type="primary">
                                    <Typography.Text>Filter</Typography.Text>
                                </Button>
                                <Button onClick={handleReset}>
                                    <Typography.Text>Reset</Typography.Text>
                                </Button>
                                <Button
                                    loading={loadingDownload}
                                    onClick={downloadExcel}
                                >
                                    Download Excel
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Form>
            </Skeleton>
        );
    };

    return (
        <PageContainer title="Daftar Pegawai">
            <Card>
                <BackTop />
                <Row justify="center">
                    <Col span={23}>
                        <Table
                            title={() => <FilterForm />}
                            loading={isLoading || isFetching}
                            dataSource={data?.data}
                            rowKey={(row) => row?.pegawai_id}
                            size="small"
                            columns={columns}
                            pagination={{
                                showSizeChanger: false,
                                onChange: (page) =>
                                    setQuery({ ...query, page }),
                                position: ["bottomRight", "topRight"],
                                showTotal: (total, range) =>
                                    `${range[0]}-${range[1]} dari ${data?.meta?.total} data`,
                                pageSize: data?.meta?.limit,
                                total: data?.meta?.total,
                                current: query.page
                            }}
                        />
                    </Col>
                </Row>
            </Card>
        </PageContainer>
    );
}

Pegawai.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

Pegawai.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Pegawai;
