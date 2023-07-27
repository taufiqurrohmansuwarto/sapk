import axios from "axios";

const fetcher = axios.create({
    baseURL: "/sapk/api/fasilitator/data-master"
});

export const rwAngkakredit = (nip) => {
    return fetcher.get(`/${nip}/rw-angkakredit`).then((res) => res?.data);
};

export const rwSkp = (nip) => {
    return fetcher.get(`/${nip}/rw-skp`).then((res) => res?.data);
};

export const rwHukdis = (nip) => {
    return fetcher.get(`/${nip}/rw-hukdis`).then((res) => res?.data);
};

export const kenaikanPangkatService = (nip) => {
    return fetcher.get(`/${nip}/kenaikan-pangkat`).then((res) => res?.data);
};
