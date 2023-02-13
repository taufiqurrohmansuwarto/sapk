import { Space, Row, Col, Card, Divider, Avatar, Typography } from "antd";
import React from "react";
import Layout from "../../../src/components/Layout";
import PageContainer from "../../../src/components/PageContainer";

function DetailPegawai() {
    return (
        <PageContainer title="Daftar Pegawai">
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Card>
                        <Row justify="center">
                            <Space direction="vertical" align="center">
                                <Avatar size={100} />
                                <Typography.Text>
                                    Iput Taufiqurrohman Suwarto
                                </Typography.Text>
                            </Space>
                        </Row>
                        <Space></Space>
                        <Divider />
                        <Divider />
                        <Row>
                            <Col span={8}></Col>
                            <Col span={8}></Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={16}>
                    <Card></Card>
                </Col>
            </Row>
        </PageContainer>
    );
}

DetailPegawai.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

DetailPegawai.getLayout = function getLayout(page) {
    return <Layout title="Test">{page}</Layout>;
};

export default DetailPegawai;
