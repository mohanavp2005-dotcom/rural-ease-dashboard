import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type Order = Tables<"orders"> & { order_items: Tables<"order_items">[]; businesses: { name: string; business_type: string } | null };

const statusColors: Record<string, string> = {
  pending: "bg-warning text-warning-foreground",
  confirmed: "bg-info text-info-foreground",
  packed: "bg-info text-info-foreground",
  dispatched: "bg-primary text-primary-foreground",
  delivered: "bg-success text-success-foreground",
  cancelled: "bg-destructive text-destructive-foreground",
  rejected: "bg-destructive text-destructive-foreground",
};

const CustomerOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchOrders = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("orders")
      .select("*, order_items(*), businesses(name, business_type)")
      .eq("customer_id", user.id)
      .order("created_at", { ascending: false });
    setOrders((data as Order[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, [user]);

  const cancelOrder = async (orderId: string) => {
    await supabase.from("orders").update({ status: "cancelled" }).eq("id", orderId);
    toast({ title: "Order cancelled" });
    fetchOrders();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="h-14 flex items-center justify-between border-b bg-card px-4 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild><Link to="/customer"><ArrowLeft className="h-5 w-5" /></Link></Button>
          <span className="font-bold text-lg">My Orders</span>
        </div>
      </header>

      <main className="p-4 max-w-4xl mx-auto space-y-4">
        {loading ? (
          <div className="text-center py-16 text-muted-foreground">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Package className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p className="text-lg">No orders yet</p>
            <Button className="mt-4" asChild><Link to="/customer">Browse Stores</Link></Button>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="stat-card space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold">{order.businesses?.name || "Store"}</p>
                  <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString()} {new Date(order.created_at).toLocaleTimeString()}</p>
                </div>
                <Badge className={statusColors[order.status] || ""}>{order.status.toUpperCase()}</Badge>
              </div>
              <div className="border-t pt-2 space-y-1">
                {order.order_items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.product_name} × {item.quantity}</span>
                    <span>₹{item.total_price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 flex items-center justify-between">
                <span className="font-bold text-lg">₹{order.total}</span>
                {order.status === "pending" && (
                  <Button variant="destructive" size="sm" onClick={() => cancelOrder(order.id)}>
                    <XCircle className="h-4 w-4 mr-1" /> Cancel
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default CustomerOrders;
