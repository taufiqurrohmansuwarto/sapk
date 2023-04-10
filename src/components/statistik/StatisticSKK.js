import { statistikSKK } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Card } from "antd";
import { Bar } from "@ant-design/plots";
import React from "react";

function StatisticSKK() {
    const { data, isLoading } = useQuery(["skk"], () => statistikSKK(), {
        refetchOnWindowFocus: false,
        keepPreviousData: true
    });

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

    return (
        <Card loading={isLoading} title="Status Usulan Kedudukan Hukum">
            <Bar {...config} />
        </Card>
    );
}

export default StatisticSKK;
