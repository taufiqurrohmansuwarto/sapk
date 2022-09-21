const { default: prisma } = require("../lib/prisma");
const AdmZip = require("adm-zip");
const { chunk, groupBy } = require("lodash");
const xlsx = require("xlsx");
const stream = require("stream");
import moment from "moment";

// transform data into excel from json data using xlsx
const index = async (req, res) => {
    try {
        const { customId } = req?.user;
        const type = req?.query?.type || "all";

        if (type === "all") {
            const result = await prisma.data_import.findMany({});

            // change format result created_at to dd-mm-yyyy
            const data = result.map((item) => {
                return {
                    ...item,
                    tgl_dibuat: moment(item?.created_at).format("DD-MM-YYYY")
                };
            });

            const dataGroupByDate = groupBy(data, "tgl_dibuat");

            const zipAll = new AdmZip();
            const zipExcel = new AdmZip();
            // iterate dataGroupByDate to create zip file
            Object.keys(dataGroupByDate).forEach((key) => {
                const data = dataGroupByDate[key];
                const unor = data?.sort(
                    (a, b) => a?.tgl_dibuat - b?.tgl_dibuat
                );
                const splitUnor = chunk(unor, 100);

                splitUnor.forEach((item, index) => {
                    const wb = xlsx.utils.book_new();
                    const ws = xlsx.utils.json_to_sheet(item);
                    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
                    const buffer = xlsx.write(wb, { type: "buffer" });
                    zipExcel.addFile(`data-${key}-${index}.xlsx`, buffer);
                });

                // then all goes here

                zipAll.addFile(`data-${key}.zip`, zipExcel.toBuffer());
            });

            // filter result by jfu id is not empty order by created_at desc and split 100 data
            const dataRiwayatUnor = data?.sort(
                (a, b) => b?.created_at - a?.created_at
            );

            const unor = chunk(dataRiwayatUnor, 100);

            const filterJfu = data
                .filter((item) => !!item?.jfu_id)
                .sort((a, b) => b?.created_at - a?.created_at);

            const jfu = chunk(filterJfu, 400);

            const filterJf = data
                .filter((item) => !!item?.jft_id)
                .sort((a, b) => b?.created_at - a?.created_at);

            const jft = chunk(filterJf, 400);

            const filterStruktural = data
                .filter((item) => !item?.jft_id && !item?.jfu_id)
                .sort((a, b) => b?.created_at - a?.created_at);

            const struktural = chunk(filterStruktural, 400);

            const myData = { unor, jfu, jft, struktural };

            const zip = new AdmZip();

            // looping mydata by properties

            Object.keys(myData).forEach((key) => {
                const data = myData[key];

                data.forEach((item, index) => {
                    const workbook = xlsx.utils.book_new();
                    const worksheet = xlsx.utils.json_to_sheet(item);
                    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
                    // save as buffer
                    const buffer = xlsx.write(workbook, {
                        type: "buffer",
                        bookType: "xlsx"
                    });

                    zip.addFile(`${key}-${index}.xlsx`, buffer);
                });
            });

            const willSend = zip.toBuffer();
            const readStream = stream.PassThrough();

            readStream.end(willSend);
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=data-import.zip"
            );
            res.setHeader("Content-Type", "application/zip");
            readStream.pipe(res);
        } else if (type === "personal") {
            const { customId } = req?.user;
            const result = await prisma.data_import.findMany({
                where: {
                    operator: customId
                }
            });
            // change format result created_at to dd-mm-yyyy
            const data = result.map((item) => {
                const date = new Date(item?.created_at);
                const day = date?.getDate();
                const month = date?.getMonth() + 1;
                const year = date?.getFullYear();
                const newDate = `${day}-${month}-${year}`;

                return {
                    ...item,
                    created_at_new: newDate
                };
            });

            // filter result by jfu id is not empty order by created_at desc and split 100 data
            const dataRiwayatUnor = data?.sort(
                (a, b) => b?.created_at - a?.created_at
            );

            const unor = chunk(dataRiwayatUnor, 100);

            const filterJfu = data
                .filter((item) => !!item?.jfu_id)
                .sort((a, b) => b?.created_at - a?.created_at);

            const jfu = chunk(filterJfu, 400);

            const filterJf = data
                .filter((item) => !!item?.jft_id)
                .sort((a, b) => b?.created_at - a?.created_at);

            const jft = chunk(filterJf, 400);

            const filterStruktural = data
                .filter((item) => !item?.jft_id && !item?.jfu_id)
                .sort((a, b) => b?.created_at - a?.created_at);

            const struktural = chunk(filterStruktural, 400);

            const myData = { unor, jfu, jft, struktural };

            const zip = new AdmZip();

            // looping mydata by properties

            Object.keys(myData).forEach((key) => {
                const data = myData[key];

                data.forEach((item, index) => {
                    const workbook = xlsx.utils.book_new();
                    const worksheet = xlsx.utils.json_to_sheet(item);
                    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
                    // save as buffer
                    const buffer = xlsx.write(workbook, {
                        type: "buffer",
                        bookType: "xlsx"
                    });

                    zip.addFile(`${key}-${index}.xlsx`, buffer);
                });
            });

            const willSend = zip.toBuffer();
            const readStream = stream.PassThrough();
            readStream.end(willSend);

            res.setHeader(
                "Content-Disposition",
                "attachment; filename=data-import-unor.zip"
            );
            res.setHeader("Content-Type", "application/zip");
            readStream.pipe(res);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ code: 400, message: "error" });
    }
};

module.exports = {
    index
};
