import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus } from "lucide-react";

const mockProducts = [
  { id: 1, name: "Fresh Milk", category: "Dairy", qty: 50, unit: "liters", cost: 30, sell: 50, minStock: 10 },
  { id: 2, name: "Paneer", category: "Dairy", qty: 5, unit: "kg", cost: 200, sell: 320, minStock: 8 },
  { id: 3, name: "Curd", category: "Dairy", qty: 20, unit: "kg", cost: 40, sell: 60, minStock: 5 },
  { id: 4, name: "Ghee", category: "Dairy", qty: 3, unit: "liters", cost: 400, sell: 600, minStock: 5 },
];

const Inventory = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-header mb-0">Inventory</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-1" /> Add Product
        </Button>
      </div>

      {showForm && (
        <div className="form-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div><Label>Product Name</Label><Input className="mt-1.5" placeholder="e.g. Fresh Milk" /></div>
          <div><Label>Category</Label><Input className="mt-1.5" placeholder="e.g. Dairy" /></div>
          <div><Label>Quantity</Label><Input type="number" className="mt-1.5" placeholder="0" /></div>
          <div>
            <Label>Unit</Label>
            <Select><SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">Kg</SelectItem>
                <SelectItem value="liters">Liters</SelectItem>
                <SelectItem value="pieces">Pieces</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label>Cost Price (₹)</Label><Input type="number" className="mt-1.5" placeholder="0" /></div>
          <div><Label>Selling Price (₹)</Label><Input type="number" className="mt-1.5" placeholder="0" /></div>
          <div><Label>Min Stock Alert</Label><Input type="number" className="mt-1.5" placeholder="5" /></div>
          <div className="flex items-end"><Button>Add Product</Button></div>
        </div>
      )}

      <div className="stat-card overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Selling Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
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
                    {p.qty <= p.minStock ? "Low Stock" : "In Stock"}
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
