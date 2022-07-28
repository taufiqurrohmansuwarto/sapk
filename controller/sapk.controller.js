import axios from "axios";
import { eq, orderBy } from "lodash";
const https = require("https");
const AdmZip = require("adm-zip");
const stream = require("stream");

const master = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

module.exports.pembetulanNama = async (req, res) => {
    try {
        const { employeeNumber } = req?.query;
        const result = await req?.fetcher.get(
            `/sapk/${employeeNumber}/perbaikan-nama`
        );

        if (result?.data) {
            const zip = new AdmZip();
            const {
                dokumen_cpns,
                dokumen_pns,
                dokumen_pangkat_terakhir,
                nama,
                dokumen_ijazah
            } = result?.data;

            const [ijazah] = dokumen_ijazah;

            const dokumenCPNS = await master.get(dokumen_cpns, {
                responseType: "arraybuffer"
            });
            const dokumenPNS = await master.get(dokumen_pns, {
                responseType: "arraybuffer"
            });

            const dokumenPangkatAkhir = await master.get(
                dokumen_pangkat_terakhir,
                {
                    responseType: "arraybuffer"
                }
            );

            const dokumenIjazah = await master.get(ijazah, {
                responseType: "arraybuffer"
            });

            zip.addFile(
                `dokumen_pns_${nama}.pdf`,
                Buffer.from(dokumenPNS?.data),
                "pns"
            );
            zip.addFile(
                `dokumen_cpns_${nama}.pdf`,
                Buffer.from(dokumenCPNS?.data),
                "cpns"
            );
            zip.addFile(
                `dokumen_pangkat_akhir_${nama}.pdf`,
                Buffer.from(dokumenPangkatAkhir?.data),
                "pangkat_akhir"
            );
            zip.addFile(
                `dokumen_ijazah_${nama}.pdf`,
                Buffer.from(dokumenIjazah?.data),
                "ijazah"
            );

            const wildSendThis = zip.toBuffer();
            const readStream = stream.PassThrough();
            readStream.end(wildSendThis);
            res.setHeader(
                "Content-disposition",
                `attachment; filename=${nama}.zip`
            );
            res.setHeader("Content-Type", "application/zip");
            readStream.pipe(res);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ code: 400, message: "Internal Server Error" });
    }
};

// add more endpoint and double check from sapk data utama
module.exports.informasiPembetulanNama = async (req, res) => {
    try {
        const fetcher = req?.fetcher;
        const { employeeNumber } = req?.query;
        const result = await fetcher.get(
            `/sapk/${employeeNumber}/perbaikan-nama`
        );

        const dataUtamaSapk = await fetcher.get(
            `/sapk/${employeeNumber}/data-utama-sapk`
        );

        const dataSapk = dataUtamaSapk?.data;

        const currentData = {
            id_sapk: dataSapk?.id,
            ...result?.data,
            nama_sapk: dataSapk?.nama,
            tanggal_lahir_sapk: dataSapk?.tglLahir,
            nip_sapk: dataSapk?.nipBaru
        };

        res.json(currentData);
    } catch (error) {
        console.log(error);
        res.status(400).json({ code: 400, message: "Internal Server Error" });
    }
};

module.exports.rwJabatanSapk = async (req, res) => {
    try {
        const fetcher = req?.fetcher;
        const { nip } = req?.query;
        const result = await fetcher.get(`/sapk/${nip}/data-rw-jabatan-sapk`);
        const sorting = orderBy(
            result?.data,
            [
                (obj) => {
                    const [day, month, year] = obj?.tmtJabatan.split("-");
                    return new Date(year, month - 1, day);
                }
            ],
            ["asc"]
        );
        res.json(sorting);
    } catch (error) {
        console.log(error);
        res.status(400).json({ code: 400, message: "Internal Server Error" });
    }
};

module.exports.referenceUnor = async (req, res) => {
    try {
        const { fetcher } = req;
        const result = await fetcher.get("/sapk/reference/unor");
        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(400).json({ code: 400, message: "Internal Server Error" });
    }
};

module.exports.referenceJabatanFungsional = async (req, res) => {
    try {
        const { fetcher } = req;
        const result = await fetcher.get("/sapk/reference/jabatan-fungsional");
        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(400).json({ code: 400, message: "Internal Server Error" });
    }
};
module.exports.referenceJabatanFungsionalUmum = async (req, res) => {
    try {
        const { fetcher } = req;
        const { nip } = req?.query;
        const result = await fetcher.get(
            "/sapk/reference/jabatan-fungsional-umum"
        );
        res.json(result?.data);
    } catch (error) {
        console.log(error);
        res.status(400).json({ code: 400, message: "Internal Server Error" });
    }
};
