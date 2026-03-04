import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sprout, Phone, KeyRound } from "lucide-react";

const Login = () => {
  const [step, setStep] = useState<"phone" | "otp">("phone");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4">
            <Sprout className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">Rural BizManager</h1>
          <p className="text-muted-foreground mt-1">Manage your business simply</p>
        </div>

        <div className="form-section">
          <div className="flex justify-end mb-4">
            <Select defaultValue="en">
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">🇬🇧 English</SelectItem>
                <SelectItem value="ta">🇮🇳 தமிழ்</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {step === "phone" ? (
            <div className="space-y-4">
              <div>
                <Label className="text-base">Mobile Number / Email</Label>
                <div className="relative mt-1.5">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Enter mobile or email" className="pl-10 h-11 text-base" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal">Remember me</Label>
              </div>
              <Button className="w-full h-11 text-base" onClick={() => setStep("otp")}>
                Send OTP
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label className="text-base">Enter OTP</Label>
                <div className="relative mt-1.5">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="6-digit OTP" className="pl-10 h-11 text-base tracking-widest" maxLength={6} />
                </div>
                <p className="text-sm text-muted-foreground mt-1">OTP sent to your mobile/email</p>
              </div>
              <Button className="w-full h-11 text-base" asChild>
                <Link to="/dashboard">Verify & Login</Link>
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setStep("phone")}>
                ← Change number
              </Button>
            </div>
          )}

          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
