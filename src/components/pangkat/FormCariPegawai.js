import { dataUtamaService } from "@/services/siasn.services";
import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { Form, Select, Spin } from "antd";
import { useState } from "react";

const FormCariPegawai = ({ name, help }) => {
    const [nip, setNip] = useState(undefined);
    const [debounceValue] = useDebouncedValue(nip, 500);

    const { data, isLoading } = useQuery(
        ["data-utama-pegawai", debounceValue],
        () => dataUtamaService(debounceValue),
        {
            enabled: Boolean(debounceValue)
        }
    );

    return (
        <>
            <Form.Item
                label="Cari Pegawai"
                rules={[{ required: true }]}
                name={name}
            >
                <Select
                    showSearch
                    filterOption={false}
                    loading={isLoading}
                    notFoundContent={
                        isLoading && debounceValue ? (
                            <Spin size="small" />
                        ) : null
                    }
                    onSearch={(value) => setNip(value)}
                >
                    <Select.Option key={data?.nipBaru} value={data?.nipBaru}>
                        {data?.nama} - {data?.unorNama}
                    </Select.Option>
                </Select>
            </Form.Item>
        </>
    );
};

export default FormCariPegawai;
