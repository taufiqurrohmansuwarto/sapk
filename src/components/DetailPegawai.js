import { Avatar, Collapse, Descriptions, Divider, Image } from "antd";
import { isEmpty } from "lodash";
import React from "react";
import { StringDiff } from "react-string-diff";

const Pensiun = ({ data }) => {
    return (
        <div>
            <div style={{ marginTop: 10, marginBottom: "2rem" }}>
                <span style={{ fontWeight: "bold", color: "red" }}>
                    STATUS PENSIUN
                </span>
            </div>
            <div>tgl : {data?.tgl_sk}</div>
            <div>Nomer SK : {data?.no_sk}</div>
            <div>
                <a href={data?.file} target="_blank">
                    File SK
                </a>
            </div>
        </div>
    );
};

const DataUser = ({ data }) => {
    if (isEmpty(data)) {
        return null;
    } else {
        return (
            <Collapse defaultActiveKey={["1", "2", "3"]}>
                {data?.nama ? (
                    <Collapse.Panel header="Informasi Pegawai" key="1">
                        <Image src={data?.foto} width={80} />
                        {data?.sudah_pensiun ? (
                            <div>
                                <Pensiun data={data?.data_pensiun} />
                            </div>
                        ) : (
                            <div>AKTIF</div>
                        )}
                        <Divider />
                        <Descriptions size="small" title="Data OPD Master">
                            <div>{data?.skpd}</div>
                        </Descriptions>
                        <Descriptions size="small" title="Data Unor SAPK">
                            <div>{data?.unor_sapk}</div>
                        </Descriptions>
                    </Collapse.Panel>
                ) : (
                    <Collapse.Panel header="Data Kosong" key="3">
                        Data di SIMASTER tidak ditemukan
                    </Collapse.Panel>
                )}
                <Collapse.Panel header="Perbandingan" key="2">
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
                        <Descriptions.Item label="Email SAPK">
                            {data?.email_sapk}
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
                            {data?.nama_sapk && data?.nama ? (
                                <StringDiff
                                    newValue={data?.nama}
                                    oldValue={data?.nama_sapk}
                                />
                            ) : null}
                        </Descriptions.Item>
                        <Descriptions.Item label="NIP">
                            {data?.nip_sapk && data?.nip ? (
                                <StringDiff
                                    newValue={data?.nip}
                                    oldValue={data?.nip_sapk}
                                />
                            ) : null}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tanggal Lahir">
                            {data?.tanggal_lahir_sapk && data?.tanggal_lahir ? (
                                <StringDiff
                                    newValue={data?.tanggal_lahir?.replaceAll(
                                        "/",
                                        "-"
                                    )}
                                    oldValue={data?.tanggal_lahir_sapk}
                                />
                            ) : null}
                        </Descriptions.Item>
                    </Descriptions>
                    <Divider />
                    <a
                        href={`/sapk/api/fasilitator/pembetulan-nama/${data?.nip}/dokumen`}
                    >
                        Download File Pembetulan Nama
                    </a>
                </Collapse.Panel>
            </Collapse>
        );
    }
};

function DetailPegawai({ user }) {
    return <DataUser data={user} />;
}

export default DetailPegawai;
