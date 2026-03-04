import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Minus, Plus, Trash2, Package } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const products = [
  { id: 1, name: "Fresh Milk", price: 50, stock: 50, unit: "L", emoji: "🥛" },
  { id: 2, name: "Paneer", price: 320, stock: 5, unit: "kg", emoji: "🧀" },
  { id: 3, name: "Curd", price: 60, stock: 20, unit: "kg", emoji: "🥣" },
  { id: 4, name: "Ghee", price: 600, stock: 3, unit: "L", emoji: "🫙" },
  { id: 5, name: "Buttermilk", price: 20, stock: 30, unit: "L", emoji: "🥤" },
  { id: 6, name: "Cheese", price: 450, stock: 8, unit: "kg", emoji: "🧀" },
];

type CartItem = { id: number; name: string; price: number; qty: number };

const OnlineStore = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (p: typeof products[0]) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === p.id);
      if (existing) return prev.map((c) => c.id === p.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id: p.id, name: p.name, price: p.price, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) => prev.map((c) => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c));
  };

  const removeFromCart = (id: number) => setCart((prev) => prev.filter((c) => c.id !== id));
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="page-header">Online Store</h1>
      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products"><Package className="h-4 w-4 mr-1" /> Products</TabsTrigger>
          <TabsTrigger value="cart"><ShoppingCart className="h-4 w-4 mr-1" /> Cart ({cart.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {products.map((p) => (
              <div key={p.id} className="stat-card flex flex-col items-center text-center gap-3">
                <span className="text-5xl">{p.emoji}</span>
                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="text-2xl font-bold text-primary">₹{p.price}/{p.unit}</p>
                <Badge variant={p.stock < 5 ? "destructive" : "default"}
                  className={p.stock >= 5 ? "bg-success text-success-foreground" : ""}>
                  {p.stock} {p.unit} available
                </Badge>
                <Button className="w-full" onClick={() => addToCart(p)}>
                  <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cart">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p className="text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              {cart.map((c) => (
                <div key={c.id} className="stat-card flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-sm text-muted-foreground">₹{c.price} each</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" onClick={() => updateQty(c.id, -1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-bold text-lg w-8 text-center">{c.qty}</span>
                    <Button variant="outline" size="icon" onClick={() => updateQty(c.id, 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                    <span className="font-bold w-20 text-right">₹{c.price * c.qty}</span>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(c.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="stat-card flex items-center justify-between">
                <span className="text-xl font-bold">Total: ₹{total}</span>
                <Button size="lg">Checkout</Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OnlineStore;
