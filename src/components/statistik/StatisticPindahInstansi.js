import { statistikPindahInstansi } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Card, Row, Col } from "antd";
import { Treemap } from "@ant-design/plots";
import { serializeDataTreeMap } from "src/utils/util";

function StatisticPindahInstansi() {
    const { data, isLoading } = useQuery(
        ["pindah-instansi"],
        () => statistikPindahInstansi(),
        {
            refetchOnWindowFocus: false,
            keepPreviousData: true
        }
    );

    const config = {
        data: data?.status_usulan,
        xField: "value",
        yField: "type",
        seriesField: "type",
        label: {
            position: "middle"
        },
        legend: {
            position: "top-left"
        },
        width: 800
    };

    const treeMapConfig = {
        data: {
            name: "root",
            children: serializeDataTreeMap(data?.status_usulan)
        },
        colorField: "name"
    };

    const treeMapConfig2 = {
        data: {
            name: "root",
            children: serializeDataTreeMap(data?.instansi_asal)
        },
        colorField: "name"
    };

    const config2 = {
        data: data?.instansi_asal,
        xField: "value",
        yField: "type",
        seriesField: "type",
        label: {
            position: "middle"
        },
        legend: {
            position: "top-left"
        },
        width: 800
    };

    return (
        <Row gutter={[8, 16]}>
            <Col xs={24} md={12}>
                <Card title="Status Usulan Pindah Instansi" loading={isLoading}>
                    {data && <Treemap {...treeMapConfig} />}
                </Card>
            </Col>
            <Col xs={24} md={12}>
                <Card title="Asal Instansi" loading={isLoading}>
                    {data && <Treemap {...treeMapConfig2} />}
                </Card>
            </Col>
        </Row>
    );
}

export default StatisticPindahInstansi;
