import { dataHukdis } from "@/services/siasn.services";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";

function Hukdis({ nip }) {
    const { data, isLoading } = useQuery(["hukuman-disiplin", nip], () =>
        dataHukdis(nip)
    );

    const columns = [
        {
            title: "Jenis Hukuman",
            dataIndex: "jenisHukuman"
        },
        {
            title: "Nomor SK",
            dataIndex: "skNomor"
        },
        {
            title: "Nomor PP",
            dataIndex: "nomorPp"
        },
        {
            title: "Tanggal SK",
            dataIndex: "skTanggal"
        },
        {
            title: "Alasan Hukuman Disiplin",
            dataIndex: "alasanHukumanDisiplinNama"
        },
        {
            title: "Masa Tahun",
            dataIndex: "masaTahun"
        },
        {
            title: "Masa Bulan",
            dataIndex: "masaBulan"
        },
        {
            title: "Tanggal Hukuman",
            dataIndex: "hukumanTanggal"
        },
        {
            title: "File",
            dataIndex: "path"
        }
    ];

    return (
        <div>
            <Table
                columns={columns}
                loading={isLoading}
                dataSource={data}
                rowKey={(row) => row?.id}
                pagination={false}
            />
        </div>
    );
}

export default Hukdis;
