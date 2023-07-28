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
            dataIndex: "nama"
        }
    ];

    return (
        <>
            {data && (
                <Collapse>
                    <Collapse.Panel
                        header={`File Kenaikan Pangkat ${data?.kualifikasi?.nama_service}`}
                    >
                        <Table
                            columns={columns}
                            dataSource={data?.syarat_dokumen}
                            pagination={false}
                            rowKey={(row) => row?.file_pangkat_id}
                            loading={isLoading}
                        />
                    </Collapse.Panel>
                </Collapse>
            )}
        </>
    );
}

export default KenaikanPangkatOktober2023;
