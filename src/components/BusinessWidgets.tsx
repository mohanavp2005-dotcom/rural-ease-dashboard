import { BusinessType } from "@/contexts/BusinessContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Milk, Egg, Bug, Wheat, Droplets, Scissors, PackageCheck,
  Heart, Bird, Skull, Leaf, FlaskConical, CloudRain, BarChart3,
  Timer, ShoppingBasket, Users, AlertTriangle
} from "lucide-react";

type WidgetData = {
  labelKey: string;
  value: string;
  icon: React.ElementType;
  color: string;
};

const businessWidgets: Record<BusinessType, WidgetData[]> = {
  dairy: [
    { labelKey: "milk_production", value: "120 L", icon: Milk, color: "text-info" },
    { labelKey: "milk_sold", value: "95 L", icon: Droplets, color: "text-primary" },
    { labelKey: "cattle_feed", value: "250 kg", icon: Wheat, color: "text-warning" },
    { labelKey: "cattle_health", value: "Good", icon: Heart, color: "text-success" },
  ],
  poultry: [
    { labelKey: "total_birds", value: "450", icon: Bird, color: "text-info" },
    { labelKey: "eggs_today", value: "320", icon: Egg, color: "text-warning" },
    { labelKey: "feed_stock", value: "180 kg", icon: Wheat, color: "text-primary" },
    { labelKey: "mortality", value: "2", icon: Skull, color: "text-destructive" },
  ],
  farming: [
    { labelKey: "current_crop", value: "Rice", icon: Leaf, color: "text-success" },
    { labelKey: "fertilizer", value: "45 kg", icon: FlaskConical, color: "text-warning" },
    { labelKey: "water_usage", value: "2,500 L", icon: CloudRain, color: "text-info" },
    { labelKey: "harvest", value: "15 days", icon: BarChart3, color: "text-primary" },
  ],
  handicrafts: [
    { labelKey: "products_created", value: "12", icon: Scissors, color: "text-primary" },
    { labelKey: "raw_material", value: "Good", icon: PackageCheck, color: "text-success" },
    { labelKey: "orders_received", value: "8", icon: ShoppingBasket, color: "text-info" },
    { labelKey: "production_progress", value: "75%", icon: Timer, color: "text-warning" },
  ],
  grocery: [
    { labelKey: "expiring_products", value: "5", icon: AlertTriangle, color: "text-destructive" },
    { labelKey: "supplier_orders", value: "3", icon: PackageCheck, color: "text-info" },
    { labelKey: "daily_customers", value: "48", icon: Users, color: "text-primary" },
    { labelKey: "low_stock", value: "7", icon: Bug, color: "text-warning" },
  ],
};

const businessEmoji: Record<BusinessType, string> = {
  dairy: "🐄",
  poultry: "🐔",
  farming: "🌾",
  handicrafts: "🧶",
  grocery: "🏪",
};

const businessLabel: Record<BusinessType, Record<"en" | "ta", string>> = {
  dairy: { en: "Dairy", ta: "பால் பண்ணை" },
  poultry: { en: "Poultry", ta: "கோழிப்பண்ணை" },
  farming: { en: "Farming", ta: "விவசாயம்" },
  handicrafts: { en: "Handicrafts", ta: "கைவினைப்பொருட்கள்" },
  grocery: { en: "Grocery", ta: "மளிகை கடை" },
};

export function BusinessSpecificWidgets({ businessType }: { businessType: BusinessType }) {
  const { t, lang } = useLanguage();
  const widgets = businessWidgets[businessType];

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold flex items-center gap-2">
        <span>{businessEmoji[businessType]}</span>
        {businessLabel[businessType][lang]} Dashboard
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {widgets.map((w) => (
          <div key={w.labelKey} className="stat-card flex items-center gap-3">
            <div className={`p-2.5 rounded-xl bg-muted ${w.color} shrink-0`}>
              <w.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground truncate">{t(w.labelKey)}</p>
              <p className="text-lg font-bold leading-tight">{w.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
