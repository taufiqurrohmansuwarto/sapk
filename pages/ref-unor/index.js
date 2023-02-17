import React from "react";
import Layout from "src/components/Layout";

function RefUnor() {
    return <div>index</div>;
}

RefUnor.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RefUnor.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default RefUnor;
