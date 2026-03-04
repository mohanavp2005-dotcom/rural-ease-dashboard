import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { User, Lock, Languages, Moon, Database } from "lucide-react";
import { useState } from "react";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = (enabled: boolean) => {
    setDarkMode(enabled);
    document.documentElement.classList.toggle("dark", enabled);
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-2xl">
      <h1 className="page-header">Settings</h1>

      <div className="form-section space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Edit Profile</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>Business Name</Label><Input className="mt-1.5" defaultValue="Krishna Dairy Farm" /></div>
          <div><Label>Owner Name</Label><Input className="mt-1.5" defaultValue="Krishna Kumar" /></div>
          <div><Label>Phone</Label><Input className="mt-1.5" defaultValue="9876543210" /></div>
          <div><Label>Location</Label><Input className="mt-1.5" defaultValue="Madurai, Tamil Nadu" /></div>
        </div>
        <Button>Save Changes</Button>
      </div>

      <div className="form-section space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <Lock className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Change Password</h2>
        </div>
        <div><Label>Current Password</Label><Input type="password" className="mt-1.5" /></div>
        <div><Label>New Password</Label><Input type="password" className="mt-1.5" /></div>
        <div><Label>Confirm Password</Label><Input type="password" className="mt-1.5" /></div>
        <Button>Update Password</Button>
      </div>

      <div className="form-section space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <Languages className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Preferences</h2>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Language</Label>
            <p className="text-sm text-muted-foreground">Choose your preferred language</p>
          </div>
          <Select defaultValue="en">
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
            <Label className="text-base flex items-center gap-2"><Moon className="h-4 w-4" /> Dark Mode</Label>
            <p className="text-sm text-muted-foreground">Switch to dark theme</p>
          </div>
          <Switch checked={darkMode} onCheckedChange={toggleDark} />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base flex items-center gap-2"><Database className="h-4 w-4" /> Backup & Restore</Label>
            <p className="text-sm text-muted-foreground">Export or import your business data</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Backup</Button>
            <Button variant="outline" size="sm">Restore</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
