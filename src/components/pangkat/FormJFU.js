import { referensiJfu } from "@/services/siasn.services";
import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const FormJFU = ({ name }) => {
    const [jfu, setJfu] = useState(undefined);
    const [debounceValue] = useDebouncedValue(jfu, 500);

    const { data: dataJfu, isLoading: isLoadingJfu } = useQuery(
        ["data-jfu", debounceValue],
        () => referensiJfu(debounceValue),
        {
            enabled: Boolean(debounceValue)
        }
    );

    return (
        <>
            <Form.Item
                label={`Jabatan Fungsional Umum - (${help})`}
                rules={[{ required: true }]}
                name={name}
                // help={help}
            >
                <Select
                    showSearch
                    filterOption={false}
                    placeholder="Pilih Jabatan Fungsional Umum"
                    loading={isLoadingJfu}
                    notFoundContent={
                        isLoadingJfu && debounceValue ? (
                            <Spin size="small" />
                        ) : null
                    }
                    onSearch={(value) => setJfu(value)}
                >
                    {dataJfu?.map((item) => (
                        <Select.Option key={item?.id} value={item?.id}>
                            {item?.nama} - {item?.cepat_kode}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </>
    );
};

export default FormJFU;
