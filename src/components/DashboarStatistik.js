import { Space } from "antd";
import StatisticPemberhentian from "./statistik/StatisticPemberhentian";
import StatisticPindahInstansi from "./statistik/StatisticPindahInstansi";
import StatisticSKK from "./statistik/StatisticSKK";
import StatistikKenaikanPangkat from "./statistik/StatistikKenaikanPangkat";

function DashboarStatistik() {
    return (
        <Space>
            <StatisticPemberhentian />
            <StatisticPindahInstansi />
            <StatisticSKK />
            <StatistikKenaikanPangkat />
        </Space>
    );
}

export default DashboarStatistik;
