import React from "react";
import Layout from "src/components/Layout";

function RefJfu() {
    return <div>index</div>;
}

RefJfu.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RefJfu.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default RefJfu;
