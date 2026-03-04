import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText } from "lucide-react";

const mockSales = [
  { id: 1, date: "2026-03-04", customer: "Ravi Kumar", product: "Fresh Milk", qty: 5, total: 250, status: "Paid" },
  { id: 2, date: "2026-03-04", customer: "Lakshmi Store", product: "Paneer", qty: 2, total: 640, status: "Pending" },
  { id: 3, date: "2026-03-03", customer: "Muthu", product: "Curd", qty: 3, total: 180, status: "Paid" },
  { id: 4, date: "2026-03-02", customer: "Selva", product: "Ghee", qty: 1, total: 600, status: "Pending" },
];

const Sales = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-header mb-0">Sales</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-1" /> New Sale
        </Button>
      </div>

      {showForm && (
        <div className="form-section grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>Customer Name</Label><Input className="mt-1.5" placeholder="Customer name" /></div>
          <div>
            <Label>Product</Label>
            <Select><SelectTrigger className="mt-1.5"><SelectValue placeholder="Select product" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="milk">Fresh Milk (₹50/L)</SelectItem>
                <SelectItem value="paneer">Paneer (₹320/kg)</SelectItem>
                <SelectItem value="curd">Curd (₹60/kg)</SelectItem>
                <SelectItem value="ghee">Ghee (₹600/L)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label>Quantity</Label><Input type="number" className="mt-1.5" placeholder="0" /></div>
          <div>
            <Label>Total Price (₹)</Label>
            <Input className="mt-1.5 bg-muted" value="Auto-calculated" readOnly />
          </div>
          <div>
            <Label>Payment Status</Label>
            <Select><SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-2">
            <Button>Add Sale</Button>
            <Button variant="outline"><FileText className="h-4 w-4 mr-1" /> Generate Invoice</Button>
          </div>
        </div>
      )}

      <div className="stat-card overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Invoice</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockSales.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.date}</TableCell>
                <TableCell className="font-medium">{s.customer}</TableCell>
                <TableCell className="font-semibold">₹{s.total}</TableCell>
                <TableCell>
                  <Badge variant={s.status === "Pending" ? "destructive" : "default"}
                    className={s.status === "Paid" ? "bg-success text-success-foreground" : ""}>
                    {s.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm"><FileText className="h-4 w-4 mr-1" /> View</Button>
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
