import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sprout, Phone, KeyRound, Lock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBusiness } from "@/contexts/BusinessContext";

const Login = () => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loginMethod, setLoginMethod] = useState<"otp" | "password">("otp");
  const { t, lang, setLang } = useLanguage();
  const { login } = useBusiness();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4">
            <Sprout className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">RuralBiz</h1>
          <p className="text-muted-foreground mt-1">{t("manage_business")}</p>
        </div>

        <div className="form-section">
          <div className="flex justify-end mb-4">
            <Select value={lang} onValueChange={(v) => setLang(v as "en" | "ta")}>
              <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">🇬🇧 English</SelectItem>
                <SelectItem value="ta">🇮🇳 தமிழ்</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {step === "phone" ? (
            <div className="space-y-4">
              <div>
                <Label className="text-base">{t("mobile_email")}</Label>
                <div className="relative mt-1.5">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder={t("enter_mobile_email")} className="pl-10 h-12 text-base" />
                </div>
              </div>

              {loginMethod === "password" && (
                <div>
                  <Label className="text-base">{t("password")}</Label>
                  <div className="relative mt-1.5">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type="password" placeholder={t("enter_password")} className="pl-10 h-12 text-base" />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal">{t("remember_me")}</Label>
              </div>

              {loginMethod === "otp" ? (
                <Button className="w-full h-12 text-base" onClick={() => setStep("otp")}>
                  {t("send_otp")}
                </Button>
              ) : (
                <Button className="w-full h-12 text-base" onClick={handleLogin}>
                  {t("login")}
                </Button>
              )}

              <Button variant="ghost" className="w-full text-sm"
                onClick={() => setLoginMethod(loginMethod === "otp" ? "password" : "otp")}>
                {loginMethod === "otp" ? t("login_password") : t("login_otp")}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label className="text-base">{t("enter_otp")}</Label>
                <div className="relative mt-1.5">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="6-digit OTP" className="pl-10 h-12 text-base tracking-widest" maxLength={6} />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{t("otp_sent")}</p>
              </div>
              <Button className="w-full h-12 text-base" onClick={handleLogin}>
                {t("verify_login")}
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setStep("phone")}>
                {t("change_number")}
              </Button>
            </div>
          )}

          <div className="mt-6 text-center text-sm">
            {t("no_account")}{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">{t("register")}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
