import { dataJabatan } from "@/services/siasn.services";
import { useQuery } from "@tanstack/react-query";
import { Form, Select } from "antd";

const FormRiwayatJabatan = ({ name, form, nip }) => {
    const { data, isLoading } = useQuery(
        ["data-rw-jabatan", nip],
        () => dataJabatan(nip),
        {
            enabled: Boolean(nip)
        }
    );

    return (
        <>
            {data && (
                <Form.Item
                    label={"Riwayat Jabatan"}
                    rules={[{ required: true }]}
                    name={name}
                >
                    <Select
                        showSearch
                        filterOption={false}
                        placeholder="Riwayat Jabatan"
                    >
                        {data?.map((item) => (
                            <Select.Option key={item?.id} value={item?.id}>
                                {item?.jabatanFungsionalNama} - {item?.unorNama}{" "}
                                - {item?.satuanKerjaNama}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            )}
        </>
    );
};

export default FormRiwayatJabatan;
