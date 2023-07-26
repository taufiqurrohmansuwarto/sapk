import {
    downloadDokumen,
    listKenaikanPangkat
} from "@/services/siasn.services";
import { useQuery } from "@tanstack/react-query";
import { Card, DatePicker, Divider, Input, Table } from "antd";
import FileSaver from "file-saver";
import moment from "moment";
import { useState } from "react";
import Layout from "../../src/components/Layout";
import PageContainer from "../../src/components/PageContainer";
import { Stack } from "@mantine/core";
import { useRouter } from "next/router";

const dateFormat = "YYYY-MM-DD";

const Index = () => {
    const [periode, setPeriode] = useState(moment().format(dateFormat));
    const [nip, setNip] = useState("");

    const router = useRouter();

    const handleChange = (e) => {
        setNip(e.target.value);
    };

    const onChange = (_, dateString) => {
        setPeriode(dateString);
    };

    const gotoCekPangkat = () => {
        router.push(`/pangkat/${nip}/cek-pangkat`);
    };

    const { data, isLoading } = useQuery(
        ["kenaikan-pangkat", periode],
        () => listKenaikanPangkat(periode),
        {
            refetchOnWindowFocus: false,
            enabled: !!periode,
            keepPreviousData: true
        }
    );

    const download = async (path) => {
        const result = await downloadDokumen(path);
        FileSaver.saveAs(result, path);
    };

    const columns = [
        {
            title: "NIP",
            dataIndex: "nipBaru"
        },
        {
            title: "Nama",
            dataIndex: "nama"
        },
        {
            title: "Nomer Pertek",
            dataIndex: "no_pertek"
        },
        {
            title: "Tanggal Pertek",
            dataIndex: "tgl_pertek"
        },
        {
            title: "Nomer SK",
            dataIndex: "no_sk"
        },
        {
            title: "Tanggal SK",
            dataIndex: "tgl_sk"
        },
        {
            title: "File TTD Pertek",
            key: "file_ttd_pertek",
            render: (row, record) => {
                return (
                    <>
                        <div>
                            <a
                                href={`/sapk/api/fasilitator/siasn/download?file_path=${row?.path_ttd_pertek}`}
                                target="_blank"
                            >
                                Download
                            </a>
                        </div>
                    </>
                );
            }
        }
    ];

    return (
        <PageContainer title="Bantuan Kenaikan Pangkat">
            <Card>
                <Stack>
                    <Input.Search
                        onChange={handleChange}
                        onSearch={gotoCekPangkat}
                        style={{ width: "80%" }}
                    />
                    <DatePicker
                        value={moment(periode, dateFormat)}
                        onChange={onChange}
                    />
                </Stack>
                <Divider />
                <Table
                    columns={columns}
                    dataSource={data}
                    loading={isLoading}
                    rowKey={(row) => row?.id}
                    pagination={false}
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
