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

// siasn layanan

export const getListLayananSKK = () => {
    return fetcher.get(`/skk`).then((res) => res?.data);
};

export const getListLayananSKKById = (id) => {
    return fetcher.get(`/skk/${id}`).then((res) => res?.data);
};

// motherfucker sapk
export const rwJabatanSapk = (nip) => {
    return fetcher
        .get(`/data-sapk/${nip}/data-rw-jabatan`)
        .then((res) => res?.data);
};

export const masterRwJabatan = (nip) => {
    return fetcher
        .get(`/data-master/${nip}/data-rw-jabatan`)
        .then((res) => res?.data);
};

export const refUnor = () => {
    return fetcher.get("/data-sapk/reference/unor").then((res) => res?.data);
};

export const refJabatanFungsional = () => {
    return fetcher
        .get("/data-sapk/reference/jabatan-fungsional")
        .then((res) => res?.data);
};

export const refJabatanFungsionalUmum = () => {
    return fetcher
        .get("/data-sapk/reference/jabatan-fungsional-umum")
        .then((res) => res?.data);
};

export const siasnRwJabatan = (nip) => {
    return fetcher.get(`/data-siasn/${nip}/data-rw-jabatan`);
};
