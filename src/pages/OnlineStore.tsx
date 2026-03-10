import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Minus, Plus, Trash2, Package, CheckCircle, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBusiness } from "@/contexts/BusinessContext";
import { defaultProducts } from "@/data/businessData";
import { useToast } from "@/hooks/use-toast";

type CartItem = { id: number; name: string; price: number; qty: number; emoji: string };

const OnlineStore = () => {
  const { t } = useLanguage();
  const { businessType } = useBusiness();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("products");
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "details" | "confirm" | "done">("cart");

  const products = defaultProducts[businessType];

  const cartKey = `cart_${businessType}`;
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(cartKey);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, cartKey]);

  useEffect(() => {
    const saved = localStorage.getItem(`cart_${businessType}`);
    setCart(saved ? JSON.parse(saved) : []);
    setCheckoutStep("cart");
  }, [businessType]);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const addToCart = (p: typeof products[0]) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === p.id);
      if (existing) return prev.map((c) => c.id === p.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id: p.id, name: p.name, price: p.sell, qty: 1, emoji: p.emoji }];
    });
    toast({ title: `${p.emoji} ${p.name} added to cart` });
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) => prev.map((c) => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c));
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
    toast({ title: "Item removed" });
  };

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep("details");
    setActiveTab("cart");
  };

  const handleConfirmOrder = () => {
    if (!customerName || !customerPhone) {
      toast({ title: "Please fill name and phone", variant: "destructive" });
      return;
    }
    setCheckoutStep("confirm");
  };

  const handlePlaceOrder = () => {
    // Save order
    const orders = JSON.parse(localStorage.getItem(`orders_${businessType}`) || "[]");
    orders.push({
      id: Date.now(),
      date: new Date().toISOString(),
      customer: customerName,
      phone: customerPhone,
      address: customerAddress,
      items: cart,
      total,
    });
    localStorage.setItem(`orders_${businessType}`, JSON.stringify(orders));
    
    setCart([]);
    setCheckoutStep("done");
    toast({ title: "Order placed successfully! ✅" });
  };

  const resetCheckout = () => {
    setCheckoutStep("cart");
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
    setActiveTab("products");
  };

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="page-header">{t("online_store")}</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="products"><Package className="h-4 w-4 mr-1" /> {t("products")}</TabsTrigger>
          <TabsTrigger value="cart"><ShoppingCart className="h-4 w-4 mr-1" /> {t("cart")} ({cart.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
            {products.map((p) => (
              <div key={p.id} className="stat-card flex flex-col items-center text-center gap-2 p-4">
                <span className="text-4xl">{p.emoji}</span>
                <h3 className="font-bold text-sm">{p.name}</h3>
                <p className="text-xl font-bold text-primary">₹{p.sell}/{p.unit}</p>
                <Badge variant={p.qty < p.minStock ? "destructive" : "default"}
                  className={p.qty >= p.minStock ? "bg-success text-success-foreground" : ""}>
                  {p.qty} {p.unit} {t("available")}
                </Badge>
                <Button className="w-full h-10" onClick={() => addToCart(p)}>
                  <ShoppingCart className="h-4 w-4 mr-1" /> {t("add_to_cart")}
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cart">
          {checkoutStep === "done" ? (
            <div className="text-center py-16">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-success" />
              <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
              <p className="text-muted-foreground mb-6">Your order has been confirmed and saved.</p>
              <Button onClick={resetCheckout} className="h-12">Continue Shopping</Button>
            </div>
          ) : checkoutStep === "confirm" ? (
            <div className="space-y-4 mt-4 max-w-md mx-auto">
              <Button variant="ghost" size="sm" onClick={() => setCheckoutStep("details")}>
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              <div className="stat-card space-y-3">
                <h3 className="font-bold text-lg">Order Summary</h3>
                {cart.map((c) => (
                  <div key={c.id} className="flex justify-between text-sm">
                    <span>{c.emoji} {c.name} × {c.qty}</span>
                    <span className="font-semibold">₹{c.price * c.qty}</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>{t("total")}</span>
                  <span>₹{total}</span>
                </div>
                <div className="border-t pt-2 text-sm space-y-1">
                  <p><strong>Name:</strong> {customerName}</p>
                  <p><strong>Phone:</strong> {customerPhone}</p>
                  {customerAddress && <p><strong>Address:</strong> {customerAddress}</p>}
                </div>
                <Button className="w-full h-12 text-base" onClick={handlePlaceOrder}>
                  Place Order ✅
                </Button>
              </div>
            </div>
          ) : checkoutStep === "details" ? (
            <div className="space-y-4 mt-4 max-w-md mx-auto">
              <Button variant="ghost" size="sm" onClick={() => setCheckoutStep("cart")}>
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Cart
              </Button>
              <div className="form-section space-y-4">
                <h3 className="font-bold text-lg">Customer Details</h3>
                <div>
                  <Label>Name *</Label>
                  <Input className="mt-1.5 h-11" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                </div>
                <div>
                  <Label>Phone *</Label>
                  <Input className="mt-1.5 h-11" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
                </div>
                <div>
                  <Label>Delivery Address</Label>
                  <Input className="mt-1.5 h-11" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
                </div>
                <div className="text-lg font-bold">{t("total")}: ₹{total}</div>
                <Button className="w-full h-12 text-base" onClick={handleConfirmOrder}>
                  Review Order →
                </Button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p className="text-lg">{t("cart_empty")}</p>
            </div>
          ) : (
            <div className="space-y-3 mt-4">
              {cart.map((c) => (
                <div key={c.id} className="stat-card flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm">{c.emoji} {c.name}</p>
                    <p className="text-xs text-muted-foreground">₹{c.price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQty(c.id, -1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="font-bold w-6 text-center">{c.qty}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQty(c.id, 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                    <span className="font-bold text-sm w-16 text-right">₹{c.price * c.qty}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFromCart(c.id)}>
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="stat-card flex items-center justify-between">
                <span className="text-xl font-bold">{t("total")}: ₹{total}</span>
                <Button size="lg" className="h-12" onClick={handleCheckout}>{t("checkout")} →</Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OnlineStore;
