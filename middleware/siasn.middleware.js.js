const { default: axios } = require("axios");
const { loginSso, loginWso2 } = require("fetcher/siasn");

const baseUrl = "https://apimws.bkn.go.id:8243/apisiasn/1.0";

const siasnWsAxios = axios.create({
    baseURL: baseUrl
});

const getoken = async () => {
    const sso = await loginSso();
    const wso2 = await loginWso2();

    const result = {
        sso_token: sso,
        wso_token: wso2
    };

    return result;
};

const requestHandler = async (request) => {
    const result = await getoken();
    // const currentToken = fs.readFileSync("siasn_token.json", "utf-8");
    // const token = JSON.parse(currentToken);
    const sso_token = result?.sso_token;
    const wso_token = result?.wso_token;

    request.headers.Authorization = `Bearer ${wso_token}`;
    request.headers.Auth = `bearer ${sso_token}`;

    return request;
};

const responseHandler = async (response) => {
    return response;
};

const errorHandler = async (error) => {
    return Promise.reject(error?.response?.data);
};

siasnWsAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

siasnWsAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);

export default async (req, res, next) => {
    try {
        req.siasnRequest = siasnWsAxios;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" });
    }
};
