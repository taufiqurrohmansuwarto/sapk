import { useQuery } from "@tanstack/react-query";
import { Alert } from "antd";
import { dataChecker } from "../../services/fasilitator.service";

function Checker({ id }) {
    const { data, isLoading } = useQuery(
        ["data-import-checker", id],
        () => dataChecker(id),
        {}
    );

    if (isLoading) {
        return <div>loading...</div>;
    }

    return (
        <div style={{ marginBottom: 10 }}>
            <Alert
                type={data?.type}
                description={data?.description}
                message={data?.message}
                showIcon
            />
        </div>
    );
}

export default Checker;
