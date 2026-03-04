import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Download, TrendingUp } from "lucide-react";

const pieData = [
  { name: "Income", value: 85000, color: "hsl(var(--success))" },
  { name: "Expenses", value: 42500, color: "hsl(var(--destructive))" },
];

const monthlyData = [
  { month: "Jan", profit: 12000 }, { month: "Feb", profit: 15000 }, { month: "Mar", profit: 18000 },
  { month: "Apr", profit: 14000 }, { month: "May", profit: 22000 }, { month: "Jun", profit: 19000 },
];

const bestSelling = [
  { name: "Fresh Milk", sold: 320, revenue: 16000 },
  { name: "Curd", sold: 180, revenue: 10800 },
  { name: "Paneer", sold: 45, revenue: 14400 },
];

const Analytics = () => (
  <div className="animate-fade-in space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="page-header mb-0">Profit Analytics</h1>
      <Button variant="outline"><Download className="h-4 w-4 mr-1" /> Download Report</Button>
    </div>

    <div className="stat-card text-center">
      <p className="text-muted-foreground">Monthly Profit Summary</p>
      <p className="text-4xl font-bold text-primary mt-2">₹42,500</p>
      <p className="text-sm text-success flex items-center justify-center gap-1 mt-1">
        <TrendingUp className="h-4 w-4" /> +12% from last month
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="stat-card">
        <h3 className="font-semibold text-lg mb-4">Expense vs Income</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
              {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="stat-card">
        <h3 className="font-semibold text-lg mb-4">Monthly Profit Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip />
            <Bar dataKey="profit" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="stat-card">
      <h3 className="font-semibold text-lg mb-4">Best Selling Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {bestSelling.map((p, i) => (
          <div key={p.name} className="bg-muted rounded-xl p-4 text-center">
            <p className="text-3xl font-bold">#{i + 1}</p>
            <p className="font-semibold mt-1">{p.name}</p>
            <p className="text-sm text-muted-foreground">{p.sold} units · ₹{p.revenue.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Analytics;
