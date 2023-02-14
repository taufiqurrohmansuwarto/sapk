import { GroupOutlined, HomeOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Divider, Row, Space, Typography } from "antd";
import { upperCase } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import PageContainer from "./PageContainer";

const items = [
    { title: "Data Anak", icon: <GroupOutlined />, link: "/data-anak" },
    { title: "Data PNS", icon: <HomeOutlined />, link: "/data-pns" },
    { title: "Data Utama", icon: <HomeOutlined />, link: "/data-utama" },
    {
        title: "Angka Kredit",
        icon: <HomeOutlined />,
        link: "riwayat-angka-kredit"
    },
    {
        title: "CLTN",
        icon: <HomeOutlined />,
        link: "riwayat-cltn"
    },
    {
        title: "Diklat",
        icon: <HomeOutlined />,
        link: "riwayat-diklat"
    },
    {
        title: "Golongan",
        icon: <HomeOutlined />,
        link: "riwayat-golongan"
    },
    {
        title: "Jabatan",
        icon: <HomeOutlined />,
        link: "riwayat-jabatan"
    },
    {
        title: "KGB",
        icon: <HomeOutlined />,
        link: "riwayat-kenaikan-gaji-berkala"
    },
    {
        title: "Kinerja",
        icon: <HomeOutlined />,
        link: "riwayat-kinerja"
    },
    {
        title: "Organisasi",
        icon: <HomeOutlined />,
        link: "riwayat-organisasi"
    },
    {
        title: "Pendidikan",
        icon: <HomeOutlined />,
        link: "riwayat-pendidikan"
    },
    {
        title: "Penghargaan",
        icon: <HomeOutlined />,
        link: "riwayat-penghargaan"
    },
    {
        title: "Pindah Instansi",
        icon: <HomeOutlined />,
        link: "riwayat-pindah-instansi"
    },
    {
        title: "PMK",
        icon: <HomeOutlined />,
        link: "riwayat-pmk"
    }
];

function PegawaiLayout({ title, children }) {
    const router = useRouter();
    const id = router?.query?.id;
    return (
        <PageContainer title="Daftar Pegawai">
            <Row gutter={[16, 16]}>
                <Col span={6} xs={24} sm={24} lg={6}>
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
                        <Row gutter={[16, 16]}>
                            {items?.map((item) => (
                                <Col key={item?.link} span={12}>
                                    <div>
                                        <Space>
                                            {item?.icon}
                                            <Link
                                                href={`/pegawai/${id}/${item?.link}`}
                                            >
                                                {upperCase(item?.title)}
                                            </Link>
                                        </Space>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                        <Row>
                            <Col span={8}></Col>
                            <Col span={8}></Col>
                        </Row>
                    </Card>
                </Col>
                <Col lg={18} xs={24} sm={24}>
                    <Card title={title}>{children}</Card>
                </Col>
            </Row>
        </PageContainer>
    );
}

export default PegawaiLayout;
