import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBusiness } from "@/contexts/BusinessContext";
import { expenseCategories, defaultExpenses, ExpenseData } from "@/data/businessData";
import { useToast } from "@/hooks/use-toast";

const Expenses = () => {
  const [showForm, setShowForm] = useState(false);
  const { t } = useLanguage();
  const { businessType } = useBusiness();
  const { toast } = useToast();

  const storageKey = `expenses_${businessType}`;
  const [expenses, setExpenses] = useState<ExpenseData[]>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : defaultExpenses[businessType];
  });

  useEffect(() => {
    const saved = localStorage.getItem(`expenses_${businessType}`);
    setExpenses(saved ? JSON.parse(saved) : defaultExpenses[businessType]);
  }, [businessType]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(expenses));
  }, [expenses, storageKey]);

  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!date || !category || !amount) {
      toast({ title: "Please fill required fields", variant: "destructive" });
      return;
    }
    const newExpense: ExpenseData = {
      id: Date.now(),
      date,
      category,
      amount: Number(amount),
      mode: mode || "Cash",
      notes,
    };
    setExpenses((prev) => [newExpense, ...prev]);
    setDate(""); setCategory(""); setAmount(""); setMode(""); setNotes("");
    setShowForm(false);
    toast({ title: t("add_expense") + " ✅" });
  };

  const handleDelete = (id: number) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    toast({ title: "Expense deleted" });
  };

  const categories = expenseCategories[businessType];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-header mb-0">{t("expenses")}</h1>
        <Button onClick={() => setShowForm(!showForm)} className="h-11">
          <Plus className="h-4 w-4 mr-1" /> {t("add_expense")}
        </Button>
      </div>

      {showForm && (
        <div className="form-section grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>{t("date")}</Label>
            <Input type="date" className="mt-1.5 h-11" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <Label>{t("category")}</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder={t("category")} /></SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>{t("amount")} (₹)</Label>
            <Input type="number" placeholder="0" className="mt-1.5 h-11" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div>
            <Label>{t("payment_mode")}</Label>
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder={t("payment_mode")} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="UPI">UPI</SelectItem>
                <SelectItem value="Bank">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label>{t("notes")}</Label>
            <Textarea placeholder={t("notes")} className="mt-1.5" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <Button className="h-11" onClick={handleSubmit}>{t("submit")}</Button>
          </div>
        </div>
      )}

      <div className="stat-card overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("date")}</TableHead>
              <TableHead>{t("category")}</TableHead>
              <TableHead>{t("amount")}</TableHead>
              <TableHead>{t("mode")}</TableHead>
              <TableHead className="text-right">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((e) => (
              <TableRow key={e.id}>
                <TableCell>{e.date}</TableCell>
                <TableCell>{e.category}</TableCell>
                <TableCell className="font-semibold">₹{e.amount}</TableCell>
                <TableCell>{e.mode}</TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(e.id)}>
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

export default Expenses;
