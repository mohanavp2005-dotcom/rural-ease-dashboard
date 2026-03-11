import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout, Mail, Lock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const OwnerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { t, lang, setLang } = useLanguage();
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
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4">
            <Sprout className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">RuralBiz</h1>
          <p className="text-muted-foreground mt-1">Business Owner Login</p>
        </div>

        <div className="form-section space-y-4">
          <div className="flex justify-end mb-2">
            <Select value={lang} onValueChange={(v) => setLang(v as "en" | "ta")}>
              <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">🇬🇧 English</SelectItem>
                <SelectItem value="ta">🇮🇳 தமிழ்</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-base">Email</Label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="owner@email.com" className="pl-10 h-12 text-base" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div>
            <Label className="text-base">{t("password")}</Label>
            <div className="relative mt-1.5">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="password" placeholder="Enter password" className="pl-10 h-12 text-base" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          <Button className="w-full h-12 text-base" onClick={handleLogin} disabled={submitting}>
            {submitting ? "Signing in..." : t("login")}
          </Button>

          <div className="text-center text-sm space-y-2">
            <p>{t("no_account")}{" "}
              <Link to="/register" className="text-primary font-semibold hover:underline">{t("register")}</Link>
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

export default OwnerLogin;
