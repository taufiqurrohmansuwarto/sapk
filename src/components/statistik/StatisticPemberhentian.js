import { statistikPemberhentian } from "@/services/fasilitator.service";
import { Bar, Treemap } from "@ant-design/plots";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row } from "antd";

const serializeData = (data) => {
    return data?.map((item) => ({
        name: item.type,
        value: item.value
    }));
};

function StatisticPemberhentian() {
    const { data, isLoading } = useQuery(
        ["pemberhentian"],
        () => statistikPemberhentian(),
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

    const config2 = {
        data: data?.sub_layanan,
        xField: "value",
        yField: "type",
        seriesField: "type",
        label: {
            position: "middle"
        },
        legend: {
            position: "top-left"
        }
    };

    const treeMapConfig = {
        data: {
            name: "root",
            children: serializeData(data?.status_usulan)
        },
        colorField: "name"
    };

    const treeMapConfig2 = {
        data: {
            name: "root",
            children: serializeData(data?.sub_layanan)
        },
        colorField: "name"
    };

    return (
        <Card loading={isLoading} title="Pemberhentian">
            {/* {JSON.stringify(serializeData(data?.status_usulan))} */}
            {data && (
                <Row gutter={[8, 16]}>
                    <Col xs={24} md={12}>
                        <Treemap {...treeMapConfig} />
                    </Col>
                    <Col xs={24} md={12}>
                        <Treemap {...treeMapConfig2} />
                    </Col>
                </Row>
            )}
            {/* {data && (
                <div>
                    <div>
                        <Bar {...config} />
                    </div>
                    <div>
                        <Bar {...config2} />
                    </div>
                </div>
            )} */}
        </Card>
    );
}

export default StatisticPemberhentian;
