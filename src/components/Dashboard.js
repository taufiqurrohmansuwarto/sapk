import { Col, Card, Divider, Row, Statistic } from "antd";
import { dataDashboard } from "../../services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Bar } from "@ant-design/plots";

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
            Halo, {user?.user?.name}... Siapkan roti goreng sebelum mengentri
            <Divider />
            <Statistic title="Total Data Keseluruhan" value={data?.total} />
            <Divider />
            <Row>
                <Col span={12}>
                    <Chart data={data?.count} />
                </Col>
            </Row>
        </Card>
    );
}

export default Dashboard;
