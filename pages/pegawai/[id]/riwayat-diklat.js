import {
    riwayatDiklatMaster,
    rwDiklat,
    saveDiklatService
} from "@/services/fasilitator.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Divider, Form, Modal, Table, Transfer, message } from "antd";
import { useRouter } from "next/router";
import Layout from "../../../src/components/Layout";
import PegawaiLayout from "../../../src/components/PegawaiLayout";
import moment from "moment";
import refDiklat from "../../../src/utils/diklat.json";
import { useState } from "react";
import { addHourToDate } from "src/utils/util";
import { compact } from "lodash";

const kursus = [
    {
        id: "1",
        jenis_diklat: "Diklat Struktural"
    },
    {
        id: "2",
        jenis_diklat: "Diklat Fungsional"
    },
    {
        id: "3",
        jenis_diklat: "Diklat Teknis"
    },
    {
        id: "4",
        jenis_diklat: "Workshop"
    },
    {
        id: "5",
        jenis_diklat: "Pelatihan Manajerial"
    },
    {
        id: "6",
        jenis_diklat: "Pelatihan Sosial Kultural"
    },
    {
        id: "7",
        jenis_diklat: "Sosialisasi"
    },
    {
        id: "8",
        jenis_diklat: "Bimbingan Teknis"
    },
    {
        id: "9",
        jenis_diklat: "Seminar"
    },
    {
        id: "10",
        jenis_diklat: "Magang"
    }
];

const diklatStruktural = [
    {
        id: "1",
        nama: "SEPADA",
        eselon_level: "5",
        ncsistime: "2011-06-19T03:40:50Z",
        struktural_pns: "1"
    },
    {
        id: "2",
        nama: "SEPALA/ADUM/DIKLAT PIM TK.IV",
        eselon_level: "4",
        ncsistime: "2011-06-19T03:40:50Z",
        struktural_pns: "1"
    },
    {
        id: "3",
        nama: "SEPADYA/SPAMA/DIKLAT PIM TK. III",
        eselon_level: "3",
        ncsistime: "2011-06-19T03:40:50Z",
        struktural_pns: "1"
    },
    {
        id: "4",
        nama: "SPAMEN/SESPA/SESPANAS/DIKLAT PIM TK. II",
        eselon_level: "2",
        ncsistime: "2011-06-19T03:40:50Z",
        struktural_pns: "1"
    },
    {
        id: "5",
        nama: "SEPATI/DIKLAT PIM TK. I",
        eselon_level: "1",
        ncsistime: "2011-06-19T03:40:50Z",
        struktural_pns: "1"
    },
    {
        id: "6",
        nama: "SESPIM",
        eselon_level: "",
        ncsistime: "2019-04-04T10:00:08Z",
        struktural_pns: ""
    },
    {
        id: "7",
        nama: "SESPATI",
        eselon_level: "",
        ncsistime: "2019-04-04T10:00:16Z",
        struktural_pns: ""
    },
    {
        id: "8",
        nama: "Diklat Struktural Lainnya",
        eselon_level: "",
        ncsistime: "2019-04-04T18:39:23Z",
        struktural_pns: ""
    }
];

const renderTahun = (date) => {
    // get year from date
    return moment(date).format("YYYY");
};

const renderTanggal = (date) => {
    // change format date to dd-mm-yyyy
    return moment(date).format("DD-MM-YYYY");
};

const RiwayatDiklatMaster = () => {
    const router = useRouter();
    const { id: nip } = router?.query;

    const queryClient = useQueryClient();
    const [selection, setSelection] = useState([]);

    const { mutate: saveDiklat, isLoading: isLoadingPostDiklat } = useMutation(
        (data) => saveDiklatService(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["riwayat-diklat", nip]);
                message.success("Berhasil menyimpan data");
            },
            onError: (error) => {
                message.error(error?.response?.data?.message);
            }
        }
    );

    const columns = [
        {
            title: "Nama diklat",
            dataIndex: "nama_diklat",
            key: "nama_diklat"
        },
        {
            title: "Nomer",
            dataIndex: "no_sertifikat",
            key: "no_sertifikat"
        },
        {
            title: "Tahun",
            key: "tahun",
            dataIndex: "tahun"
        },
        {
            title: "Jenis Diklat",
            key: "jenis_diklat_nama",
            render: (_, record) => <span>{record?.diklat?.name}</span>
        },
        {
            title: "Jumlah Jam",
            dataIndex: "jml",
            key: "jml"
        },
        {
            title: "Institusi Penyelenggara",
            dataIndex: "penyelenggara",
            key: "penyelenggara"
        },
        {
            title: "Tanggal Kursus",
            key: "tanggal_mulai",
            dataIndex: "tanggal_mulai"
            // render: (_, record) => (
            //     <span>{renderTanggal(record?.tgl_sertifikat)}</span>
            // )
        },
        {
            title: "Tanggal Selesai",
            dataIndex: "tanggal_selesai",
            key: "tanggal_selesai"
        }
    ];

    const { data, isLoading } = useQuery(
        ["riwayat-diklat-master", nip],
        () => riwayatDiklatMaster(nip),
        {
            refetchOnWindowFocus: false
        }
    );

    const handleTransfer = () => {
        const result = selection.map((item) => {
            const currentFilter = refDiklat.find(
                (diklat) => diklat.id === item.jenis_diklat_id
            );

            if (
                currentFilter?.latihan_struktural_id ||
                currentFilter?.jenis_kursus_id
            ) {
                let propertyPost = {};
                let postTo = null;

                if (
                    currentFilter?.latihan_struktural_id &&
                    currentFilter?.jenis_kursus_id
                ) {
                    postTo = "diklat";
                    const dataPost = {
                        institusiPenyelenggara: item?.penyelenggara,
                        jenisKompetensi: item?.nama_diklat,
                        jumlahJam: item?.jml,
                        latihanStrukturalId:
                            currentFilter?.latihan_struktural_id,
                        nomor: item?.no_sertifikat,
                        pnsOrangId: "",
                        tahun: item?.tahun,
                        tanggal: renderTanggal(item?.tanggal),
                        tanggalSelesai: addHourToDate(
                            item?.tgl_mulai,
                            item?.jml
                        )
                    };

                    propertyPost = {
                        ...dataPost,
                        post_to: postTo
                    };
                } else {
                    postTo = "kursus";
                    const dataPost = {
                        instansiId: "",
                        institusiPenyelenggara: item?.penyelenggara,
                        jenisDiklatId: currentFilter?.jenis_kursus_id,
                        jenisKursus: item?.nama_diklat,
                        jenisKursuSertipikat: item?.no_sertifikat,
                        jumlahJam: item?.jml,
                        lokasiId: "",
                        namaKursus: item?.nama_diklat,
                        nomorSertipikat: item?.no_sertifikat,
                        tahunKursus: item?.tahun,
                        tanggalKursus: item?.tanggal_mulai,
                        tanggalSelesai: addHourToDate(
                            item?.tgl_mulai,
                            item?.jml
                        )
                    };

                    propertyPost = {
                        ...dataPost,
                        post_to: postTo
                    };
                }

                return propertyPost;
            } else {
            }
        });

        // using lodash to check falsy value in array
        const hasil = compact(result);
        const dataSend = { nip, data: hasil };

        saveDiklat(dataSend);
    };

    return (
        <div>
            {/* {JSON.stringify(selection)} */}
            {selection.length > 0 && (
                <Button
                    loading={isLoadingPostDiklat}
                    disabled={isLoadingPostDiklat}
                    onClick={handleTransfer}
                >
                    Transfer
                </Button>
            )}
            <Table
                loading={isLoading}
                pagination={false}
                dataSource={data}
                rowKey={(row) => row?.diklat_id}
                columns={columns}
                rowSelection={{
                    type: "checkbox",
                    onChange: (_, selectedRows) => {
                        setSelection(selectedRows);
                    }
                }}
            />
        </div>
    );
};

function RiwayatDiklat() {
    const router = useRouter();
    const id = router.query.id;

    const { data, isLoading } = useQuery(
        ["riwayat-diklat", id],
        () => rwDiklat(id),
        {
            refetchOnWindowFocus: false
        }
    );

    const columns = [
        {
            title: "Nama diklat",
            dataIndex: "nama_diklat",
            key: "nama_diklat"
        },
        {
            title: "Nomer",
            dataIndex: "nomor",
            key: "nomor"
        },
        {
            title: "Tahun",
            dataIndex: "tahun",
            key: "tahun"
        },
        {
            title: "Jenis Diklat",
            dataIndex: "jenis_diklat_nama",
            key: "jenis_diklat_nama"
        },
        {
            title: "Jumlah Jam",
            dataIndex: "jumlah_jam",
            key: "jumlah_jam"
        },
        {
            title: "Institusi Penyelenggara",
            dataIndex: "institusi_penyelenggara",
            key: "institusi_penyelenggara"
        },
        {
            title: "Tanggal Kursus",
            dataIndex: "tanggal_kursus",
            key: "tanggal_kursus"
        },
        {
            title: "Tanggal Selesai",
            dataIndex: "tanggal_selesai",
            key: "tanggal_selesai"
        }
    ];

    return (
        <PegawaiLayout title="Riwayat Diklat">
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                loading={isLoading}
            />
            <Divider>Riwayat Diklat Master</Divider>
            <RiwayatDiklatMaster />
        </PegawaiLayout>
    );
}

RiwayatDiklat.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RiwayatDiklat.getLayout = function getLayout(page) {
    return <Layout title="Riwayat Diklat">{page}</Layout>;
};

export default RiwayatDiklat;
