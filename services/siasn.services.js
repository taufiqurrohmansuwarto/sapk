import axios from "axios";
import qs from "query-string";

const fetcher = axios.create({
    baseURL: "/sapk/api/siasn"
});

export const listKenaikanPangkat = (periode) => {
    return fetcher
        .get(`/kenaikan-pangkat?periode=${periode}`)
        .then((res) => res?.data);
};

export const downloadDokumen = (path) => {
    return fetcher
        .get(`/download-dok?filePath=${path}`)
        .then((res) => res?.data);
};

// cek jabatan
export const dataUtamaService = (nip) => {
    return fetcher.get(`/pns/${nip}/data-utama`).then((res) => res?.data);
};

export const dataHukdis = (nip) => {
    return fetcher.get(`/pns/${nip}/rw-hukdis`).then((res) => res?.data);
};

export const dataAngkaKredit = (nip) => {
    return fetcher.get(`/pns/${nip}/rw-angkakredit`).then((res) => res?.data);
};

export const postAngkaKreditService = ({ nip, data }) => {
    return fetcher
        .post(`/pns/${nip}/rw-angkakredit`, data)
        .then((res) => res?.data);
};

// jabatan
export const dataJabatan = (nip) => {
    return fetcher.get(`/pns/${nip}/rw-jabatan`).then((res) => res?.data);
};

export const postJabatan = ({ nip, data }) => {
    return fetcher
        .post(`/pns/${nip}/rw-jabatan`, data)
        .then((res) => res?.data);
};

export const dataSkp22 = (nip) => {
    return fetcher.get(`/pns/${nip}/rw-skp22`).then((res) => res?.data);
};

export const postSkp22Service = ({ nip, data }) => {
    return fetcher.post(`/pns/${nip}/rw-skp22`, data).then((res) => res?.data);
};

export const referensiUnor = () => {
    return fetcher.get("ref/unor").then((res) => res?.data);
};

export const referensiJfu = (jabatan) => {
    return fetcher.get(`ref/jfu?jabatan=${jabatan}`).then((res) => res?.data);
};

export const referensiJft = (jabatan) => {
    return fetcher.get(`ref/jft?jabatan=${jabatan}`).then((res) => res?.data);
};

export const getTokenSIASNService = () => {
    return fetcher.get("/token").then((res) => res?.data);
};
