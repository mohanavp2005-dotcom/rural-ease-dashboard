import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Minus, Plus, Trash2, ArrowLeft, CheckCircle, Store } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type Product = Tables<"products">;
type Business = Tables<"businesses">;
type CartItem = { product: Product; qty: number };

const CustomerStore = () => {
  const { storeCode } = useParams<{ storeCode: string }>();
  const [business, setBusiness] = useState<Business | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [step, setStep] = useState<"browse" | "cart" | "details" | "confirm" | "done">("browse");
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custAddress, setCustAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const { data: biz } = await supabase.from("businesses").select("*").eq("store_code", storeCode!).single();
      if (!biz) { setLoading(false); return; }
      setBusiness(biz);
      const { data: prods } = await supabase.from("products").select("*").eq("business_id", biz.id).eq("is_active", true);
      setProducts(prods || []);
      setLoading(false);
    };
    fetch();
  }, [storeCode]);

  useEffect(() => {
    if (profile) {
      setCustName(profile.full_name || "");
      setCustPhone(profile.phone || "");
    }
  }, [profile]);

  const addToCart = (p: Product) => {
    setCart((prev) => {
      const ex = prev.find((c) => c.product.id === p.id);
      if (ex) return prev.map((c) => c.product.id === p.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { product: p, qty: 1 }];
    });
    toast({ title: `${p.emoji || "📦"} ${p.name} added` });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) => prev.map((c) => c.product.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c));
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((c) => c.product.id !== id));
  };

  const total = cart.reduce((s, c) => s + c.product.sell_price * c.qty, 0);

  const placeOrder = async () => {
    if (!user || !business) return;
    setPlacing(true);

    const { data: order, error } = await supabase.from("orders").insert({
      business_id: business.id,
      customer_id: user.id,
      customer_name: custName,
      customer_phone: custPhone,
      delivery_address: custAddress,
      total,
      status: "pending",
    }).select().single();

    if (error || !order) {
      toast({ title: "Failed to place order", variant: "destructive" });
      setPlacing(false);
      return;
    }

    const items = cart.map((c) => ({
      order_id: order.id,
      product_id: c.product.id,
      product_name: c.product.name,
      quantity: c.qty,
      unit_price: c.product.sell_price,
      total_price: c.product.sell_price * c.qty,
    }));

    await supabase.from("order_items").insert(items);

    setCart([]);
    setStep("done");
    setPlacing(false);
    toast({ title: "Order placed! ✅" });
  };

  const bizEmoji: Record<string, string> = { dairy: "🐄", poultry: "🐔", grocery: "🏪", farming: "🌾", handicrafts: "🧶" };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  if (!business) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-muted-foreground gap-4">
      <Store className="h-16 w-16 opacity-40" />
      <p className="text-xl">Store not found</p>
      <Button asChild><Link to="/customer">Back to Browse</Link></Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="h-14 flex items-center justify-between border-b bg-card px-4 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => step === "browse" ? navigate("/customer") : setStep("browse")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="text-2xl">{bizEmoji[business.business_type]}</span>
          <span className="font-bold truncate">{business.name}</span>
        </div>
        <Button variant="outline" size="sm" onClick={() => setStep("cart")} className="relative">
          <ShoppingCart className="h-4 w-4 mr-1" /> Cart
          {cart.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">{cart.length}</Badge>
          )}
        </Button>
      </header>

      <main className="p-4 max-w-4xl mx-auto">
        {step === "done" ? (
          <div className="text-center py-16">
            <CheckCircle className="h-16 w-16 mx-auto mb-4 text-success" />
            <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
            <p className="text-muted-foreground mb-6">The business owner will confirm your order soon.</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => { setStep("browse"); }} variant="outline">Continue Shopping</Button>
              <Button asChild><Link to="/customer/orders">View My Orders</Link></Button>
            </div>
          </div>
        ) : step === "confirm" ? (
          <div className="space-y-4 max-w-md mx-auto mt-4">
            <Button variant="ghost" size="sm" onClick={() => setStep("details")}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <div className="stat-card space-y-3">
              <h3 className="font-bold text-lg">Order Summary</h3>
              {cart.map((c) => (
                <div key={c.product.id} className="flex justify-between text-sm">
                  <span>{c.product.emoji} {c.product.name} × {c.qty}</span>
                  <span className="font-semibold">₹{c.product.sell_price * c.qty}</span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span><span>₹{total}</span>
              </div>
              <div className="border-t pt-2 text-sm space-y-1">
                <p><strong>Name:</strong> {custName}</p>
                <p><strong>Phone:</strong> {custPhone}</p>
                {custAddress && <p><strong>Address:</strong> {custAddress}</p>}
              </div>
              <Button className="w-full h-12 text-base" onClick={placeOrder} disabled={placing}>
                {placing ? "Placing..." : "Place Order ✅"}
              </Button>
            </div>
          </div>
        ) : step === "details" ? (
          <div className="space-y-4 max-w-md mx-auto mt-4">
            <Button variant="ghost" size="sm" onClick={() => setStep("cart")}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Cart
            </Button>
            <div className="form-section space-y-4">
              <h3 className="font-bold text-lg">Delivery Details</h3>
              <div><Label>Name *</Label><Input className="mt-1.5 h-11" value={custName} onChange={(e) => setCustName(e.target.value)} /></div>
              <div><Label>Phone *</Label><Input className="mt-1.5 h-11" value={custPhone} onChange={(e) => setCustPhone(e.target.value)} /></div>
              <div><Label>Delivery Address</Label><Input className="mt-1.5 h-11" value={custAddress} onChange={(e) => setCustAddress(e.target.value)} /></div>
              <div className="text-lg font-bold">Total: ₹{total}</div>
              <Button className="w-full h-12 text-base" onClick={() => {
                if (!custName || !custPhone) { toast({ title: "Name and phone required", variant: "destructive" }); return; }
                setStep("confirm");
              }}>Review Order →</Button>
            </div>
          </div>
        ) : step === "cart" ? (
          cart.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p className="text-lg">Your cart is empty</p>
              <Button variant="outline" className="mt-4" onClick={() => setStep("browse")}>Browse Products</Button>
            </div>
          ) : (
            <div className="space-y-3 mt-4">
              {cart.map((c) => (
                <div key={c.product.id} className="stat-card flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm">{c.product.emoji} {c.product.name}</p>
                    <p className="text-xs text-muted-foreground">₹{c.product.sell_price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQty(c.product.id, -1)}><Minus className="h-3 w-3" /></Button>
                    <span className="font-bold w-6 text-center">{c.qty}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQty(c.product.id, 1)}><Plus className="h-3 w-3" /></Button>
                    <span className="font-bold text-sm w-16 text-right">₹{c.product.sell_price * c.qty}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeItem(c.product.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
                  </div>
                </div>
              ))}
              <div className="stat-card flex items-center justify-between">
                <span className="text-xl font-bold">Total: ₹{total}</span>
                <Button size="lg" className="h-12" onClick={() => setStep("details")}>Checkout →</Button>
              </div>
            </div>
          )
        ) : (
          <div>
            <div className="mb-4">
              <Badge variant="secondary" className="capitalize">{business.business_type}</Badge>
              {business.location && <span className="text-sm text-muted-foreground ml-2">{business.location}</span>}
            </div>
            {products.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <p>No products available yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {products.map((p) => (
                  <div key={p.id} className="stat-card flex flex-col items-center text-center gap-2 p-4">
                    <span className="text-4xl">{p.emoji || "📦"}</span>
                    <h3 className="font-bold text-sm">{p.name}</h3>
                    <p className="text-xl font-bold text-primary">₹{p.sell_price}/{p.unit}</p>
                    <Badge variant={p.qty < p.min_stock ? "destructive" : "default"}
                      className={p.qty >= p.min_stock ? "bg-success text-success-foreground" : ""}>
                      {p.qty} {p.unit} available
                    </Badge>
                    <Button className="w-full h-10" onClick={() => addToCart(p)} disabled={p.qty <= 0}>
                      <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default CustomerStore;
