import { statistikPemberhentian } from "@/services/fasilitator.service";
import { Bar } from "@ant-design/plots";
import { useQuery } from "@tanstack/react-query";
import { Card } from "antd";

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

    return (
        <Card loading={isLoading} title="Pemberhentian">
            {data && (
                <div>
                    <div>
                        <Bar {...config} />
                    </div>
                    <div>
                        <Bar {...config2} />
                    </div>
                </div>
            )}
        </Card>
    );
}

export default StatisticPemberhentian;
