import { statistikPindahInstansi } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import { Card } from "antd";
import React from "react";
import { Bar } from "@ant-design/plots";

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
        <Card loading={isLoading} title="Pindah Instansi">
            <Bar {...config} />
            <Bar {...config2} />
        </Card>
    );
}

export default StatisticPindahInstansi;
