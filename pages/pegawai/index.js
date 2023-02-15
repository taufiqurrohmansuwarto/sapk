import { operatorEmployees } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Divider, Input, Row, Space, Table, Typography } from "antd";
import Link from "next/link";
import { useState } from "react";
import AvatarNext from "src/components/AvatarNext";
import Layout from "../../src/components/Layout";
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
    const columns = [
        {
            title: "Foto",
            dataIndex: "foto",
            width: 100,
            render: (_, row) => {
                return <AvatarNext size={80} src={row?.foto} shape="square" />;
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
            title: "Perangkat Daerah",
            dataIndex: "skpd",
            key: "skpd"
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
    return (
        <PageContainer title="Daftar Pegawai">
            <Card>
                <Row justify="center">
                    <Col span={20}>
                        <Table
                            title={() => (
                                <Input.Search
                                    onSearch={(value) => {
                                        setQuery({
                                            ...query,
                                            search: value,
                                            page: 1
                                        });
                                    }}
                                    style={{ width: 300 }}
                                />
                            )}
                            loading={isLoading || isFetching}
                            dataSource={data?.data}
                            rowKey={(row) => row?.pegawai_id}
                            // size="small"
                            columns={columns}
                            pagination={{
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
    return <Layout title="Daftar Pegawai">{page}</Layout>;
};

export default Pegawai;
