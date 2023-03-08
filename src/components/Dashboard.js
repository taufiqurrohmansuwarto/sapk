import { Bar } from "@ant-design/plots";
import { useQuery } from "@tanstack/react-query";
import { Card } from "antd";
import { dataDashboard } from "../../services/fasilitator.service";

const Chart = ({ data }) => {
    const config = {
        data,
        xField: "value",
        yField: "operator_name",
        seriesField: "operator_name",
        legend: {
            position: "top-left"
        }
    };

    return <Bar {...config} />;
};

function Dashboard({ user }) {
    const { data, isLoading } = useQuery(["dashboard"], () => dataDashboard());

    return (
        <Card title="Dashboard" loading={isLoading}>
            Halo, {user?.user?.name}. Selamat datang di data Integrasi
        </Card>
    );
}

export default Dashboard;
