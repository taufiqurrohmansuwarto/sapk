const { default: prisma } = require("../lib/prisma");
const AdmZip = require("adm-zip");
const { groupBy, chunk } = require("lodash");
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
                const date = new Date(item?.created_at);
                const day = date?.getDate();
                const month = date?.getMonth() + 1;
                const year = date?.getFullYear();
                const newDate = `${day}-${month}-${year}`;

                // format date to dd-mm-yyyy locale id

                return {
                    ...item,
                    tgl_dibuat: moment(item?.created_at)
                        .locale("id")
                        .format("DD-MM-YYYY")
                };
            });

            // group data by tgl_dibuat
            const groupData = groupBy(data, "tgl_dibuat");

            const zipAll = new AdmZip();

            let excel = [];
            // iterate dataGroupByDate to create zip file
            Object.keys(groupData).forEach((key, indexKey) => {
                const data = groupData[key];
                // filter data by tgl_dibuat

                excel[indexKey] = new AdmZip();

                const unor = data?.sort(
                    (a, b) => a?.created_at - b?.created_at
                );

                const jfu = data?.filter((item) => !!item?.jfu_id);
                const jft = data?.filter((item) => !!item?.jft_id);
                const struktural = data?.filter(
                    (item) => !item?.jft_id && !item?.jfu_id
                );

                const splitUnor = chunk(unor, 100);

                const splitJfu = chunk(jfu, 500);
                const splitJft = chunk(jft, 500);
                const splitStruktural = chunk(struktural, 500);

                splitJfu?.forEach((item, index) => {
                    const wb = xlsx.utils.book_new();
                    const ws = xlsx.utils.json_to_sheet(item);
                    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
                    const buffer = xlsx.write(wb, { type: "buffer" });
                    excel[indexKey].addFile(
                        `data-jfu-${key}-${index}.xlsx`,
                        buffer
                    );
                });

                splitJft?.forEach((item, index) => {
                    const wb = xlsx.utils.book_new();
                    const ws = xlsx.utils.json_to_sheet(item);
                    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
                    const buffer = xlsx.write(wb, { type: "buffer" });
                    excel[indexKey].addFile(
                        `data-jft-${key}-${index}.xlsx`,
                        buffer
                    );
                });

                splitStruktural?.forEach((item, index) => {
                    const wb = xlsx.utils.book_new();
                    const ws = xlsx.utils.json_to_sheet(item);
                    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
                    const buffer = xlsx.write(wb, { type: "buffer" });
                    excel[indexKey].addFile(
                        `data-struktural-${key}-${index}.xlsx`,
                        buffer
                    );
                });

                splitUnor?.forEach((item, index) => {
                    const wb = xlsx.utils.book_new();
                    const ws = xlsx.utils.json_to_sheet(item);
                    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
                    const buffer = xlsx.write(wb, { type: "buffer" });
                    excel[indexKey].addFile(
                        `data-unor-${key}-${index}.xlsx`,
                        buffer
                    );
                });

                excel.forEach((item) => {
                    zipAll.addFile(`${key}.zip`, item.toBuffer());
                });
            });

            const willSend = zipAll.toBuffer();
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
