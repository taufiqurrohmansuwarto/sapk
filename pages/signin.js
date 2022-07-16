import { Button, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { Col, Divider, Row, Space } from "antd";
import { getProviders, signIn } from "next-auth/react";
import { Login } from "tabler-icons-react";

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function SignIn({ providers }) {
    return (
        <Row
            style={{
                height: "100vh",
                display: "flex"
            }}
            align="middle"
            justify="center"
        >
            <Col>
                <Paper p="xl" shadow="xl" style={{ width: 400 }} withBorder>
                    <Group position="apart">
                        <img src="logobkd.jpg" alt="" style={{ width: 50 }} />
                    </Group>
                    <Group position="center">
                        <Space direction="vertical" align="center">
                            <Title>Aplikasi</Title>
                            <div>
                                <img
                                    src="pns.png"
                                    style={{ width: 150 }}
                                    alt=""
                                />
                            </div>
                            <Text size="sm">Percepatan Subbid Data</Text>
                        </Space>
                        <Divider />
                        <Space direction="vertical">
                            {Object?.values(providers).map((provider) => (
                                <div key={provider.name}>
                                    <Button
                                        variant="outline"
                                        fullWidth
                                        leftIcon={<Login />}
                                        onClick={() => signIn(provider.id)}
                                    >
                                        Masuk dengan akun {provider.name}
                                    </Button>
                                </div>
                            ))}
                        </Space>
                        <Stack spacing="xs">
                            {/* <Text size="xs">
                                    <Link href="bkd.jatimprov.go.id/pttpk">
                                        Lupa password akun E-Master?
                                    </Link>
                                </Text> */}
                        </Stack>
                        <Divider />
                    </Group>
                    <Text align="center" size="xs">
                        2022 Sub Bidang Pengolahan Data
                    </Text>
                    <Text align="center" size="xs"></Text>
                </Paper>
            </Col>
        </Row>
    );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: { providers }
    };
}
