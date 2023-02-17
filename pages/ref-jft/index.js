import React from "react";
import Layout from "src/components/Layout";

function RefJft() {
    return <div>index</div>;
}

RefJft.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

RefJft.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default RefJft;
