import {
    DatabaseOutlined,
    FileExclamationOutlined,
    HomeOutlined,
    MoneyCollectOutlined,
    UserOutlined
} from "@ant-design/icons";

export default {
    routes: [
        {
            path: "/feeds",
            name: " Beranda",
            icon: <HomeOutlined />
        },
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
        }
    ]
};
