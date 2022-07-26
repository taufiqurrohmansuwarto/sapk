import {
    BugOutlined,
    IeOutlined,
    ShareAltOutlined,
    UpOutlined
} from "@ant-design/icons";

export default {
    routes: [
        {
            path: "/feeds",
            name: " Cari NIP",
            icon: <ShareAltOutlined />
        },
        {
            path: "/daftar",
            name: " Daftar Pegawai",
            icon: <IeOutlined />
        },
        {
            path: "/siasn-skk",
            name: " Daftar Usulan SKK",
            icon: <BugOutlined />
        },
        {
            path: "/data-sapk",
            name: " Data SAPK",
            icon: <UpOutlined />
        }
    ]
};
