import { referensiUnor } from "@/services/siasn.services";
import { useQuery } from "@tanstack/react-query";
import { Form, TreeSelect } from "antd";

const FormUnitOrganisasi = ({ name }) => {
    const { data: tree, isLoading: isLoadingTree } = useQuery(
        ["ref-unor-new"],
        () => referensiUnor()
    );

    return (
        <>
            {tree && (
                <>
                    <Form.Item
                        label={"Unit Organisasi"}
                        rules={[{ required: true }]}
                        name={name}
                    >
                        <TreeSelect
                            treeNodeFilterProp="label"
                            treeData={tree}
                            showSearch
                        />
                    </Form.Item>
                </>
            )}
        </>
    );
};

export default FormUnitOrganisasi;
