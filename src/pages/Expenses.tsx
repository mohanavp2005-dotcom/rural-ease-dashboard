import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Plus } from "lucide-react";

const mockExpenses = [
  { id: 1, date: "2026-03-04", category: "Feed", amount: 1200, mode: "Cash", notes: "Cattle feed" },
  { id: 2, date: "2026-03-03", category: "Electricity", amount: 800, mode: "UPI", notes: "Monthly bill" },
  { id: 3, date: "2026-03-02", category: "Transport", amount: 500, mode: "Cash", notes: "Milk delivery" },
  { id: 4, date: "2026-03-01", category: "Salary", amount: 3000, mode: "Bank", notes: "Helper salary" },
];

const Expenses = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-header mb-0">Expenses</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-1" /> Add Expense
        </Button>
      </div>

      {showForm && (
        <div className="form-section grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Date</Label>
            <Input type="date" className="mt-1.5" />
          </div>
          <div>
            <Label>Category</Label>
            <Select>
              <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {["Seeds", "Feed", "Electricity", "Transport", "Salary", "Other"].map((c) => (
                  <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Amount (₹)</Label>
            <Input type="number" placeholder="0" className="mt-1.5" />
          </div>
          <div>
            <Label>Payment Mode</Label>
            <Select>
              <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label>Notes</Label>
            <Textarea placeholder="Optional notes..." className="mt-1.5" />
          </div>
          <div className="sm:col-span-2">
            <Button>Submit Expense</Button>
          </div>
        </div>
      )}

      <div className="stat-card overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockExpenses.map((e) => (
              <TableRow key={e.id}>
                <TableCell>{e.date}</TableCell>
                <TableCell>{e.category}</TableCell>
                <TableCell className="font-semibold">₹{e.amount}</TableCell>
                <TableCell>{e.mode}</TableCell>
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

export default Expenses;
