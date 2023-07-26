import { dataSkp22 } from "@/services/siasn.services";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";

function Skp22({ nip }) {
    const { data, isLoading } = useQuery(["data-skp-22", nip], () =>
        dataSkp22(nip)
    );

    const columns = [
        {
            title: "Hasil Kinerja",
            dataIndex: "hasilKinerja"
        },
        {
            title: "Hasil Kinerja Nilai",
            dataIndex: "hasilKinerjaNilai"
        },
        {
            title: "Kuadran Kinerja",
            dataIndex: "kuadranKinerja"
        },
        {
            title: "Nama Penilai",
            dataIndex: "namaPenilai"
        },
        {
            title: "Unor Penilai",
            dataIndex: "penilaiUnorNm"
        },
        {
            title: "Perilaku Kerja",
            dataIndex: "perilakuKerja"
        },
        {
            title: "Perilaku Kerja Nilai",
            dataIndex: "PerilakuKerjaNilai"
        },
        {
            title: "Status Penilai",
            dataIndex: "statusPenilai"
        },
        {
            title: "Tahun",
            dataIndex: "tahun"
        }
    ];

    return (
        <div>
            <Table
                pagination={false}
                columns={columns}
                loading={isLoading}
                rowKey={(row) => row?.id}
                dataSource={data}
            />
        </div>
    );
}

export default Skp22;
