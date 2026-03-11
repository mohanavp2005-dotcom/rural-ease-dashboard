import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, CheckCircle, Truck, XCircle, Box } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type Order = Tables<"orders"> & { order_items: Tables<"order_items">[] };

const statusColors: Record<string, string> = {
  pending: "bg-warning text-warning-foreground",
  confirmed: "bg-info text-info-foreground",
  packed: "bg-info text-info-foreground",
  dispatched: "bg-primary text-primary-foreground",
  delivered: "bg-success text-success-foreground",
  cancelled: "bg-destructive text-destructive-foreground",
  rejected: "bg-destructive text-destructive-foreground",
};

const statusFlow = ["pending", "confirmed", "packed", "dispatched", "delivered"] as const;

const OwnerOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { business } = useAuth();
  const { toast } = useToast();

  const fetchOrders = async () => {
    if (!business) return;
    const { data } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("business_id", business.id)
      .order("created_at", { ascending: false });
    setOrders((data as Order[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, [business]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    await supabase.from("orders").update({ status: newStatus as any }).eq("id", orderId);
    toast({ title: `Order ${newStatus}` });
    fetchOrders();
  };

  const getNextStatus = (current: string) => {
    const idx = statusFlow.indexOf(current as any);
    return idx >= 0 && idx < statusFlow.length - 1 ? statusFlow[idx + 1] : null;
  };

  const nextIcon: Record<string, any> = {
    confirmed: CheckCircle,
    packed: Box,
    dispatched: Truck,
    delivered: CheckCircle,
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-header mb-0">Orders</h1>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="packed">Packed</SelectItem>
            <SelectItem value="dispatched">Dispatched</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-16 text-muted-foreground">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Package className="h-12 w-12 mx-auto mb-3 opacity-40" />
          <p className="text-lg">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => {
            const next = getNextStatus(order.status);
            const NextIcon = next ? nextIcon[next] || CheckCircle : null;
            return (
              <div key={order.id} className="stat-card space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg">{order.customer_name}</p>
                    <p className="text-sm text-muted-foreground">{order.customer_phone}</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleString()}</p>
                  </div>
                  <Badge className={statusColors[order.status] || ""}>{order.status.toUpperCase()}</Badge>
                </div>

                {order.delivery_address && (
                  <p className="text-sm"><strong>📍 Address:</strong> {order.delivery_address}</p>
                )}

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
                  <div className="flex gap-2">
                    {order.status === "pending" && (
                      <Button variant="destructive" size="sm" onClick={() => updateStatus(order.id, "rejected")}>
                        <XCircle className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    )}
                    {next && !["cancelled", "rejected"].includes(order.status) && (
                      <Button size="sm" onClick={() => updateStatus(order.id, next)}>
                        {NextIcon && <NextIcon className="h-4 w-4 mr-1" />}
                        {next.charAt(0).toUpperCase() + next.slice(1)}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OwnerOrders;
