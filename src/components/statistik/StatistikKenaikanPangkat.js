import { statistikKenaikanPangkat } from "@/services/fasilitator.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function StatistikKenaikanPangkat() {
    const { data, isLoading } = useQuery(
        ["pemberhentian"],
        () => statistikKenaikanPangkat(),
        {
            refetchOnWindowFocus: false
        }
    );

    return <div>{JSON.stringify(data)}</div>;
}

export default StatistikKenaikanPangkat;
