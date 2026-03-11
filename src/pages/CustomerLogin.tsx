import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Mail, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async () => {
    if (!email || !password) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      toast({ title: error.message, variant: "destructive" });
    } else {
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
          <h1 className="text-3xl font-bold">Customer Login</h1>
          <p className="text-muted-foreground mt-1">Shop from local businesses</p>
        </div>

        <div className="form-section space-y-4">
          <div>
            <Label className="text-base">Email</Label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="customer@email.com" className="pl-10 h-12 text-base" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div>
            <Label className="text-base">Password</Label>
            <div className="relative mt-1.5">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="password" placeholder="Enter password" className="pl-10 h-12 text-base" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          <Button className="w-full h-12 text-base" onClick={handleLogin} disabled={submitting}>
            {submitting ? "Signing in..." : "Login"}
          </Button>

          <div className="text-center text-sm space-y-2">
            <p>Don't have an account?{" "}
              <Link to="/customer/register" className="text-primary font-semibold hover:underline">Register</Link>
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

export default CustomerLogin;
