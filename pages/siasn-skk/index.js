import { Button, Table, Tag } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { StringDiff } from "react-string-diff";
import { getListLayananSKK } from "../../services/fasilitator.service";
import Layout from "../../src/components/Layout";
import PageContainer from "../../src/components/PageContainer";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";

const dataRefUsulan = require("../../utils/ref-usulan.json");

const statusUsulan = (id) => {
    const d = dataRefUsulan?.find((x) => x?.id === id);
    return d?.nama;
};

const SIASNSkk = () => {
    const router = useRouter();

    const { data, isLoading } = useQuery(
        ["data-skk"],
        () => getListLayananSKK(),
        {
            refetchOnWindowFocus: false
        }
    );

    const getDetail = (id) => {
        router.push(`/siasn-skk/${id}/detail-layanan`);
    };

    const columns = [
        { title: "NIP", dataIndex: "nip", key: "nip" },
        {
            title: "Nama",
            dataIndex: "nama",
            key: "nama"
        },
        {
            title: "Pembetulan",
            key: "pembetulan",
            render: (row) => {
                return <div>{row?.usulan_data?.data?.nama}</div>;
            }
        },
        {
            title: "Pembeda",
            key: "pembeda",
            render: (row) => {
                return (
                    <StringDiff
                        oldValue={row?.nama}
                        newValue={row?.usulan_data?.data?.nama}
                    />
                );
            }
        },
        {
            title: "Status Usulan",
            key: "status_usulan",
            render: (row) => {
                return (
                    <Tag color="green">
                        {statusUsulan(row?.status_usulan?.toString())}
                    </Tag>
                );
            }
        },
        {
            title: "Tanggal Usulan",
            key: "tanggal_usulan",
            render: (row) => (
                <div>{moment(row?.tgl_usulan).format("DD-MM-YYYY")}</div>
            )
        },
        {
            title: "Detail",
            key: "detail",
            render: (row) => {
                return (
                    <Button onClick={() => getDetail(row?.id)}>Detail</Button>
                );
            }
        }
    ];

    return (
        <PageContainer style={{ minHeight: "92vh" }}>
            <Table
                dataSource={data?.data}
                rowKey={(row) => row?.id}
                columns={columns}
                loading={isLoading}
            />
        </PageContainer>
    );
};

SIASNSkk.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

SIASNSkk.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default SIASNSkk;
