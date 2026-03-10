import { createContext, useContext, useState, ReactNode } from "react";

export type BusinessType = "dairy" | "poultry" | "grocery" | "farming" | "handicrafts";

interface BusinessContextType {
  businessType: BusinessType;
  setBusinessType: (t: BusinessType) => void;
  businessName: string;
  setBusinessName: (n: string) => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const BusinessContext = createContext<BusinessContextType>({
  businessType: "dairy",
  setBusinessType: () => {},
  businessName: "",
  setBusinessName: () => {},
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export function BusinessProvider({ children }: { children: ReactNode }) {
  const [businessType, setBusinessType] = useState<BusinessType>(
    () => (localStorage.getItem("businessType") as BusinessType) || "dairy"
  );
  const [businessName, setBusinessName] = useState(
    () => localStorage.getItem("businessName") || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  const handleSetType = (t: BusinessType) => {
    setBusinessType(t);
    localStorage.setItem("businessType", t);
  };

  const handleSetName = (n: string) => {
    setBusinessName(n);
    localStorage.setItem("businessName", n);
  };

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <BusinessContext.Provider value={{
      businessType, setBusinessType: handleSetType,
      businessName, setBusinessName: handleSetName,
      isLoggedIn, login, logout,
    }}>
      {children}
    </BusinessContext.Provider>
  );
}

export const useBusiness = () => useContext(BusinessContext);
