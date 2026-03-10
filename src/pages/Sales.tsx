import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBusiness } from "@/contexts/BusinessContext";
import { defaultSales, defaultProducts, SaleData } from "@/data/businessData";
import { useToast } from "@/hooks/use-toast";

const Sales = () => {
  const [showForm, setShowForm] = useState(false);
  const { t } = useLanguage();
  const { businessType } = useBusiness();
  const { toast } = useToast();

  const storageKey = `sales_${businessType}`;
  const [sales, setSales] = useState<SaleData[]>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : defaultSales[businessType];
  });

  useEffect(() => {
    const saved = localStorage.getItem(`sales_${businessType}`);
    setSales(saved ? JSON.parse(saved) : defaultSales[businessType]);
  }, [businessType]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(sales));
  }, [sales, storageKey]);

  const products = defaultProducts[businessType];
  const [customer, setCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [qty, setQty] = useState("");
  const [payStatus, setPayStatus] = useState<"Paid" | "Pending">("Paid");

  const selectedP = products.find((p) => p.name === selectedProduct);
  const totalPrice = selectedP ? selectedP.sell * Number(qty || 0) : 0;

  const handleAddSale = () => {
    if (!customer || !selectedProduct || !qty) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    const newSale: SaleData = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      customer,
      product: selectedProduct,
      qty: Number(qty),
      total: totalPrice,
      status: payStatus,
    };
    setSales((prev) => [newSale, ...prev]);
    setCustomer(""); setSelectedProduct(""); setQty("");
    setShowForm(false);
    toast({ title: t("add_sale") + " ✅" });
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-header mb-0">{t("sales")}</h1>
        <Button onClick={() => setShowForm(!showForm)} className="h-11">
          <Plus className="h-4 w-4 mr-1" /> {t("new_sale")}
        </Button>
      </div>

      {showForm && (
        <div className="form-section grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>{t("customer_name")}</Label><Input className="mt-1.5 h-11" value={customer} onChange={(e) => setCustomer(e.target.value)} /></div>
          <div>
            <Label>{t("product")}</Label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder={t("product")} /></SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p.id} value={p.name}>{p.emoji} {p.name} (₹{p.sell}/{p.unit})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div><Label>{t("quantity")}</Label><Input type="number" className="mt-1.5 h-11" value={qty} onChange={(e) => setQty(e.target.value)} /></div>
          <div>
            <Label>{t("total_price")} (₹)</Label>
            <Input className="mt-1.5 h-11 bg-muted font-bold" value={totalPrice > 0 ? `₹${totalPrice}` : "Auto-calculated"} readOnly />
          </div>
          <div>
            <Label>{t("payment_status")}</Label>
            <Select value={payStatus} onValueChange={(v) => setPayStatus(v as "Paid" | "Pending")}>
              <SelectTrigger className="mt-1.5 h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Paid">{t("paid")}</SelectItem>
                <SelectItem value="Pending">{t("pending")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-2 flex-wrap">
            <Button className="h-11" onClick={handleAddSale}>{t("add_sale")}</Button>
            <Button variant="outline" className="h-11"><FileText className="h-4 w-4 mr-1" /> {t("generate_invoice")}</Button>
          </div>
        </div>
      )}

      <div className="stat-card overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("date")}</TableHead>
              <TableHead>{t("customer")}</TableHead>
              <TableHead>{t("product")}</TableHead>
              <TableHead>{t("amount")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead className="text-right">{t("invoice")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.date}</TableCell>
                <TableCell className="font-medium">{s.customer}</TableCell>
                <TableCell>{s.product}</TableCell>
                <TableCell className="font-semibold">₹{s.total}</TableCell>
                <TableCell>
                  <Badge variant={s.status === "Pending" ? "destructive" : "default"}
                    className={s.status === "Paid" ? "bg-success text-success-foreground" : ""}>
                    {s.status === "Paid" ? t("paid") : t("pending")}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm"><FileText className="h-4 w-4 mr-1" /> {t("view")}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Sales;
