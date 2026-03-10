import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBusiness } from "@/contexts/BusinessContext";
import { defaultProducts, ProductData } from "@/data/businessData";
import { useToast } from "@/hooks/use-toast";

const Inventory = () => {
  const [showForm, setShowForm] = useState(false);
  const { t } = useLanguage();
  const { businessType } = useBusiness();
  const { toast } = useToast();

  const storageKey = `inventory_${businessType}`;
  const [products, setProducts] = useState<ProductData[]>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : defaultProducts[businessType];
  });

  useEffect(() => {
    const saved = localStorage.getItem(`inventory_${businessType}`);
    setProducts(saved ? JSON.parse(saved) : defaultProducts[businessType]);
  }, [businessType]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(products));
  }, [products, storageKey]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [qty, setQty] = useState("");
  const [unit, setUnit] = useState("kg");
  const [cost, setCost] = useState("");
  const [sell, setSell] = useState("");
  const [minStock, setMinStock] = useState("5");

  const handleAdd = () => {
    if (!name || !qty || !sell) {
      toast({ title: "Please fill required fields", variant: "destructive" });
      return;
    }
    const newProduct: ProductData = {
      id: Date.now(),
      name, category, qty: Number(qty), unit,
      cost: Number(cost), sell: Number(sell), minStock: Number(minStock),
      emoji: "📦",
    };
    setProducts((prev) => [...prev, newProduct]);
    setName(""); setCategory(""); setQty(""); setCost(""); setSell(""); setMinStock("5");
    setShowForm(false);
    toast({ title: t("add_product") + " ✅" });
  };

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Product deleted" });
  };

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
          <div><Label>{t("product_name")}</Label><Input className="mt-1.5 h-11" value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><Label>{t("category")}</Label><Input className="mt-1.5 h-11" value={category} onChange={(e) => setCategory(e.target.value)} /></div>
          <div><Label>{t("quantity")}</Label><Input type="number" className="mt-1.5 h-11" value={qty} onChange={(e) => setQty(e.target.value)} /></div>
          <div>
            <Label>{t("unit")}</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger className="mt-1.5 h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">Kg</SelectItem>
                <SelectItem value="liters">Liters</SelectItem>
                <SelectItem value="pieces">Pieces</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label>{t("cost_price")} (₹)</Label><Input type="number" className="mt-1.5 h-11" value={cost} onChange={(e) => setCost(e.target.value)} /></div>
          <div><Label>{t("selling_price")} (₹)</Label><Input type="number" className="mt-1.5 h-11" value={sell} onChange={(e) => setSell(e.target.value)} /></div>
          <div><Label>{t("min_stock")}</Label><Input type="number" className="mt-1.5 h-11" value={minStock} onChange={(e) => setMinStock(e.target.value)} /></div>
          <div className="flex items-end"><Button className="h-11" onClick={handleAdd}>{t("add_product")}</Button></div>
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
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.emoji} {p.name}</TableCell>
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
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
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
