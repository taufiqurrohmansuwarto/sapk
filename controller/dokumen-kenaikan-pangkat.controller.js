const { isEmpty } = require("lodash");
import axios from "axios";
const https = require("https");
const stream = require("stream");
const AdmZip = require("adm-zip");

const url = `https://master.bkd.jatimprov.go.id/files_jatimprov/`;

const extension = (filename) => {
    if (!filename) return "pdf";
    else {
        return filename?.split(".")?.pop();
    }
};

const checkSomethingNull = (data) => {
    if (!data) {
        return `${url}62289-pangkat-IIc-20220407-290-SK_CPNS_TORIK.pdf`;
    } else {
        return `${url}${data}`;
    }
};

const checkSomethingNull2 = (data) => {
    if (!data) {
        return "_TIDAK_ADA_DOKUMEN";
    } else {
        return "";
    }
};

const master = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

const dokumenKenaikanPangkat = async (req, res) => {
    try {
        const { employeeNumber } = req?.query;
        const fetcher = req.fetcher;
        const result = await fetcher.get(
            `/sapk/${employeeNumber}/dokumen-kenaikan-pangkat`
        );

        const hasil = result?.data;

        if (isEmpty(hasil)) {
            res.status(404).json({ message: "Data tidak ditemukan" });
        } else {
            const zip = new AdmZip();

            const aktaNikah = await master.get(
                checkSomethingNull(hasil?.akta_nikah),
                {
                    responseType: "arraybuffer"
                }
            );

            const foto = await master.get(checkSomethingNull(hasil?.foto), {
                responseType: "arraybuffer"
            });

            const kk = await master.get(checkSomethingNull(hasil?.kk), {
                responseType: "arraybuffer"
            });

            const skp = await master.get(checkSomethingNull(hasil?.skp), {
                responseType: "arraybuffer"
            });

            const skCPNS = await master.get(
                checkSomethingNull(hasil?.sk_cpns),
                {
                    responseType: "arraybuffer"
                }
            );

            const skPNS = await master.get(checkSomethingNull(hasil?.sk_pns), {
                responseType: "arraybuffer"
            });

            const skPangkatTerakhir = await master.get(
                checkSomethingNull(hasil?.sk_pangkat_terakhir),
                {
                    responseType: "arraybuffer"
                }
            );

            const gajiBerkala = await master.get(
                checkSomethingNull(hasil?.gaji_berkala),
                {
                    responseType: "arraybuffer"
                }
            );

            zip.addFile(
                `AKTA_NIKAH_${employeeNumber}${checkSomethingNull2(
                    hasil?.akta_nikah
                )}.${extension(hasil?.akta_nikah)}`,
                Buffer.from(aktaNikah?.data),
                "AKTA_NIKAH"
            );

            zip.addFile(
                `FOTO_${employeeNumber}${checkSomethingNull2(
                    hasil?.foto
                )}.${extension(hasil?.foto)}`,
                Buffer.from(foto?.data),
                "FOTO"
            );

            zip.addFile(
                `KK_${employeeNumber}${checkSomethingNull2(
                    hasil?.kk
                )}.${extension(hasil?.kk)}`,
                Buffer.from(kk?.data),
                "KK"
            );

            zip.addFile(
                `SKP_${employeeNumber}${checkSomethingNull2(
                    hasil?.skp
                )}.${extension(hasil?.skp)}`,
                Buffer.from(skp?.data),
                "SKP"
            );

            zip.addFile(
                `SK_CPNS_${employeeNumber}${checkSomethingNull2(
                    hasil?.sk_cpns
                )}.${extension(hasil?.sk_cpns)}`,
                Buffer.from(skCPNS?.data),
                "SK_CPNS"
            );

            zip.addFile(
                `SK_PNS_${employeeNumber}${checkSomethingNull2(
                    hasil?.sk_cpns
                )}.${extension(hasil?.sk_pns)}`,
                Buffer.from(skPNS?.data),
                "SK_PNS"
            );

            zip.addFile(
                `SK_PANGKAT_TERAKHIR_${employeeNumber}${checkSomethingNull2(
                    hasil?.sk_pangkat_terakhir
                )}.${extension(hasil?.sk_pangkat_terakhir)}`,
                Buffer.from(skPangkatTerakhir?.data),
                "SK_PANGKAT_TERAKHIR"
            );

            zip.addFile(
                `GAJI_BERKALA_${employeeNumber}${checkSomethingNull2(
                    hasil?.gaji_berkala
                )}.${extension(hasil?.gaji_berkala)}`,
                Buffer.from(gajiBerkala?.data),
                "GAJI_BERKALA"
            );

            const zipFile = zip.toBuffer();
            const readStream = stream.PassThrough();
            readStream.end(zipFile);
            res.setHeader(
                "Content-disposition",
                `attachment; filename=kenaikan_pangkat_${employeeNumber}.zip`
            );
            res.setHeader("Content-Type", "application/zip");
            readStream.pipe(res);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    dokumenKenaikanPangkat
};
