import {
    Collapse,
    Descriptions,
    Divider,
    Image,
    Space,
    Tag,
    Typography
} from "antd";
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
                        <Space direction="vertical">
                            <Image src={data?.foto} width={80} />
                            {data?.sudah_pensiun ? (
                                <div>
                                    <Pensiun data={data?.data_pensiun} />
                                </div>
                            ) : (
                                <div>
                                    <Space direction="vertical">
                                        <Tag color="green">AKTIF</Tag>
                                        <div>
                                            <a
                                                href={
                                                    data?.dokumen_pangkat_terakhir
                                                }
                                                target="_blank"
                                            >
                                                Dokumen Pangkat terkahir
                                            </a>
                                        </div>
                                    </Space>
                                </div>
                            )}
                        </Space>
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
                            <Typography.Paragraph copyable>
                                {data?.nama}
                            </Typography.Paragraph>
                        </Descriptions.Item>
                        <Descriptions.Item label="NIP">
                            <Typography.Paragraph copyable>
                                {data?.nip}
                            </Typography.Paragraph>
                        </Descriptions.Item>
                        <Descriptions.Item label="Tanggal Lahir">
                            <Typography.Paragraph copyable>
                                {data?.tanggal_lahir?.replaceAll("/", "-")}
                            </Typography.Paragraph>
                        </Descriptions.Item>
                        <Descriptions.Item label="TMT CPNS">
                            <Typography.Paragraph copyable>
                                {data?.tmt_pangkat_cpns}
                            </Typography.Paragraph>
                        </Descriptions.Item>
                        <Descriptions.Item label="Tanggal SK CPNS">
                            <Typography.Paragraph copyable>
                                {data?.tgl_sk_cpns}
                            </Typography.Paragraph>
                        </Descriptions.Item>

                        <Descriptions.Item label="SK CPNS">
                            <Typography.Paragraph copyable>
                                {data?.no_sk_cpns}
                            </Typography.Paragraph>
                        </Descriptions.Item>
                        <Descriptions.Item label="TMT PNS">
                            <Typography.Paragraph copyable>
                                {data?.tmt_pangkat_pns}
                            </Typography.Paragraph>
                        </Descriptions.Item>

                        <Descriptions.Item label="SK PNS">
                            <Typography.Paragraph copyable>
                                {data?.no_sk_pns}
                            </Typography.Paragraph>
                        </Descriptions.Item>
                        <Descriptions.Item label="Tanggal SK PNS">
                            <Typography.Paragraph copyable>
                                {data?.tgl_sk_pns}
                            </Typography.Paragraph>
                        </Descriptions.Item>
                        <Descriptions.Item label="No STTPL">
                            <Typography.Paragraph copyable>
                                {data?.no_sttpl}
                            </Typography.Paragraph>
                        </Descriptions.Item>
                        <Descriptions.Item label="Tanggal STTPL">
                            <Typography.Paragraph copyable>
                                {data?.tgl_sttpl}
                            </Typography.Paragraph>
                        </Descriptions.Item>
                        <Descriptions.Item label="File STTPL">
                            <a href={data?.file_sttpl} target="_blank">
                                file sttpl
                            </a>
                        </Descriptions.Item>
                        <Descriptions.Item label="File SK CPNS">
                            <a href={data?.file_sk_cpns} target="_blank">
                                file sk cpns
                            </a>
                        </Descriptions.Item>
                        <Descriptions.Item label="File SK PNS">
                            <a href={data?.file_sk_pns} target="_blank">
                                file sk pns
                            </a>
                        </Descriptions.Item>

                        <Descriptions.Item label="Nomer Handphone">
                            <Typography.Paragraph copyable>
                                {data?.no_hp}
                            </Typography.Paragraph>
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
