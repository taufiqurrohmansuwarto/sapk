import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Card, Form, message, Select, Skeleton } from "antd";
import {
    listVerifikator,
    listDataVerifikator
} from "../../services/fasilitator.service";
import Layout from "../../src/components/Layout";
import PageContainer from "../../src/components/PageContainer";

const Verifikator = () => {
    const { data, isLoading } = useQuery(
        ["verifikator"],
        () => listVerifikator(),
        {
            refetchOnWindowFocus: false
        }
    );

    const [form] = Form.useForm();

    const { mutate: cariDataVerifikator, isLoading: loadingVerifikator } =
        useMutation((id) => listDataVerifikator(id), {
            onSuccess: (data) => {
                console.log(data);
            }
        });

    const handleFinish = async () => {
        const result = await form.validateFields();
        if (result?.verifikator_id) {
            // cariDataVerifikator(result?.verifikator_id);
            // href
            window.location.href = `/sapk/api/fasilitator/verifikator/${result?.verifikator_id}/excel`;
        } else {
            message.error("Pilih dulu verifikatornya");
        }
    };

    return (
        <PageContainer title="Verifikator SIASN">
            <Card title="Ambil data sesuai PIC">
                <Skeleton loading={isLoading}>
                    <Form form={form} onFinish={handleFinish}>
                        <Form.Item name="verifikator_id">
                            <Select
                                style={{ width: 800 }}
                                showSearch
                                optionFilterProp="nama"
                            >
                                {data?.data?.map((x) => {
                                    return (
                                        <Select.Option
                                            key={x?.unor_verifikator_id}
                                            value={x?.unor_verifikator_id}
                                            nama={x?.unor_verifikator_nama}
                                        >
                                            {x?.unor_verifikator_nama}
                                        </Select.Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                loading={loadingVerifikator}
                                htmlType="submit"
                                type="primary"
                            >
                                Cari
                            </Button>
                        </Form.Item>
                    </Form>
                </Skeleton>
            </Card>
        </PageContainer>
    );
};

Verifikator.Auth = {
    roles: ["FASILITATOR", "ADMIN"],
    groups: ["MASTER"]
};

Verifikator.getLayout = (page) => {
    return <Layout>{page}</Layout>;
};

export default Verifikator;
