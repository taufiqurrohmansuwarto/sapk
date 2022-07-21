import { BugOutlined, IeOutlined, ShareAltOutlined } from "@ant-design/icons";

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
        }
    ]
};
