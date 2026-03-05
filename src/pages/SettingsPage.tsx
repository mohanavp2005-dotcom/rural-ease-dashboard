import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { User, Lock, Languages, Moon, Database } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBusiness } from "@/contexts/BusinessContext";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { t, lang, setLang } = useLanguage();
  const { businessName } = useBusiness();

  const toggleDark = (enabled: boolean) => {
    setDarkMode(enabled);
    document.documentElement.classList.toggle("dark", enabled);
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-2xl">
      <h1 className="page-header">{t("settings")}</h1>

      <div className="form-section space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">{t("edit_profile")}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>{t("business_name")}</Label><Input className="mt-1.5 h-11" defaultValue={businessName} /></div>
          <div><Label>{t("owner_name")}</Label><Input className="mt-1.5 h-11" defaultValue="Krishna Kumar" /></div>
          <div><Label>{t("phone_number")}</Label><Input className="mt-1.5 h-11" defaultValue="9876543210" /></div>
          <div><Label>{t("location")}</Label><Input className="mt-1.5 h-11" defaultValue="Madurai, Tamil Nadu" /></div>
        </div>
        <Button className="h-11">{t("save_changes")}</Button>
      </div>

      <div className="form-section space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <Lock className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">{t("change_password")}</h2>
        </div>
        <div><Label>{t("current_password")}</Label><Input type="password" className="mt-1.5 h-11" /></div>
        <div><Label>{t("new_password")}</Label><Input type="password" className="mt-1.5 h-11" /></div>
        <div><Label>{t("confirm_password")}</Label><Input type="password" className="mt-1.5 h-11" /></div>
        <Button className="h-11">{t("update_password")}</Button>
      </div>

      <div className="form-section space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <Languages className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">{t("preferences")}</h2>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">{t("language")}</Label>
            <p className="text-sm text-muted-foreground">{t("choose_language")}</p>
          </div>
          <Select value={lang} onValueChange={(v) => setLang(v as "en" | "ta")}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ta">தமிழ்</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base flex items-center gap-2"><Moon className="h-4 w-4" /> {t("dark_mode")}</Label>
            <p className="text-sm text-muted-foreground">{t("dark_mode_desc")}</p>
          </div>
          <Switch checked={darkMode} onCheckedChange={toggleDark} />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base flex items-center gap-2"><Database className="h-4 w-4" /> {t("backup_restore")}</Label>
            <p className="text-sm text-muted-foreground">{t("backup_desc")}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">{t("backup")}</Button>
            <Button variant="outline" size="sm">{t("restore")}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
