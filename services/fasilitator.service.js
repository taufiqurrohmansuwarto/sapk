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
    return fetcher
        .get(`/data-siasn/${nip}/data-rw-jabatan`)
        .then((res) => res?.data);
};

export const tokenSiasn = () => {
    return fetcher.get("/token-siasn").then((res) => res?.data);
};

export const bypassJabatanSIASN = (data) => {
    return fetcher
        .post("/data-siasn/bypass-jabatan", data)
        .then((res) => res?.data);
};

export const addJabatanSapk = (data) => {
    return fetcher
        .post("/data-sapk/tambah-jabatan", data)
        .then((res) => res?.data);
};

export const findDataImport = (data) => {
    //  transform data to query string
    const query = Object.keys(data)
        .map((key) => `${key}=${data[key]}`)
        .join("&");
    console.log(query);
    return fetcher.get(`/sapk-import?${query}`).then((res) => res?.data);
};

export const createDataImport = (data) => {
    return fetcher.post("/sapk-import", data).then((res) => res?.data);
};

export const removeDataImport = (id) => {
    return fetcher.delete(`/sapk-import/${id}`).then((res) => res?.data);
};

export const detailJfu = (nama) => {
    return fetcher
        .get(`data-sapk/reference/jabatan-fungsional-umum/${nama}`)
        .then((res) => res?.data);
};

export const detailJf = (nama) => {
    return fetcher
        .get(`data-sapk/reference/jabatan-fungsional/${nama}`)
        .then((res) => res?.data);
};

export const dataDashboard = () => {
    return fetcher
        .get("/dashboard/entrian-data-import")
        .then((res) => res?.data);
};

export const dataChecker = (id) => {
    return fetcher.get(`/data-import/${id}`).then((res) => res?.data);
};

export const listVerifikator = () => {
    return fetcher.get(`/verifikator`).then((res) => res?.data);
};

export const listDataVerifikator = (id) => {
    return fetcher.get(`/verifikator/${id}`).then((res) => res?.data);
};

// siasn proxy
export const dataAnak = (nip) => {
    return fetcher.get(`/siasn/${nip}/data-anak`).then((res) => res?.data);
};

export const dataOrtu = (nip) => {
    return fetcher.get(`/siasn/${nip}/data-ortu`).then((res) => res?.data);
};

export const dataPasangan = (nip) => {
    return fetcher.get(`/siasn/${nip}/data-pasangan`).then((res) => res?.data);
};

export const dataPns = (nip) => {
    return fetcher.get(`/siasn/${nip}/data-pns`).then((res) => res?.data);
};

export const dataUtama = (nip) => {
    return fetcher.get(`/siasn/${nip}/data-utama`).then((res) => res?.data);
};

export const fileDownload = (file_path) => {
    return fetcher
        .get(`/siasn/download?file_path=${file_path}`)
        .then((res) => res?.data);
};

export const fotoPegawai = (nip) => {
    return fetcher.get(`/siasn/${nip}/foto`).then((res) => res?.data);
};

export const rwAngkaKredit = (nip) => {
    return fetcher.get(`/siasn/${nip}/rw-angkakredit`).then((res) => res?.data);
};

export const rwCtln = (nip) => {
    return fetcher.get(`/siasn/${nip}/rw-ctln`).then((res) => res?.data);
};

export const rwDiklat = (nip) => {
    return fetcher.get(`/siasn/${nip}/rw-diklat`).then((res) => res?.data);
};

export const rwGolongan = (nip) => {
    return fetcher.get(`/siasn/${nip}/rw-golongan`).then((res) => res?.data);
};

export const rwHukdis = (nip) => {
    return fetcher.get(`/siasn/${nip}/rw-hukdis`).then((res) => res?.data);
};

export const rwJabatan = (nip) => {
    return fetcher.get(`/siasn/${nip}/rw-jabatan`).then((res) => res?.data);
};

export const rwKgb = (nip) => {
    return fetcher.get(`/siasn/${nip}/rw-kgb`).then((res) => res?.data);
};

export const rwKinerja = (nip) => {
    return fetcher.get(`/siasn/${nip}/rw-kinerja`).then((res) => res?.data);
};

export const rwOrganisasi = (nip) => {
    return fetcher.get(`/siasn/${nip}/rw-organisasi`).then((res) => res?.data);
};

export const rwPendidikan = (nip) => {
    return fetcher.get(`/siasn/${nip}/rw-pendidikan`).then((res) => res?.data);
};

export const rwPenghargaan = (nip) => {
    return fetcher.get(`/siasn/${nip}/rw-penghargaan`).then((res) => res?.data);
};

export const rwPindahInstansi = (nip) => {
    return fetcher
        .get(`/siasn/${nip}/rw-pindahinstansi`)
        .then((res) => res?.data);
};

export const rwPMK = (nip) => {
    return fetcher.get(`/siasn/${nip}/rw-pmk`).then((res) => res?.data);
};

// operators
export const operatorEmployees = (query = {}) => {
    // transform data to query string
    const queryString = Object.keys(query)
        .map((key) => `${key}=${query[key]}`)
        .join("&");

    return fetcher
        .get(`/operators/employees?${queryString}`)
        .then((res) => res?.data);
};
