import { kenaikanPangkatService } from "@/services/master.service";
import { useQuery } from "@tanstack/react-query";
import { Collapse, Table } from "antd";

function KenaikanPangkatOktober2023({ nip }) {
    const { data, isLoading } = useQuery(["kenaikan-pangkat", nip], () =>
        kenaikanPangkatService(nip)
    );

    const columns = [
        {
            title: "File",
            key: "file",
            render: (_, record) => {
                if (record?.file) {
                    return (
                        <a href={record?.file} target="_blank">
                            File
                        </a>
                    );
                }
            }
        },
        {
            title: "Jenis Dokumen",
            key: "jenis_dokumen",
            render: (_, record) => {
                return <div>{record?.jenis_dokumen?.nama_dokumen}</div>;
            }
        }
    ];

    return (
        <Collapse>
            <Collapse.Panel header="File Pangkat">
                <Table
                    columns={columns}
                    dataSource={data?.file_pangkat}
                    pagination={false}
                    rowKey={(row) => row?.file_pangkat_id}
                    loading={isLoading}
                />
            </Collapse.Panel>
        </Collapse>
    );
}

export default KenaikanPangkatOktober2023;
