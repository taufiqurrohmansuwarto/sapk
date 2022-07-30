import { Button, Card, Form, Input } from "antd";
import { useRouter } from "next/router";
import Layout from "../../src/components/Layout";
import PageContainer from "../../src/components/PageContainer";

const Index = () => {
    const [form] = Form.useForm();
    const router = useRouter();

    const handleSubmit = async (data) => {
        const { nip } = data;
        router.push(`/data-sapk/${nip}/data-rw-jabatan`);
    };

    return (
        <PageContainer
            style={{ minHeight: "92vh" }}
            title="Data Rusak (Broken)"
            subTitle="SAPK, SIASN, SIMASTER"
        >
            <Card>
                <Form onFinish={handleSubmit} form={form} layout="vertical">
                    <Form.Item
                        label="NIP"
                        name="nip"
                        normalize={(values) => values.replace(/\s/g, "")}
                        rules={[
                            { min: 18, message: "NIP kudu 18 karakter" },
                            { required: true, message: "Kudu diisi" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            Cari
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </PageContainer>
    );
};

Index.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

Index.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Index;
