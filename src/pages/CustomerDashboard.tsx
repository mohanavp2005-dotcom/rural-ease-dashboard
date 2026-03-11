import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Search, Store, LogOut, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Tables } from "@/integrations/supabase/types";

type Business = Tables<"businesses">;

const CustomerDashboard = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { signOut, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("businesses").select("*");
      setBusinesses(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const filtered = businesses.filter(
    (b) => b.name.toLowerCase().includes(search.toLowerCase()) || b.business_type.includes(search.toLowerCase())
  );

  const bizEmoji: Record<string, string> = { dairy: "🐄", poultry: "🐔", grocery: "🏪", farming: "🌾", handicrafts: "🧶" };

  return (
    <div className="min-h-screen bg-background">
      <header className="h-14 flex items-center justify-between border-b bg-card px-4 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-accent" />
          <span className="font-bold text-lg">RuralBiz Shop</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/customer/orders"><Package className="h-4 w-4 mr-1" /> My Orders</Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => { signOut(); navigate("/customer/login"); }}>
            <LogOut className="h-5 w-5 text-destructive" />
          </Button>
        </div>
      </header>

      <main className="p-4 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Welcome{profile?.full_name ? `, ${profile.full_name}` : ""} 👋</h1>
          <p className="text-muted-foreground">Browse local businesses and shop fresh products</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search businesses..." className="pl-10 h-12 text-base" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {loading ? (
          <div className="text-center py-16 text-muted-foreground">Loading businesses...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Store className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p className="text-lg">No businesses found</p>
            <p className="text-sm">Check back later or try a different search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((b) => (
              <Link key={b.id} to={`/customer/store/${b.store_code}`} className="stat-card flex items-center gap-4 hover:border-primary transition-colors">
                <span className="text-4xl">{bizEmoji[b.business_type] || "🏪"}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-lg truncate">{b.name}</h3>
                  <p className="text-sm text-muted-foreground">{b.location || "Local"}</p>
                  <Badge variant="secondary" className="mt-1 capitalize">{b.business_type}</Badge>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CustomerDashboard;
