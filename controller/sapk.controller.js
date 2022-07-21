import axios from "axios";
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