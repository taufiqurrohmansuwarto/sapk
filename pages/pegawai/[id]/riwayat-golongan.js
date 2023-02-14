import { rwGolongan } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";

function RiwayatGolongan() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(
        ["riwayat-golongan", id],
        () => rwGolongan(id),
        {
            refetchOnWindowFocus: false
        }
    );

    const columns = [
        {
            title: "File",
            dataIndex: "file",
            render: (_, row) => {
                if (!row?.path) {
                    return null;
                } else {
                    return (
                        <div>
                            <a
                                href={`/sapk/api/fasilitator/siasn/download?file_path=${
                                    row?.path?.[Object.keys(row?.path)]?.dok_uri
                                }`}
                                target="_blank"
                            >
                                Download
                            </a>
                        </div>
                    );
                }
            }
        },
        {
            title: "Golongan",
            dataIndex: "golongan_nama",
            key: "golongan_nama"
        },
        {
            title: "Pangkat",
            dataIndex: "nama_pangkat",
            key: "nama_pangkat"
        },
        {
            title: "Jenis Kenaikan Pangkat",
            dataIndex: "jenis_kp_nama",
            key: "jenis_kp_nama"
        },
        {
            title: "Tanggal SK",
            dataIndex: "sk_tanggal",
            key: "sk_tanggal"
        },
        {
            title: "TMT Golongan",
            dataIndex: "tmt_golongan",
            key: "tmt_golongan"
        }
    ];

    return (
        <PegawaiLayout title="Riwayat Golongan">
            <Table
                columns={columns}
                loading={isLoading}
                dataSource={data}
                rowKey={(row) => row?.id}
                pagination={false}
            />
        </PegawaiLayout>
    );
}

RiwayatGolongan.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatGolongan.getLayout = function getLayout(page) {
    return <Layout title="Riwayat Golongan">{page}</Layout>;
};

export default RiwayatGolongan;
