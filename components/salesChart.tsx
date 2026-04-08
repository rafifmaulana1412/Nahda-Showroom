"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", sales: 2 },
  { month: "Feb", sales: 5 },
  { month: "Mar", sales: 3 },
  { month: "Apr", sales: 7 },
  { month: "Mei", sales: 4 },
  { month: "Jun", sales: 6 },
];

export default function SalesChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Grafik Penjualan
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#F7931A"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
