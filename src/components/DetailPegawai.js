import { Collapse, Descriptions, Divider } from "antd";
import { isEmpty } from "lodash";
import React from "react";
import { StringDiff } from "react-string-diff";

const DataUser = ({ data }) => {
    if (isEmpty(data)) {
        return null;
    } else {
        return (
            <Collapse>
                <Collapse.Panel header="Informasi Pegawai">
                    <Descriptions title="Informasi Pegawai SAPK">
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
                    <Descriptions title="Informasi Pegawai E-Master">
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

                    <Descriptions title="Hasil Komparasi">
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
