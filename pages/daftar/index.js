import {
    hapusData,
    listDaftarPegawai
} from "../../services/fasilitator.service";
import { useMutation } from "react-query";
import Layout from "../../src/components/Layout";
import { Button, message } from "antd";
import { useQuery, useQueryClient } from "react-query";
import PageContainer from "../../src/components/PageContainer";
import { Table } from "antd";
import moment from "moment";

const Daftar = () => {
    const { data, isLoading } = useQuery(["data-pegawai"], () =>
        listDaftarPegawai()
    );

    const queryClient = useQueryClient();

    const { mutate: hapusPegawai } = useMutation((data) => hapusData(data), {
        onSuccess: () => {
            message.success("sukses");
            queryClient.invalidateQueries(["data-pegawai"]);
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const handleHapusPegawai = (id) => {
        hapusPegawai(id);
    };

    const columns = [
        { title: "NIP", key: "nip", dataIndex: "nip" },
        {
            title: "Nama Di E-Master",
            key: "nama_master",
            dataIndex: "nama_master"
        },
        {
            title: "Nama di SAPK",
            key: "nama_sapk",
            dataIndex: "nama_sapk"
        },
        {
            title: "Pembetulan",
            key: "pembetulan",
            dataIndex: "pembetulan"
        },
        {
            title: "Dibetulkan pada",
            key: "created_at",
            render: (row) => {
                return (
                    <div>
                        {moment(row?.created_at).format("DD-MM-YYYY hh:mm")}
                    </div>
                );
            }
        },
        {
            title: "Aksi",
            key: "aksi",
            render: (row) => {
                return (
                    <div>
                        <Button onClick={() => handleHapusPegawai(row?.id)}>
                            Hapus
                        </Button>
                    </div>
                );
            }
        }
    ];

    return (
        <PageContainer style={{ minHeight: "92vh" }}>
            <Table
                pagination={false}
                dataSource={data}
                columns={columns}
                rowKey={(row) => row?.id}
                loading={isLoading}
            />
        </PageContainer>
    );
};

Daftar.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

Daftar.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Daftar;
