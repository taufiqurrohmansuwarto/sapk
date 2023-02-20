const xlsx = require("xlsx");
const getSiasnAttr = async (employees, fetcher) => {
    let promise = [];

    employees.forEach((pegawai) => {
        promise.push(
            fetcher.get(`/siasn-ws/proxy/pns/data-utama/${pegawai?.nip_baru}`)
        );
    });

    const result = await Promise.allSettled(promise);

    const newListPegawai = result.map((item, index) => {
        return {
            ...employees[index],
            siasn: item?.value?.data
        };
    });

    return newListPegawai;
};

module.exports.operatorEmployees = async (req, res) => {
    try {
        const { fetcher } = req;
        const query = req?.query;

        // json to query string
        const queryString = Object.keys(query)
            .map((key) => `${key}=${query[key]}`)
            .join("&");

        const result = await fetcher.get(
            `/master-ws/operator/employees?${queryString}`
        );

        const employees = result?.data;

        // const newListPegawai = await getSiasnAttr(employees, fetcher);

        res.json(employees);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports.operatorDepartments = async (req, res) => {
    try {
        const { fetcher } = req;
        const result = await fetcher.get(`/master-ws/operator/departments`);
        res.json(result.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports.operatorDetailEmployee = async (req, res) => {
    try {
        const { fetcher } = req;
        const { nip } = req?.query;
        const result = await fetcher.get(
            `/master-ws/operator/employees/${nip}/data-utama`
        );
        res.json(result.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports.operatorFullEmployees = async (req, res) => {
    try {
        const { fetcher } = req;
        const result = await fetcher.get(`/master-ws/operator/full-employees`);
        res.json(result.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports.updateUnorMaster = async (req, res) => {
    try {
        const { fetcher } = req;
        const body = req?.body;

        await fetcher.patch(
            `/master-ws/operator/departments/${req?.query?.id}`,
            body
        );

        res.json({
            message: "success"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const serializeExcel = (employees) => {
    return employees.map((item) => {
        return {
            NIP: item?.nip_baru,
            Nama: item?.nama,
            "Jabatan SIMASTER": item?.jabatan,
            "Jabatan SIASN": item?.siasn?.nama_jabatan,
            "Jabatan Sesuai?": "",
            "Unit Kerja SIMASTER": item?.skpd,
            "Unit Kerja SIASN": `${item?.siasn?.unor_induk_nama} - ${item?.siasn?.unor_nama}`,
            "Unit Kerja Sesuai?": ""
        };
    });
};

module.exports.employeesExcel = async (req, res) => {
    try {
        const { fetcher } = req;
        const query = {
            ...req?.query,
            limit: "-1"
        };

        // json to query string
        const queryString = Object.keys(query)
            .map((key) => `${key}=${query[key]}`)
            .join("&");

        const result = await fetcher.get(
            `/master-ws/operator/employees?${queryString}`
        );

        const hasil = serializeExcel(result?.data);

        // using exceljs
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(hasil);

        xlsx.utils.book_append_sheet(wb, ws, "Sheet1");

        const excelBuffer = xlsx.write(wb, {
            bookType: "xlsx",
            type: "buffer"
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "test.xlsx"
        );

        res.send(excelBuffer);

        // return excel format
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
