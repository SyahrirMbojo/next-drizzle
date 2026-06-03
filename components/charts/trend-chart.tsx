"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Mon", visitors: 1200, pageViews: 2400 },
  { name: "Tue", visitors: 1900, pageViews: 1398 },
  { name: "Wed", visitors: 1700, pageViews: 9800 },
  { name: "Thu", visitors: 2500, pageViews: 3908 },
  { name: "Fri", visitors: 2200, pageViews: 4800 },
  { name: "Sat", visitors: 1500, pageViews: 3800 },
  { name: "Sun", visitors: 1800, pageViews: 4300 },
];

export function TrendChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          className="stroke-muted"
          vertical={false}
        />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--background)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
          }}
        />
        <Area
          type="monotone"
          dataKey="visitors"
          stroke="var(--color-primary)"
          fill="var(--color-primary)"
          fillOpacity={0.4}
        />
        <Area
          type="monotone"
          dataKey="pageViews"
          stroke="var(--color-primary)"
          fill="var(--color-primary)"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
