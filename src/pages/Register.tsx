import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sprout } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBusiness, BusinessType } from "@/contexts/BusinessContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const { t } = useLanguage();
  const { setBusinessType, setBusinessName } = useBusiness();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [type, setType] = useState<BusinessType>("dairy");

  const handleRegister = () => {
    if (!name.trim()) {
      toast({ title: "Please enter business name", variant: "destructive" });
      return;
    }
    setBusinessName(name);
    setBusinessType(type);
    toast({ title: t("register") + " ✅", description: "Please login to continue" });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4">
            <Sprout className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">{t("create_account")}</h1>
          <p className="text-muted-foreground mt-1">{t("register_business")}</p>
        </div>

        <div className="form-section space-y-4">
          <div>
            <Label className="text-base">{t("business_name")}</Label>
            <Input placeholder="e.g. Krishna Dairy Farm" className="mt-1.5 h-12 text-base" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label className="text-base">{t("owner_name")}</Label>
            <Input placeholder="Your full name" className="mt-1.5 h-12 text-base" />
          </div>
          <div>
            <Label className="text-base">{t("business_type")}</Label>
            <Select value={type} onValueChange={(v) => setType(v as BusinessType)}>
              <SelectTrigger className="mt-1.5 h-12 text-base"><SelectValue placeholder={t("select_type")} /></SelectTrigger>
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
            <Label className="text-base">{t("location")}</Label>
            <Input placeholder="Village / Town name" className="mt-1.5 h-12 text-base" />
          </div>
          <div>
            <Label className="text-base">{t("phone_number")}</Label>
            <Input placeholder="10-digit mobile" className="mt-1.5 h-12 text-base" />
          </div>
          <div>
            <Label className="text-base">{t("create_password")}</Label>
            <Input type="password" placeholder="Min 6 characters" className="mt-1.5 h-12 text-base" />
          </div>
          <div>
            <Label className="text-base">{t("confirm_password")}</Label>
            <Input type="password" placeholder="Re-enter password" className="mt-1.5 h-12 text-base" />
          </div>
          <Button className="w-full h-12 text-base" onClick={handleRegister}>{t("register")}</Button>
          <p className="text-center text-sm">
            {t("have_account")}{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">{t("login")}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
