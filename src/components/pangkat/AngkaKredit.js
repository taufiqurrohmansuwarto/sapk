import { dataAngkaKredit } from "@/services/siasn.services";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import React from "react";

function AngkaKredit({ nip }) {
    const { data, isLoading } = useQuery(["angka-kredit", nip], () =>
        dataAngkaKredit(nip)
    );

    const columns = [
        {
            title: "Nomor SK",
            dataIndex: "nomorSk"
        },
        {
            title: "Bulan Mulai Penilaian",
            dataIndex: "bulanMulaiPenailan"
        },
        {
            title: "Tahun Mulai Penilaian",
            dataIndex: "tahunMulaiPenailan"
        },
        {
            title: "Bulan Selesai Penilaian",
            dataIndex: "bulanSelesaiPenailan"
        },
        {
            title: "Tahun Selesai Penilaian",
            dataIndex: "tahunSelesaiPenailan"
        },
        {
            title: "Kredit Utama Baru",
            dataIndex: "kreditUtamaBaru"
        },
        {
            title: "Kredit Baru Total",
            dataIndex: "kreditBaruTotal"
        },
        {
            title: "Nama Jabatan",
            dataIndex: "namaJabatan"
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
                pagination={false}
                loading={isLoading}
                dataSource={data}
            />
        </div>
    );
}

export default AngkaKredit;
