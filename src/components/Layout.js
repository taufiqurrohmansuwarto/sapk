import {
    AccountBookFilled,
    FileOutlined,
    LogoutOutlined,
    ReadOutlined,
    RestOutlined,
    VerifiedOutlined
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
        <Space size="large">
            <Dropdown overlay={menuUser()}>
                <Space align="center">
                    <Avatar
                        // shape="square"
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
        const id = user?.id;
        const userPtt = role === "USER" && group === "PTTPK";
        const userMaster = role === "USER" && group === "MASTER";
        const userPttFasilitator =
            (role === "FASILITATOR" && group === "PTTPK") ||
            (role === "ADMIN" && group === "PTTPK");

        // todo tambahkan master fasilitator
        const userMasterFasilitator =
            (role === "FASILITATOR" && group === "MASTER") ||
            (role === "ADMIN" && group === "MASTER");

        const adminFasilitator = role === "ADMIN" && group === "MASTER";
        console.log(adminFasilitator);

        const isAdmin = id === "master|56543";

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

        const adminFasilitatorRoutes = [
            {
                path: "/data-import",
                name: " Full Import",
                icon: <AccountBookFilled />
            }
        ];

        const userPttpkRoutes = [
            {
                path: "/user/dashboard",
                name: " Penilaian PTT-PK",
                icon: <ReadOutlined />
            }
        ];

        const fasilitatorRoutes = [
            {
                path: "/fasilitator/dashboard",
                name: " Penilaian PTT-PK",
                icon: <ReadOutlined />
            }
        ];

        const masterFasilitatorRotes = [];

        const adminRoutes = [
            {
                path: "/admin/dashboard",
                name: " Admin",
                icon: <VerifiedOutlined />
            }
        ];

        let currentRoutes = routes?.routes;

        if (adminFasilitator) {
            currentRoutes.push(...adminFasilitatorRoutes);
        }
        if (userMaster) {
            currentRoutes.push(...userMasterRoutes);
        }
        if (userPtt) {
            currentRoutes.push(...userPttpkRoutes);
        }
        if (userPttFasilitator) {
            currentRoutes.push(...fasilitatorRoutes);
        }
        if (isAdmin) {
            currentRoutes.push(...adminRoutes);
        }

        if (userMasterFasilitator) {
            currentRoutes.push(...masterFasilitatorRotes);
        }

        resolve(uniqBy(currentRoutes, "path"));
    });
};

const Layout = ({ children, disableContentMargin = false }) => {
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
            menu={{
                // type: "group",
                request: async () => {
                    try {
                        const user = await changeRoutes(data?.user);
                        return user;
                    } catch (e) {
                        console.log(e);
                    }
                }
            }}
            title="SAPK"
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
