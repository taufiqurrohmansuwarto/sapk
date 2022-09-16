import { DownloadOutlined } from "@ant-design/icons";
import { Button, Collapse, Descriptions, Divider } from "antd";
import FileSaver from "file-saver";
import { isEmpty } from "lodash";
import React from "react";
import { StringDiff } from "react-string-diff";
import { filePembetulanNama } from "../../services/fasilitator.service";

const DataUser = ({ data }) => {
    const downloadFile = async () => {
        // save file using filesaver library
    };

    if (isEmpty(data)) {
        return null;
    } else {
        return (
            <Collapse defaultActiveKey={["1", "2"]}>
                <Collapse.Panel header="Perangkat Daerah" key="1">
                    <div>{data?.skpd}</div>
                    <Divider />
                    <a
                        href={`/sapk/api/fasilitator/pembetulan-nama/${data?.nip}/dokumen`}
                    >
                        Download File Pembetulan Nama
                    </a>
                </Collapse.Panel>
                <Collapse.Panel header="Informasi Pegawai" key="2">
                    <Descriptions size="small" title="Informasi Pegawai SAPK">
                        <Descriptions.Item label="Nama">
                            {data?.nama_sapk}
                        </Descriptions.Item>
                        <Descriptions.Item label="NIP Baru SAPK">
                            {data?.nip_sapk}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tanggal Lahir SAPK">
                            {data?.tanggal_lahir_sapk}
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider />
                    <Descriptions
                        size="small"
                        title="Informasi Pegawai E-Master"
                    >
                        <Descriptions.Item label="Nama">
                            {data?.nama}
                        </Descriptions.Item>
                        <Descriptions.Item label="NIP">
                            {data?.nip}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tanggal Lahir">
                            {data?.tanggal_lahir?.replaceAll("/", "-")}
                        </Descriptions.Item>
                        <Descriptions.Item label="TMT CPNS">
                            {data?.tmt_pangkat_cpns}
                        </Descriptions.Item>
                        <Descriptions.Item label="TMT PNS">
                            {data?.tmt_pangkat_pns}
                        </Descriptions.Item>
                        <Descriptions.Item label="Nomer Handphone">
                            {data?.no_hp}
                        </Descriptions.Item>
                    </Descriptions>
                    <Divider />

                    <Descriptions size="small" title="Hasil Komparasi">
                        <Descriptions.Item label="Nama">
                            <StringDiff
                                newValue={data?.nama}
                                oldValue={data?.nama_sapk}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label="NIP">
                            <StringDiff
                                newValue={data?.nip}
                                oldValue={data?.nip_sapk}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label="Tanggal Lahir">
                            <StringDiff
                                newValue={data?.tanggal_lahir?.replaceAll(
                                    "/",
                                    "-"
                                )}
                                oldValue={data?.tanggal_lahir_sapk}
                            />
                        </Descriptions.Item>
                    </Descriptions>
                </Collapse.Panel>
            </Collapse>
        );
    }
};

function DetailPegawai({ user }) {
    return <DataUser data={user} />;
}

export default DetailPegawai;
