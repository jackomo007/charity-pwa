"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useDonationStore } from "../../../infrastructure/lib/store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function DonationChart() {
  const data = useDonationStore((state) => state.data.donations);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              padding={{ left: 0, right: 0 }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              width={60}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--background)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                color: "var(--foreground)",
              }}
              labelStyle={{
                color: "var(--foreground)",
                marginBottom: "0.5rem",
              }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
