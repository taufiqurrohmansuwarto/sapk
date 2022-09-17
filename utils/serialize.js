import moment from "moment";

const url = "https://master.bkd.jatimprov.go.id/files_jatimprov/";

module.exports.serializeRwJabatanMaster = (data) => {
    const jabatanStruktural = data?.jabatan_struktural;
    const jabatanFungsional = data?.jabatan_fungsional_tertentu;
    const jabatanPelaksana = data?.jabatan_pelaksana;

    const rwytJabatanStruktural = jabatanStruktural?.map((strutkural) => ({
        id: `struktural_${strutkural?.struktural_id}`,
        jenis_jabatan: "Struktural",
        jabatan: strutkural?.jabatan_struktural?.jab_struktural,
        unor: `${strutkural?.instansi} - ${strutkural?.unit_kerja}`,
        tmt_jabatan: moment(strutkural?.tmt_jab).format("DD-MM-YYYY"),
        tgl_sk: moment(strutkural?.tgl_sk).format("DD-MM-YYYY"),
        nomor_sk: strutkural?.no_sk,
        aktif: strutkural?.aktif,
        file: `${url}${strutkural?.file_struktural}`
    }));

    const rwytJabatanPelaksana = jabatanPelaksana?.map((strutkural) => ({
        id: `pelaksana_${strutkural?.pelaksana_id}`,
        jenis_jabatan: "Pelaksana",
        jabatan: strutkural?.jfu?.name,
        unor: `${strutkural?.instansi} - ${strutkural?.unit_kerja}`,
        tmt_jabatan: moment(strutkural?.tmt_jab).format("DD-MM-YYYY"),
        tgl_sk: moment(strutkural?.tgl_sk).format("DD-MM-YYYY"),
        nomor_sk: strutkural?.no_sk,
        aktif: strutkural?.aktif,
        file: `${url}${strutkural?.file_jfu}`
    }));

    const rwytJabatanFungsional = jabatanFungsional?.map((strutkural) => ({
        id: `fungsional_${strutkural?.fungsional_id}`,
        jenis_jabatan: "Fungsional",
        jabatan: `${strutkural?.jft?.name} ${strutkural?.jft?.jenjang_jab}`,
        unor: `${strutkural?.instansi} - ${strutkural?.unit_kerja}`,
        tmt_jabatan: moment(strutkural?.tmt_jab).format("DD-MM-YYYY"),
        tgl_sk: moment(strutkural?.tgl_sk).format("DD-MM-YYYY"),
        nomor_sk: strutkural?.no_sk,
        aktif: strutkural?.aktif,
        file: `${url}${strutkural?.file_jft}`
    }));

    if (data) {
        return [
            ...rwytJabatanFungsional,
            ...rwytJabatanPelaksana,
            ...rwytJabatanStruktural
        ];
    } else {
        return null;
    }
};
