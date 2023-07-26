const { default: axios } = require("axios");
const qs = require("query-string");

const loginSso = async () => {
    try {
        const data = {
            client_id: process.env.CLIENT_ID,
            username: process.env.NIP,
            password: process.env.PASSWORD,
            grant_type: "password"
        };

        const url =
            "https://sso-siasn.bkn.go.id/auth/realms/public-siasn/protocol/openid-connect/token";

        const quryString = qs.stringify(data);

        const result = await axios.post(url, quryString, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: quryString,
            url
        });

        const token = result?.data?.access_token;

        return token;
    } catch (error) {
        console.log(error);
    }
};

const loginWso2 = async () => {
    try {
        const clientId = process.env.CLIENT_ID_WSO2;
        const clientSecret = process.env.CLIENT_SECRET_WSO2;

        const data = {
            grant_type: "client_credentials"
        };

        const url = "https://apimws.bkn.go.id/oauth2/token";

        const auth = {
            username: clientId,
            password: clientSecret
        };

        const queryString = qs.stringify(data);

        const result = await axios.post(url, queryString, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            auth,
            data: queryString,
            url
        });

        const token = result?.data?.access_token;
        return token;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    loginSso,
    loginWso2
};
