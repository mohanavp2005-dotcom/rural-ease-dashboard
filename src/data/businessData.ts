import { BusinessType } from "@/contexts/BusinessContext";

export type ProductData = {
  id: number;
  name: string;
  category: string;
  qty: number;
  unit: string;
  cost: number;
  sell: number;
  minStock: number;
  emoji: string;
};

export type ExpenseData = {
  id: number;
  date: string;
  category: string;
  amount: number;
  mode: string;
  notes: string;
};

export type SaleData = {
  id: number;
  date: string;
  customer: string;
  product: string;
  qty: number;
  total: number;
  status: "Paid" | "Pending";
};

export const expenseCategories: Record<BusinessType, string[]> = {
  dairy: ["Feed", "Veterinary", "Electricity", "Transport", "Salary", "Equipment", "Other"],
  poultry: ["Feed", "Medicine", "Electricity", "Transport", "Salary", "Hatchery", "Other"],
  farming: ["Seeds", "Fertilizer", "Pesticide", "Water", "Labour", "Equipment", "Other"],
  handicrafts: ["Raw Material", "Tools", "Packaging", "Transport", "Salary", "Marketing", "Other"],
  grocery: ["Stock Purchase", "Electricity", "Rent", "Transport", "Salary", "Packaging", "Other"],
};

export const defaultProducts: Record<BusinessType, ProductData[]> = {
  dairy: [
    { id: 1, name: "Fresh Milk", category: "Dairy", qty: 50, unit: "liters", cost: 30, sell: 50, minStock: 10, emoji: "🥛" },
    { id: 2, name: "Paneer", category: "Dairy", qty: 5, unit: "kg", cost: 200, sell: 320, minStock: 8, emoji: "🧀" },
    { id: 3, name: "Curd", category: "Dairy", qty: 20, unit: "kg", cost: 40, sell: 60, minStock: 5, emoji: "🥣" },
    { id: 4, name: "Ghee", category: "Dairy", qty: 3, unit: "liters", cost: 400, sell: 600, minStock: 5, emoji: "🫙" },
    { id: 5, name: "Buttermilk", category: "Dairy", qty: 30, unit: "liters", cost: 10, sell: 20, minStock: 10, emoji: "🥤" },
    { id: 6, name: "Cheese", category: "Dairy", qty: 8, unit: "kg", cost: 300, sell: 450, minStock: 3, emoji: "🧀" },
  ],
  poultry: [
    { id: 1, name: "Country Eggs", category: "Eggs", qty: 200, unit: "pieces", cost: 6, sell: 10, minStock: 50, emoji: "🥚" },
    { id: 2, name: "Broiler Chicken", category: "Meat", qty: 30, unit: "kg", cost: 120, sell: 200, minStock: 10, emoji: "🍗" },
    { id: 3, name: "Farm Eggs (Tray)", category: "Eggs", qty: 15, unit: "pieces", cost: 150, sell: 220, minStock: 5, emoji: "🥚" },
    { id: 4, name: "Chicken Feed", category: "Feed", qty: 100, unit: "kg", cost: 25, sell: 35, minStock: 20, emoji: "🌾" },
  ],
  farming: [
    { id: 1, name: "Rice", category: "Grains", qty: 500, unit: "kg", cost: 20, sell: 35, minStock: 100, emoji: "🌾" },
    { id: 2, name: "Tomato", category: "Vegetables", qty: 80, unit: "kg", cost: 15, sell: 30, minStock: 20, emoji: "🍅" },
    { id: 3, name: "Onion", category: "Vegetables", qty: 120, unit: "kg", cost: 18, sell: 32, minStock: 30, emoji: "🧅" },
    { id: 4, name: "Coconut", category: "Fruits", qty: 200, unit: "pieces", cost: 15, sell: 30, minStock: 50, emoji: "🥥" },
  ],
  handicrafts: [
    { id: 1, name: "Handwoven Basket", category: "Baskets", qty: 12, unit: "pieces", cost: 150, sell: 350, minStock: 5, emoji: "🧺" },
    { id: 2, name: "Clay Pot", category: "Pottery", qty: 25, unit: "pieces", cost: 50, sell: 120, minStock: 8, emoji: "🏺" },
    { id: 3, name: "Silk Thread Work", category: "Textile", qty: 8, unit: "pieces", cost: 200, sell: 500, minStock: 3, emoji: "🧵" },
    { id: 4, name: "Wooden Toy", category: "Woodwork", qty: 15, unit: "pieces", cost: 80, sell: 200, minStock: 5, emoji: "🪆" },
  ],
  grocery: [
    { id: 1, name: "Rice (Ponni)", category: "Grains", qty: 200, unit: "kg", cost: 40, sell: 55, minStock: 50, emoji: "🍚" },
    { id: 2, name: "Sugar", category: "Essentials", qty: 80, unit: "kg", cost: 35, sell: 48, minStock: 20, emoji: "🍬" },
    { id: 3, name: "Cooking Oil", category: "Oil", qty: 40, unit: "liters", cost: 110, sell: 145, minStock: 10, emoji: "🫒" },
    { id: 4, name: "Tea Powder", category: "Beverages", qty: 25, unit: "kg", cost: 200, sell: 280, minStock: 5, emoji: "🍵" },
    { id: 5, name: "Dal", category: "Pulses", qty: 60, unit: "kg", cost: 80, sell: 110, minStock: 15, emoji: "🫘" },
  ],
};

export const defaultExpenses: Record<BusinessType, ExpenseData[]> = {
  dairy: [
    { id: 1, date: "2026-03-04", category: "Feed", amount: 1200, mode: "Cash", notes: "Cattle feed" },
    { id: 2, date: "2026-03-03", category: "Electricity", amount: 800, mode: "UPI", notes: "Monthly bill" },
    { id: 3, date: "2026-03-02", category: "Transport", amount: 500, mode: "Cash", notes: "Milk delivery" },
    { id: 4, date: "2026-03-01", category: "Salary", amount: 3000, mode: "Bank", notes: "Helper salary" },
  ],
  poultry: [
    { id: 1, date: "2026-03-04", category: "Feed", amount: 2500, mode: "Cash", notes: "Poultry feed 100kg" },
    { id: 2, date: "2026-03-03", category: "Medicine", amount: 600, mode: "UPI", notes: "Vaccines" },
    { id: 3, date: "2026-03-02", category: "Electricity", amount: 1200, mode: "Bank", notes: "Incubator power" },
  ],
  farming: [
    { id: 1, date: "2026-03-04", category: "Seeds", amount: 3000, mode: "Cash", notes: "Paddy seeds" },
    { id: 2, date: "2026-03-03", category: "Fertilizer", amount: 1800, mode: "UPI", notes: "Urea 50kg" },
    { id: 3, date: "2026-03-02", category: "Labour", amount: 2000, mode: "Cash", notes: "Harvest workers" },
  ],
  handicrafts: [
    { id: 1, date: "2026-03-04", category: "Raw Material", amount: 1500, mode: "Cash", notes: "Bamboo strips" },
    { id: 2, date: "2026-03-03", category: "Tools", amount: 800, mode: "UPI", notes: "New weaving tools" },
    { id: 3, date: "2026-03-02", category: "Packaging", amount: 300, mode: "Cash", notes: "Gift boxes" },
  ],
  grocery: [
    { id: 1, date: "2026-03-04", category: "Stock Purchase", amount: 8000, mode: "Bank", notes: "Weekly restock" },
    { id: 2, date: "2026-03-03", category: "Rent", amount: 5000, mode: "Bank", notes: "Shop rent" },
    { id: 3, date: "2026-03-02", category: "Electricity", amount: 1500, mode: "UPI", notes: "Monthly bill" },
  ],
};

export const defaultSales: Record<BusinessType, SaleData[]> = {
  dairy: [
    { id: 1, date: "2026-03-04", customer: "Ravi Kumar", product: "Fresh Milk", qty: 5, total: 250, status: "Paid" },
    { id: 2, date: "2026-03-04", customer: "Lakshmi Store", product: "Paneer", qty: 2, total: 640, status: "Pending" },
    { id: 3, date: "2026-03-03", customer: "Muthu", product: "Curd", qty: 3, total: 180, status: "Paid" },
  ],
  poultry: [
    { id: 1, date: "2026-03-04", customer: "Hotel Saravana", product: "Country Eggs", qty: 100, total: 1000, status: "Paid" },
    { id: 2, date: "2026-03-04", customer: "Meena Store", product: "Broiler Chicken", qty: 5, total: 1000, status: "Pending" },
    { id: 3, date: "2026-03-03", customer: "Karthik", product: "Farm Eggs", qty: 30, total: 300, status: "Paid" },
  ],
  farming: [
    { id: 1, date: "2026-03-04", customer: "Wholesale Mandi", product: "Rice", qty: 100, total: 3500, status: "Paid" },
    { id: 2, date: "2026-03-04", customer: "Local Market", product: "Tomato", qty: 30, total: 900, status: "Pending" },
    { id: 3, date: "2026-03-03", customer: "Supermarket", product: "Coconut", qty: 50, total: 1500, status: "Paid" },
  ],
  handicrafts: [
    { id: 1, date: "2026-03-04", customer: "Craft Store Delhi", product: "Silk Thread Work", qty: 3, total: 1500, status: "Paid" },
    { id: 2, date: "2026-03-04", customer: "Online Order", product: "Handwoven Basket", qty: 5, total: 1750, status: "Pending" },
    { id: 3, date: "2026-03-03", customer: "Tourist", product: "Clay Pot", qty: 4, total: 480, status: "Paid" },
  ],
  grocery: [
    { id: 1, date: "2026-03-04", customer: "Ramesh", product: "Rice (Ponni)", qty: 10, total: 550, status: "Paid" },
    { id: 2, date: "2026-03-04", customer: "Anitha", product: "Cooking Oil", qty: 2, total: 290, status: "Paid" },
    { id: 3, date: "2026-03-03", customer: "Kumar Tea Stall", product: "Tea Powder", qty: 5, total: 1400, status: "Pending" },
  ],
};

export const bestSellingByBusiness: Record<BusinessType, { name: string; sold: number; revenue: number }[]> = {
  dairy: [
    { name: "Fresh Milk", sold: 320, revenue: 16000 },
    { name: "Curd", sold: 180, revenue: 10800 },
    { name: "Paneer", sold: 45, revenue: 14400 },
  ],
  poultry: [
    { name: "Country Eggs", sold: 2000, revenue: 20000 },
    { name: "Broiler Chicken", sold: 150, revenue: 30000 },
    { name: "Farm Eggs", sold: 500, revenue: 11000 },
  ],
  farming: [
    { name: "Rice", sold: 1000, revenue: 35000 },
    { name: "Tomato", sold: 300, revenue: 9000 },
    { name: "Coconut", sold: 400, revenue: 12000 },
  ],
  handicrafts: [
    { name: "Silk Thread Work", sold: 20, revenue: 10000 },
    { name: "Clay Pot", sold: 50, revenue: 6000 },
    { name: "Handwoven Basket", sold: 30, revenue: 10500 },
  ],
  grocery: [
    { name: "Rice (Ponni)", sold: 500, revenue: 27500 },
    { name: "Cooking Oil", sold: 200, revenue: 29000 },
    { name: "Tea Powder", sold: 100, revenue: 28000 },
  ],
};

export const notificationsByBusiness: Record<BusinessType, { type: string; title: string; desc: string; time: string }[]> = {
  dairy: [
    { type: "stock", title: "Low Stock: Ghee", desc: "Only 3 liters remaining. Restock soon.", time: "10 min ago" },
    { type: "payment", title: "Payment Pending: Lakshmi Store", desc: "₹640 due for Paneer order.", time: "2 hours ago" },
    { type: "sales", title: "Daily Sales Summary", desc: "Today's total: ₹4,250 from 8 orders. Top: Fresh Milk.", time: "Today" },
    { type: "scheme", title: "Subsidy: Dairy Equipment", desc: "50% subsidy on milk processing equipment.", time: "3 days ago" },
  ],
  poultry: [
    { type: "stock", title: "Low Feed Stock", desc: "Chicken feed below 20kg threshold.", time: "30 min ago" },
    { type: "stock", title: "Mortality Alert", desc: "2 birds lost today. Check health conditions.", time: "1 hour ago" },
    { type: "sales", title: "Daily Egg Collection", desc: "320 eggs collected today. 50 more than yesterday.", time: "Today" },
    { type: "scheme", title: "Poultry Development Scheme", desc: "Govt subsidy for poultry farming expansion.", time: "2 days ago" },
  ],
  farming: [
    { type: "stock", title: "Fertilizer Low", desc: "Only 5kg urea remaining.", time: "1 hour ago" },
    { type: "payment", title: "Mandi Payment Pending", desc: "₹3,500 due from wholesale mandi.", time: "2 days ago" },
    { type: "sales", title: "Harvest Update", desc: "Rice harvest expected in 15 days.", time: "Today" },
    { type: "scheme", title: "PM-KISAN Installment", desc: "New installment of ₹2,000 available.", time: "1 day ago" },
  ],
  handicrafts: [
    { type: "stock", title: "Raw Material Low: Bamboo", desc: "Only 5 bundles remaining.", time: "2 hours ago" },
    { type: "payment", title: "Order Payment Pending", desc: "₹1,750 due from Craft Store Delhi.", time: "1 day ago" },
    { type: "sales", title: "New Online Order", desc: "3 baskets ordered from online store.", time: "3 hours ago" },
    { type: "scheme", title: "Handicraft Export Subsidy", desc: "Govt support for handicraft exporters.", time: "4 days ago" },
  ],
  grocery: [
    { type: "stock", title: "Expiring: Cooking Oil", desc: "5 liters expiring in 3 days.", time: "1 hour ago" },
    { type: "stock", title: "Low Stock: Sugar", desc: "Below minimum threshold of 20kg.", time: "3 hours ago" },
    { type: "sales", title: "Daily Summary", desc: "48 customers served today. Revenue ₹12,500.", time: "Today" },
    { type: "scheme", title: "MSME Loan Scheme", desc: "Low-interest loans for small grocery shops.", time: "2 days ago" },
  ],
};
