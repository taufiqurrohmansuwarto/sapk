import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Table } from "antd";
import {
    findDataImport,
    removeDataImport
} from "../../services/fasilitator.service";
import Layout from "../../src/components/Layout";
import PageContainer from "../../src/components/PageContainer";

import * as xlsx from "xlsx";
import * as FileSaver from "file-saver";

const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const Index = () => {
    const { data, isLoading } = useQuery(["data-import"], () =>
        findDataImport()
    );

    const queryClient = useQueryClient();

    const { mutate: hapus } = useMutation((id) => removeDataImport(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(["data-import"]);
        }
    });

    const downloadExcel = () => {
        if (!data?.length) {
            message.info("Tidak ada data untuk diunduh");
        } else {
            const hasilku = xlsx.utils.json_to_sheet(data);
            const xlbuffer = xlsx.write(
                {
                    Sheets: {
                        ["rekon"]: hasilku
                    },
                    SheetNames: ["rekon"]
                },
                {
                    bookType: "xlsx",
                    type: "array"
                }
            );
            const hasil = new Blob([xlbuffer], { type: fileType });
            FileSaver.saveAs(hasil, "rekon" + fileExtension);
        }
    };

    const columns = [
        {
            title: "NIP",
            dataIndex: "nip",
            key: "nip"
        },
        {
            title: "Nama",
            dataIndex: "nama",
            key: "nama"
        },
        {
            title: "ID_PEGAWAI",
            dataIndex: "pegawai_id",
            key: "pegawai_id"
        },
        {
            title: "UNOR_ID",
            dataIndex: "unor_id",
            key: "unor_id"
        },
        {
            title: "JFU_ID",
            dataIndex: "jfu_id",
            key: "jfu_id"
        },
        {
            title: "JFT_ID",
            dataIndex: "jft_id",
            key: "jft_id"
        },
        {
            title: "NO_SK",
            dataIndex: "no_sk",
            key: "no_sk"
        },
        {
            title: "TGL_SK",
            dataIndex: "tgl_sk",
            key: "tgl_sk"
        },
        {
            title: "Operator",
            dataIndex: "operator",
            key: "operator"
        },
        {
            title: "Dibuat pada",
            dataIndex: "created_at",
            key: "created_at"
        },
        {
            title: "Hapus",
            dataIndex: "hapus",
            key: "hapus",
            render: (text, record) => (
                <Button
                    type="primary"
                    danger
                    onClick={() => hapus(record?.nip)}
                >
                    Hapus
                </Button>
            )
        }
    ];

    return (
        <PageContainer>
            <Button onClick={downloadExcel}>Download</Button>
            <Table
                pagination={false}
                columns={columns}
                rowKey={(row) => row?.nip}
                loading={isLoading}
                dataSource={data}
            />
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
