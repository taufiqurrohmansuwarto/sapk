import { Row, Col } from "antd";
import StatisticPemberhentian from "./statistik/StatisticPemberhentian";
import StatisticPindahInstansi from "./statistik/StatisticPindahInstansi";
import StatisticSKK from "./statistik/StatisticSKK";
import StatistikKenaikanPangkat from "./statistik/StatistikKenaikanPangkat";

function DashboarStatistik() {
    return (
        <Row gutter={[8, 16]}>
            <Col span={24}>
                <StatisticPemberhentian />
            </Col>
            <Col span={24}>
                <StatisticPindahInstansi />
            </Col>
            <Col span={24}>
                <StatisticSKK />
            </Col>
            <Col span={24}>
                <StatistikKenaikanPangkat />
            </Col>
        </Row>
    );
}

export default DashboarStatistik;
