import { IndianRupee, Wallet, TrendingUp, AlertTriangle, Clock } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const weeklyData = [
  { day: "Mon", sales: 2400 }, { day: "Tue", sales: 1800 }, { day: "Wed", sales: 3200 },
  { day: "Thu", sales: 2800 }, { day: "Fri", sales: 3600 }, { day: "Sat", sales: 4100 },
  { day: "Sun", sales: 2900 },
];

const monthlyProfit = [
  { month: "Jan", profit: 12000 }, { month: "Feb", profit: 15000 }, { month: "Mar", profit: 18000 },
  { month: "Apr", profit: 14000 }, { month: "May", profit: 22000 }, { month: "Jun", profit: 19000 },
];

const stats = [
  { label: "Today's Sales", value: "₹4,250", icon: IndianRupee, color: "text-success" },
  { label: "Today's Expenses", value: "₹1,800", icon: Wallet, color: "text-destructive" },
  { label: "Monthly Profit", value: "₹42,500", icon: TrendingUp, color: "text-primary" },
  { label: "Low Stock Items", value: "3", icon: AlertTriangle, color: "text-warning" },
  { label: "Pending Orders", value: "5", icon: Clock, color: "text-info" },
];

const Dashboard = () => (
  <div className="animate-fade-in space-y-6">
    <h1 className="page-header">Dashboard</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="stat-card flex items-center gap-4">
          <div className={`p-3 rounded-xl bg-muted ${s.color}`}>
            <s.icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="text-xl font-bold">{s.value}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="stat-card">
        <h3 className="font-semibold text-lg mb-4">Weekly Sales</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="stat-card">
        <h3 className="font-semibold text-lg mb-4">Monthly Profit</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyProfit}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip />
            <Bar dataKey="profit" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default Dashboard;
