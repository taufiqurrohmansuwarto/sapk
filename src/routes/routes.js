import {
    DatabaseOutlined,
    FileExclamationOutlined,
    HomeOutlined
} from "@ant-design/icons";

export default {
    routes: [
        {
            path: "/feeds",
            name: " Beranda",
            icon: <HomeOutlined />
        },
        // {
        //     path: "/daftar",
        //     name: " Daftar Pegawai",
        //     icon: <IeOutlined />
        // },
        // {
        //     path: "/siasn-skk",
        //     name: " Daftar Usulan SKK",
        //     icon: <BugOutlined />
        // },
        {
            path: "/data-sapk",
            name: "Pembetulan",
            icon: <DatabaseOutlined />
        },
        {
            path: "/data-import-personal",
            name: " Import Personal",
            icon: <FileExclamationOutlined />
        }
    ]
};
