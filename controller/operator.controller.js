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
        res.json(result.data);
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
