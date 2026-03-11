import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const CustomerRegister = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
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
      full_name: fullName,
      phone,
      role: "customer",
    });
    setSubmitting(false);
    if (error) {
      toast({ title: error.message, variant: "destructive" });
    } else {
      toast({ title: "Account created! ✅" });
      navigate("/customer");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent mb-4">
            <ShoppingBag className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-3xl font-bold">Customer Registration</h1>
          <p className="text-muted-foreground mt-1">Create your shopping account</p>
        </div>

        <div className="form-section space-y-4">
          <div>
            <Label className="text-base">Full Name *</Label>
            <Input placeholder="Your full name" className="mt-1.5 h-12 text-base" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div>
            <Label className="text-base">Phone</Label>
            <Input placeholder="10-digit mobile" className="mt-1.5 h-12 text-base" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <Label className="text-base">Email *</Label>
            <Input placeholder="customer@email.com" className="mt-1.5 h-12 text-base" value={email} onChange={(e) => setEmail(e.target.value)} />
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
              <Link to="/customer/login" className="text-primary font-semibold hover:underline">Login</Link>
            </p>
            <p>
              <Link to="/login" className="text-muted-foreground hover:underline">← I'm a Business Owner</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegister;
