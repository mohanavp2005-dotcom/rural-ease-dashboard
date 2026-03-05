import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const mockProducts = [
  { id: 1, name: "Fresh Milk", category: "Dairy", qty: 50, unit: "liters", cost: 30, sell: 50, minStock: 10 },
  { id: 2, name: "Paneer", category: "Dairy", qty: 5, unit: "kg", cost: 200, sell: 320, minStock: 8 },
  { id: 3, name: "Curd", category: "Dairy", qty: 20, unit: "kg", cost: 40, sell: 60, minStock: 5 },
  { id: 4, name: "Ghee", category: "Dairy", qty: 3, unit: "liters", cost: 400, sell: 600, minStock: 5 },
];

const Inventory = () => {
  const [showForm, setShowForm] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-header mb-0">{t("inventory")}</h1>
        <Button onClick={() => setShowForm(!showForm)} className="h-11">
          <Plus className="h-4 w-4 mr-1" /> {t("add_product")}
        </Button>
      </div>

      {showForm && (
        <div className="form-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div><Label>{t("product_name")}</Label><Input className="mt-1.5 h-11" placeholder="e.g. Fresh Milk" /></div>
          <div><Label>{t("category")}</Label><Input className="mt-1.5 h-11" placeholder="e.g. Dairy" /></div>
          <div><Label>{t("quantity")}</Label><Input type="number" className="mt-1.5 h-11" placeholder="0" /></div>
          <div>
            <Label>{t("unit")}</Label>
            <Select><SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder={t("unit")} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">Kg</SelectItem>
                <SelectItem value="liters">Liters</SelectItem>
                <SelectItem value="pieces">Pieces</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label>{t("cost_price")} (₹)</Label><Input type="number" className="mt-1.5 h-11" placeholder="0" /></div>
          <div><Label>{t("selling_price")} (₹)</Label><Input type="number" className="mt-1.5 h-11" placeholder="0" /></div>
          <div><Label>{t("min_stock")}</Label><Input type="number" className="mt-1.5 h-11" placeholder="5" /></div>
          <div className="flex items-end"><Button className="h-11">{t("add_product")}</Button></div>
        </div>
      )}

      <div className="stat-card overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("product")}</TableHead>
              <TableHead>{t("stock")}</TableHead>
              <TableHead>{t("selling_price")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead className="text-right">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProducts.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>{p.qty} {p.unit}</TableCell>
                <TableCell>₹{p.sell}</TableCell>
                <TableCell>
                  <Badge variant={p.qty <= p.minStock ? "destructive" : "default"}
                    className={p.qty > p.minStock ? "bg-success text-success-foreground" : ""}>
                    {p.qty <= p.minStock ? t("low_stock_label") : t("in_stock")}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Inventory;
