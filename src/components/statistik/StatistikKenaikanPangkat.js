import { statistikKenaikanPangkat } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Card } from "antd";
import React from "react";
import { Bar } from "@ant-design/plots";

function StatistikKenaikanPangkat() {
    const { data, isLoading } = useQuery(
        ["kenaikan-pangkat"],
        () => statistikKenaikanPangkat(),
        {
            refetchOnWindowFocus: false,
            keepPreviousData: true
        }
    );

    const config = {
        data: data?.jenis_kp,
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

    return (
        <Card loading={isLoading} title="Kenaikan Pangkat">
            <Bar {...config} />
            <Bar {...config2} />
        </Card>
    );
}

export default StatistikKenaikanPangkat;
