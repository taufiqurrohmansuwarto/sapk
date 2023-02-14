import { dataUtama, fotoPegawai } from "@/services/fasilitator.service";
import {
    ApartmentOutlined,
    ApiOutlined,
    DeploymentUnitOutlined,
    FlagOutlined,
    FundViewOutlined,
    GifOutlined,
    HeartOutlined,
    HistoryOutlined,
    HomeOutlined,
    LaptopOutlined,
    LinkOutlined,
    PartitionOutlined,
    ScheduleOutlined,
    ThunderboltOutlined,
    UsergroupAddOutlined,
    UsergroupDeleteOutlined,
    UserOutlined
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
    Avatar,
    Card,
    Col,
    Divider,
    Row,
    Skeleton,
    Space,
    Typography
} from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import PageContainer from "./PageContainer";

const items = [
    { title: "Data Utama", icon: <UserOutlined />, link: "/data-utama" },
    { title: "Data Anak", icon: <UsergroupAddOutlined />, link: "/data-anak" },
    { title: "Data Ortu", icon: <UsergroupAddOutlined />, link: "/data-ortu" },
    {
        title: "Data Pasangan",
        icon: <UsergroupDeleteOutlined />,
        link: "/data-pasangan"
    },
    {
        title: "Angka Kredit",
        icon: <ScheduleOutlined />,
        link: "riwayat-angka-kredit"
    },
    {
        title: "CLTN",
        icon: <FlagOutlined />,
        link: "riwayat-cltn"
    },
    {
        title: "Diklat",
        icon: <FundViewOutlined />,
        link: "riwayat-diklat"
    },
    {
        title: "Golongan",
        icon: <ApartmentOutlined />,
        link: "riwayat-golongan"
    },
    {
        title: "Jabatan",
        icon: <ApiOutlined />,
        link: "riwayat-jabatan"
    },
    {
        title: "KGB",
        icon: <DeploymentUnitOutlined />,
        link: "riwayat-kenaikan-gaji-berkala"
    },
    {
        title: "Kinerja",
        icon: <LinkOutlined />,
        link: "riwayat-kinerja"
    },
    {
        title: "Organisasi",
        icon: <PartitionOutlined />,
        link: "riwayat-organisasi"
    },
    {
        title: "Pendidikan",
        icon: <ThunderboltOutlined />,
        link: "riwayat-pendidikan"
    },
    {
        title: "Penghargaan",
        icon: <HeartOutlined />,
        link: "riwayat-penghargaan"
    },
    {
        title: "Pindah Instansi",
        icon: <HistoryOutlined />,
        link: "riwayat-pindah-instansi"
    },
    {
        title: "PMK",
        icon: <LaptopOutlined />,
        link: "riwayat-pmk"
    },
    {
        title: "SKP",
        icon: <GifOutlined />,
        link: "riwayat-skp"
    }
];

function PegawaiLayout({ title, children }) {
    const router = useRouter();
    const id = router?.query?.id;

    const { data, isLoading } = useQuery(
        ["data-utama", id],
        () => dataUtama(id),
        {
            refetchOnWindowFocus: false
        }
    );

    const { data: foto, isLoading: isLoadingFoto } = useQuery(
        ["foto", id],
        () => fotoPegawai(id),
        {
            refetchOnWindowFocus: false
        }
    );

    const handleBack = () => router.push("/pegawai");

    return (
        <PageContainer
            loading={isLoading}
            onBack={handleBack}
            title={`Data SIASN - ${data?.nama}`}
        >
            <Row gutter={[16, 16]}>
                <Col span={6} xs={24} sm={24} lg={6}>
                    <Card>
                        <Row justify="center">
                            <Space direction="vertical" align="center">
                                <Skeleton loading={isLoadingFoto}>
                                    <Avatar
                                        src={`data:image/png;base64,${foto?.base64}`}
                                        size={180}
                                    />
                                </Skeleton>
                                <Typography.Title level={5}>
                                    {data?.nama}
                                </Typography.Title>
                                <Typography.Text>
                                    {data?.unor_induk_nama}
                                </Typography.Text>
                                <Typography.Text>
                                    {data?.unor_nama}
                                </Typography.Text>
                                <Typography.Text>
                                    {data?.nip_baru}
                                </Typography.Text>
                            </Space>
                        </Row>
                        <Space></Space>
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
                                                {item?.title}
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
