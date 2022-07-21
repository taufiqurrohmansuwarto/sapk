import axios from "axios";

const fetcher = axios.create({
    baseURL: "/sapk/api/fasilitator"
});

export const downloadPenilaianBulanan = ({ tahun, bulan }) => {
    return fetcher
        .get(`/penilaian-bulanan?tahun=${tahun}&bulan=${bulan}`, {
            responseType: "blob"
        })
        .then((res) => res?.data);
};

export const downloadPenilaianAkhir = ({ tahun }) => {
    return fetcher
        .get(`/penilaian-tahunan?tahun=${tahun}`, { responseType: "blob" })
        .then((res) => res?.data);
};

export const getSatuanKinerja = () => {
    return fetcher.get(`/satuan-kinerja`).then((res) => res?.data);
};

export const createSatuanKinerja = (data) => {
    return fetcher.post(`/satuan-kinerja`, data).then((res) => res?.data);
};

export const updateSatuanKinerja = ({ id, data }) => {
    return fetcher
        .patch(`/satuan-kinerja/${id}`, data)
        .then((res) => res?.data);
};

export const filePembetulanNama = (nip) => {
    return fetcher
        .get(`/pembetulan-nama/${nip}/dokumen`, {
            responseType: "blob"
        })
        .then((res) => res?.data);
};

export const informasiPembetulanNama = (nip) => {
    return fetcher
        .get(`/pembetulan-nama/${nip}/information`)
        .then((res) => res?.data);
};

// list daftar pegawai
export const listDaftarPegawai = () => {
    return fetcher.get(`/request-pembetulan-nama`).then((res) => res?.data);
};

export const tambahkanData = (data) => {
    return fetcher
        .post(`/request-pembetulan-nama`, data)
        .then((res) => res?.data);
};

export const hapusData = (id) => {
    return fetcher
        .delete(`/request-pembetulan-nama/${id}`)
        .then((res) => res?.data);
};

export const updateData = ({ id, data }) => {
    return fetcher
        .patch(`/request-pembetulan-nama/${id}`, data)
        .then((res) => res?.data);
};
