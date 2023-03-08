import { statistikPemberhentian } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function StatisticPemberhentian() {
    const { data, isLoading } = useQuery(
        ["pemberhentian"],
        () => statistikPemberhentian(),
        {
            refetchOnWindowFocus: false
        }
    );

    return <div>{JSON.stringify(data)}</div>;
}

export default StatisticPemberhentian;
