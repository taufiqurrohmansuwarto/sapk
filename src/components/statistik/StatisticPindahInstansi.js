import { statistikPindahInstansi } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function StatisticPindahInstansi() {
    const { data, isLoading } = useQuery(
        ["pemberhentian"],
        () => statistikPindahInstansi(),
        {
            refetchOnWindowFocus: false
        }
    );

    return <div>{JSON.stringify(data)}</div>;
}

export default StatisticPindahInstansi;
