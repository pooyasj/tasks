import React from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
export default function Chart({ chartData }) {
    return (
        <>
            <div className="mt-5 p-4 bg-white  rounded shadow mb-4 col ">
                <h5 className="mb-3">Users per month</h5>

                <ResponsiveContainer width="100%" height={280}>
                    <LineChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                        style={{ backgroundColor: "rgba(76, 109, 218, 0.123)" }}
                    >
                        <CartesianGrid
                            strokeDasharray="4 4"
                            stroke="#00041dff"
                        />
                        <XAxis dataKey="month" stroke="#0b0c0cff" />
                        <YAxis stroke="#131414ff" />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#00165fff"
                            strokeWidth={3}
                            dot={{ r: 4, strokeWidth: 2, fill: "#70ffffff" }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}
