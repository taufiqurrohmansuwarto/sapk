import {
    AccountBookOutlined,
    DatabaseOutlined,
    FileExclamationOutlined,
    LogoutOutlined,
    MoneyCollectOutlined,
    QqOutlined,
    ReadOutlined,
    RestOutlined,
    UserOutlined
} from "@ant-design/icons";
import { Avatar, Dropdown, Menu, Space } from "antd";
import { uniqBy } from "lodash";
import { signIn, signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import routes from "../routes/routes";

const ProLayout = dynamic(
    () => import("@ant-design/pro-layout").then((mod) => mod?.ProLayout),
    {
        ssr: false,

        loading: () => null
    }
);

const menuItemRender = (options, element) => {
    return (
        <Link href={`${options.path}`}>
            <a>{element}</a>
        </Link>
    );
};

const menuUser = () => (
    <Menu>
        <Menu.Item key="logout" onClick={signOut} icon={<LogoutOutlined />}>
            Logout
        </Menu.Item>
    </Menu>
);

const rightContentRender = (user) => {
    return (
        <Space size="large" align="start">
            {/* <Input.Search onSubmit={(e) => console.log(e)} /> */}
            <Dropdown overlay={menuUser()}>
                <Space align="center">
                    <Avatar
                        size="small"
                        style={{ cursor: "pointer" }}
                        src={user?.image}
                    />
                </Space>
            </Dropdown>
        </Space>
    );
};

const changeRoutes = (user) => {
    return new Promise((resolve, reject) => {
        const role = user?.role;
        const group = user?.group;

        const userMaster = role === "USER" && group === "MASTER";

        // todo tambahkan master fasilitator
        const userMasterFasilitator =
            (role === "FASILITATOR" && group === "MASTER") ||
            (role === "ADMIN" && group === "MASTER");

        const userMasterRoutes = [
            {
                path: "/approval/dashboard",
                name: " Penilaian PTT-PK",
                icon: <ReadOutlined />
            },
            {
                path: "/esign/dashboard",
                name: " E-Sign",
                icon: <RestOutlined />
            }
        ];

        const masterFasilitatorRoutes = [
            {
                path: "/pegawai",
                name: "Pegawai",
                icon: <UserOutlined />
            },
            {
                path: "/data-sapk",
                name: "Pembetulan",
                icon: <DatabaseOutlined />
            },
            {
                path: "/data-import-personal",
                name: " Import Personal",
                icon: <FileExclamationOutlined />
            },
            {
                path: "/verifikator",
                name: "Verifikator SIASN",
                icon: <MoneyCollectOutlined />
            },
            {
                path: "/data-import",
                name: " Full Import",
                icon: <AccountBookOutlined />
            },
            {
                path: "/ref-unor",
                name: "Referensi Unit Organisasi",
                icon: <QqOutlined />
            },
            {
                path: "/ref-jfu",
                name: "Referensi Jabatan Fungsional Umum",
                icon: <QqOutlined />
            },
            {
                path: "/ref-jft",
                name: "Referensi Jabatan Fungsional Tertentu",
                icon: <QqOutlined />
            }
        ];

        let currentRoutes = routes?.routes;

        if (userMaster) {
            currentRoutes.push(...userMasterRoutes);
        }
        if (userMasterFasilitator) {
            currentRoutes.push(...masterFasilitatorRoutes);
        }

        resolve(uniqBy(currentRoutes, "path"));
    });
};

const Layout = ({ children, title = "SAPK", disableContentMargin = false }) => {
    const { data } = useSession({
        required: true,
        onUnauthenticated: () => signIn()
    });

    const router = useRouter();
    const active = router?.pathname;

    return (
        <ProLayout
            layout="side"
            headerTheme="light"
            logo={null}
            menu={{
                request: async () => {
                    try {
                        const user = await changeRoutes(data?.user);
                        return user;
                    } catch (e) {
                        console.log(e);
                    }
                }
            }}
            style={{ minHeight: "100vh" }}
            title={title}
            fixedHeader
            selectedKeys={[active]}
            menuItemRender={menuItemRender}
            rightContentRender={() => rightContentRender(data?.user)}
            fixSiderbar
            collapsed
            disableContentMargin={disableContentMargin}
        >
            {children}
        </ProLayout>
    );
};

export default Layout;
