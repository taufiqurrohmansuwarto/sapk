import { statistikPemberhentian } from "@/services/fasilitator.service";
import { Treemap } from "@ant-design/plots";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row } from "antd";
import { serializeDataTreeMap } from "src/utils/util";

function StatisticPemberhentian() {
    const { data, isLoading } = useQuery(
        ["pemberhentian"],
        () => statistikPemberhentian(),
        {
            refetchOnWindowFocus: false,
            keepPreviousData: true
        }
    );

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
            children: serializeDataTreeMap(data?.sub_layanan)
        },
        colorField: "name"
    };

    return (
        <Row gutter={[8, 16]}>
            <Col xs={24} md={12}>
                <Card title="Status Usulan Pemberhentian" loading={isLoading}>
                    {data && <Treemap {...treeMapConfig} />}
                </Card>
            </Col>
            <Col xs={24} md={12}>
                <Card title="Jenis Pemberhentian" loading={isLoading}>
                    {data && <Treemap {...treeMapConfig2} />}
                </Card>
            </Col>
        </Row>
    );
}

export default StatisticPemberhentian;
