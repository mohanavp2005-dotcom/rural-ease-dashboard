import { createContext, useContext, useState, ReactNode } from "react";

export type BusinessType = "dairy" | "poultry" | "grocery" | "farming" | "handicrafts";

interface BusinessContextType {
  businessType: BusinessType;
  setBusinessType: (t: BusinessType) => void;
  businessName: string;
  setBusinessName: (n: string) => void;
}

const BusinessContext = createContext<BusinessContextType>({
  businessType: "dairy",
  setBusinessType: () => {},
  businessName: "Krishna Dairy Farm",
  setBusinessName: () => {},
});

export function BusinessProvider({ children }: { children: ReactNode }) {
  const [businessType, setBusinessType] = useState<BusinessType>("dairy");
  const [businessName, setBusinessName] = useState("Krishna Dairy Farm");

  return (
    <BusinessContext.Provider value={{ businessType, setBusinessType, businessName, setBusinessName }}>
      {children}
    </BusinessContext.Provider>
  );
}

export const useBusiness = () => useContext(BusinessContext);
