  /* eslint-disable react-hooks/exhaustive-deps */
  /* eslint-disable react/prop-types */
  import { useEffect, useState } from "react";
  import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } from "recharts";

  function Graph({ data, bars = [], xAxis }) {
    console.log(data);
    console.log(bars)

    return (
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey={xAxis} scale="band" />
            <Tooltip />
            <Legend />
            {
              bars.map((bar, index) => {
                return (
                  <Bar dataKey={bar.dataKey} width={bar.barWidth} fill={bar.color} key={index} />
                )
              })
            }
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }

  export default Graph;
