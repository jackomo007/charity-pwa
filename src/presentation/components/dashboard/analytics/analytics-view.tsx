"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { useDonationStore } from "../../../../infrastructure/lib/store";
import { formatValue } from "../../../../infrastructure/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function AnalyticsView() {
  const data = useDonationStore((state) => state.data);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Donation Distribution by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data.donations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip
                formatter={(value) => [`$${value}`, "Amount"]}
                labelStyle={{ color: "var(--foreground)" }}
                itemStyle={{ color: "var(--card-label)" }}
              />
              <Bar dataKey="amount" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Donors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.donations
                .slice()
                .sort((a, b) => b.amount - a.amount)
                .map((donor, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="font-medium">{donor.donorName}</span>
                    <span className="text-muted-foreground">{`$${donor.amount}`}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Impact Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.metrics.map((metric, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="font-medium">{metric.label}</span>
                  <span className="text-muted-foreground">
                    {formatValue(metric.value, metric.type)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
