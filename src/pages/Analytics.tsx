import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Download, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBusiness } from "@/contexts/BusinessContext";
import { bestSellingByBusiness } from "@/data/businessData";

const Analytics = () => {
  const { t } = useLanguage();
  const { businessType } = useBusiness();

  const pieData = [
    { name: t("income"), value: 85000, color: "hsl(var(--success))" },
    { name: t("expenses"), value: 42500, color: "hsl(var(--destructive))" },
  ];

  const monthlyData = [
    { month: "Jan", profit: 12000 }, { month: "Feb", profit: 15000 }, { month: "Mar", profit: 18000 },
    { month: "Apr", profit: 14000 }, { month: "May", profit: 22000 }, { month: "Jun", profit: 19000 },
  ];

  const bestSelling = bestSellingByBusiness[businessType];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="page-header mb-0">{t("profit_analytics")}</h1>
        <Button variant="outline" className="h-11"><Download className="h-4 w-4 mr-1" /> {t("download_report")}</Button>
      </div>

      <div className="stat-card text-center">
        <p className="text-muted-foreground">{t("monthly_profit_summary")}</p>
        <p className="text-4xl font-bold text-primary mt-2">₹42,500</p>
        <p className="text-sm text-success flex items-center justify-center gap-1 mt-1">
          <TrendingUp className="h-4 w-4" /> +12%
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="stat-card">
          <h3 className="font-semibold text-lg mb-4">{t("expense_vs_income")}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="stat-card">
          <h3 className="font-semibold text-lg mb-4">{t("monthly_profit_trend")}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip />
              <Bar dataKey="profit" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="stat-card">
        <h3 className="font-semibold text-lg mb-4">{t("best_selling")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
};

export default Analytics;
