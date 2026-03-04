import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sprout } from "lucide-react";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4">
            <Sprout className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-muted-foreground mt-1">Register your business</p>
        </div>

        <div className="form-section space-y-4">
          <div>
            <Label className="text-base">Business Name</Label>
            <Input placeholder="e.g. Krishna Dairy Farm" className="mt-1.5 h-11 text-base" />
          </div>
          <div>
            <Label className="text-base">Owner Name</Label>
            <Input placeholder="Your full name" className="mt-1.5 h-11 text-base" />
          </div>
          <div>
            <Label className="text-base">Business Type</Label>
            <Select>
              <SelectTrigger className="mt-1.5 h-11 text-base">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
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
            <Input placeholder="Village / Town name" className="mt-1.5 h-11 text-base" />
          </div>
          <div>
            <Label className="text-base">Phone Number</Label>
            <Input placeholder="10-digit mobile" className="mt-1.5 h-11 text-base" />
          </div>
          <div>
            <Label className="text-base">Create Password</Label>
            <Input type="password" placeholder="Min 6 characters" className="mt-1.5 h-11 text-base" />
          </div>

          <Button className="w-full h-11 text-base" asChild>
            <Link to="/dashboard">Register</Link>
          </Button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
