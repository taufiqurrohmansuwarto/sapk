import { AccountBookFilled, DatabaseOutlined, HomeOutlined } from "@ant-design/icons";

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
            name: " Data Rusak",
            icon: <DatabaseOutlined />
        },
        {
            path: "/data-import",
            name: " Data Import",
            icon: <AccountBookFilled />
        }
    ]
};
