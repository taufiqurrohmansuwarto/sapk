import { statistikSKK } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function StatisticSKK() {
    const { data, isLoading } = useQuery(
        ["pemberhentian"],
        () => statistikSKK(),
        {
            refetchOnWindowFocus: false
        }
    );

    return <div>{JSON.stringify(data)}</div>;
}

export default StatisticSKK;
