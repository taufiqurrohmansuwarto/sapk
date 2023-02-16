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
            {/* <Divider /> */}
            {/* <Statistic title="Total Data Keseluruhan" value={data?.total} />
            <Divider />
            <Row>
                <Col span={12}>
                    <Chart data={data?.count} />
                </Col>
            </Row> */}
        </Card>
    );
}

export default Dashboard;
