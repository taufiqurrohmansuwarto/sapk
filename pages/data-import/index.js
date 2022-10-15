import { useQuery } from "@tanstack/react-query";
import { Card, Input, Space, Table } from "antd";
import { useState } from "react";
import { findDataImport } from "../../services/fasilitator.service";
import Layout from "../../src/components/Layout";
import PageContainer from "../../src/components/PageContainer";

const Index = () => {
    const [query, setQuery] = useState({
        limit: 50,
        page: 1,
        type: "all"
    });

    const { data, isLoading } = useQuery(
        ["data-import-personal", query],
        () => {
            return findDataImport(query);
        }
    );

    const columns = [
        { title: "NIP", dataIndex: "nip" },
        { title: "Nama", dataIndex: "nama" },
        { title: "Operator", dataIndex: "operator" },
        {
            title: "Dibuat pada",
            dataIndex: "created_at",
            key: "created_at",
            render: (text, record) => {
                // return date format dd-mm-yyyy hh:mm
                return new Date(text).toLocaleString();
            }
        }
    ];

    const handleSearchChange = (e) => {
        if (!e) {
            setQuery({
                page: 1,
                limit: 50,
                type: "personal"
            });
        } else {
            setQuery({
                ...query,
                page: 1,
                search: e.target.value
            });
        }
    };

    return (
        <PageContainer>
            <Card>
                <Space>
                    <a href="/sapk/api/fasilitator/download-import?type=all">
                        Unduh semua
                    </a>
                    <Input.Search onChange={handleSearchChange} />
                </Space>
                <Table
                    loading={isLoading}
                    dataSource={data?.data}
                    rowKey={(row) => row?.nip}
                    columns={columns}
                    pagination={{
                        current: query?.page,
                        position: ["topRight", "bottomRight"],
                        defaultCurrent: query?.page,
                        defaultPageSize: query?.limit,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} dari ${total} data`,
                        showSizeChanger: false,
                        total: data?.total,
                        onChange: (page, limit) => {
                            setQuery({
                                ...query,
                                page,
                                limit
                            });
                        }
                    }}
                />
            </Card>
        </PageContainer>
    );
};

Index.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

Index.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Index;
