import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sprout } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type BizType = "dairy" | "poultry" | "grocery" | "farming" | "handicrafts";

const OwnerRegister = () => {
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [bizType, setBizType] = useState<BizType>("dairy");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async () => {
    if (!businessName || !ownerName || !email || !password) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    if (password !== confirmPw) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const { error } = await signUp(email, password, {
      full_name: ownerName,
      phone,
      role: "owner",
    });

    if (error) {
      setSubmitting(false);
      toast({ title: error.message, variant: "destructive" });
      return;
    }

    // Wait a moment for auth trigger, then create business
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const storeCode = businessName.toLowerCase().replace(/[^a-z0-9]/g, "") + "-" + Math.random().toString(36).slice(2, 6);
      await supabase.from("businesses").insert({
        owner_id: user.id,
        name: businessName,
        business_type: bizType,
        location,
        store_code: storeCode,
      });
    }

    setSubmitting(false);
    toast({ title: "Registration successful! ✅" });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4">
            <Sprout className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">Register Business</h1>
          <p className="text-muted-foreground mt-1">Create your business account</p>
        </div>

        <div className="form-section space-y-4">
          <div>
            <Label className="text-base">Business Name *</Label>
            <Input placeholder="e.g. Krishna Dairy Farm" className="mt-1.5 h-12 text-base" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
          </div>
          <div>
            <Label className="text-base">Owner Name *</Label>
            <Input placeholder="Your full name" className="mt-1.5 h-12 text-base" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
          </div>
          <div>
            <Label className="text-base">Business Type</Label>
            <Select value={bizType} onValueChange={(v) => setBizType(v as BizType)}>
              <SelectTrigger className="mt-1.5 h-12 text-base"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="dairy">🐄 Dairy</SelectItem>
                <SelectItem value="poultry">🐔 Poultry</SelectItem>
                <SelectItem value="grocery">🏪 Grocery</SelectItem>
                <SelectItem value="farming">🌾 Farming</SelectItem>
                <SelectItem value="handicrafts">🧶 Handicrafts</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-base">Location</Label>
            <Input placeholder="Village / Town" className="mt-1.5 h-12 text-base" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div>
            <Label className="text-base">Phone</Label>
            <Input placeholder="10-digit mobile" className="mt-1.5 h-12 text-base" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <Label className="text-base">Email *</Label>
            <Input placeholder="owner@email.com" className="mt-1.5 h-12 text-base" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label className="text-base">Password *</Label>
            <Input type="password" placeholder="Min 6 characters" className="mt-1.5 h-12 text-base" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <Label className="text-base">Confirm Password *</Label>
            <Input type="password" placeholder="Re-enter password" className="mt-1.5 h-12 text-base" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} />
          </div>
          <Button className="w-full h-12 text-base" onClick={handleRegister} disabled={submitting}>
            {submitting ? "Creating account..." : "Register"}
          </Button>
          <div className="text-center text-sm space-y-2">
            <p>Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link>
            </p>
            <p>
              <Link to="/customer/login" className="text-muted-foreground hover:underline">I'm a Customer →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerRegister;
