import { Table } from "antd";
import React from "react";
import Layout from "../../src/components/Layout";
import PageContainer from "../../src/components/PageContainer";

function Pegawai() {
    const columns = [];
    const data = [];
    return (
        <PageContainer title="Daftar Pegawai">
            <Table dataSource={data} columns={columns} />
        </PageContainer>
    );
}

Pegawai.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

Pegawai.getLayout = function getLayout(page) {
    return <Layout title="Test">{page}</Layout>;
};

export default Pegawai;
