import { operatorEmployees } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Space, Table, Typography, Row, Col, Input } from "antd";
import Link from "next/link";
import React, { useState } from "react";
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
                return <Avatar size={80} src={row?.foto} shape="square" />;
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
            width: 200,
            render: (_, row) => (
                <Space size="small">
                    <Link href={`/pegawai/${row?.nip_baru}/data-utama`}>
                        <a>Detail</a>
                    </Link>
                </Space>
            )
        }
    ];
    return (
        <PageContainer title="Daftar Pegawai">
            <Row justify="center">
                <Col span={18}>
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
                        size="small"
                        columns={columns}
                        pagination={{
                            onChange: (page) => setQuery({ ...query, page }),
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
