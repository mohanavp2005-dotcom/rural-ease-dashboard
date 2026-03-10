import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "ta";

const translations: Record<string, Record<Lang, string>> = {
  // Auth
  "login": { en: "Login", ta: "உள்நுழை" },
  "register": { en: "Register", ta: "பதிவு செய்க" },
  "mobile_email": { en: "Mobile Number / Email", ta: "மொபைல் / மின்னஞ்சல்" },
  "enter_mobile_email": { en: "Enter mobile or email", ta: "மொபைல் அல்லது மின்னஞ்சல் உள்ளிடுக" },
  "send_otp": { en: "Send OTP", ta: "OTP அனுப்பு" },
  "login_password": { en: "Login with Password", ta: "கடவுச்சொல்லுடன் உள்நுழை" },
  "login_otp": { en: "Login with OTP", ta: "OTP உடன் உள்நுழை" },
  "password": { en: "Password", ta: "கடவுச்சொல்" },
  "enter_password": { en: "Enter password", ta: "கடவுச்சொல் உள்ளிடுக" },
  "remember_me": { en: "Remember me", ta: "என்னை நினைவில் வை" },
  "verify_login": { en: "Verify & Login", ta: "சரிபார் & உள்நுழை" },
  "change_number": { en: "← Change number", ta: "← எண்ணை மாற்று" },
  "no_account": { en: "Don't have an account?", ta: "கணக்கு இல்லையா?" },
  "have_account": { en: "Already have an account?", ta: "ஏற்கனவே கணக்கு உள்ளதா?" },
  "enter_otp": { en: "Enter OTP", ta: "OTP உள்ளிடுக" },
  "otp_sent": { en: "OTP sent to your mobile/email", ta: "OTP உங்கள் மொபைலுக்கு அனுப்பப்பட்டது" },
  "manage_business": { en: "Manage your business simply", ta: "உங்கள் வணிகத்தை எளிதாக நிர்வகிக்கவும்" },
  "create_account": { en: "Create Account", ta: "கணக்கை உருவாக்கு" },
  "register_business": { en: "Register your business", ta: "உங்கள் வணிகத்தை பதிவு செய்யுங்கள்" },
  "business_name": { en: "Business Name", ta: "வணிக பெயர்" },
  "owner_name": { en: "Owner Name", ta: "உரிமையாளர் பெயர்" },
  "business_type": { en: "Business Type", ta: "வணிக வகை" },
  "location": { en: "Location", ta: "இடம்" },
  "phone_number": { en: "Phone Number", ta: "தொலைபேசி எண்" },
  "create_password": { en: "Create Password", ta: "கடவுச்சொல் உருவாக்கு" },
  "confirm_password": { en: "Confirm Password", ta: "கடவுச்சொல் உறுதிப்படுத்து" },
  "select_type": { en: "Select type", ta: "வகையை தேர்ந்தெடு" },

  // Nav
  "dashboard": { en: "Dashboard", ta: "டேஷ்போர்டு" },
  "expenses": { en: "Expenses", ta: "செலவுகள்" },
  "inventory": { en: "Inventory", ta: "சரக்கு" },
  "sales": { en: "Sales", ta: "விற்பனை" },
  "analytics": { en: "Analytics", ta: "பகுப்பாய்வு" },
  "online_store": { en: "Online Store", ta: "ஆன்லைன் கடை" },
  "notifications": { en: "Notifications", ta: "அறிவிப்புகள்" },
  "settings": { en: "Settings", ta: "அமைப்புகள்" },

  // Dashboard
  "todays_sales": { en: "Today's Sales", ta: "இன்றைய விற்பனை" },
  "todays_expenses": { en: "Today's Expenses", ta: "இன்றைய செலவுகள்" },
  "monthly_profit": { en: "Monthly Profit", ta: "மாத லாபம்" },
  "low_stock": { en: "Low Stock Items", ta: "குறைவான சரக்கு" },
  "pending_orders": { en: "Pending Orders", ta: "நிலுவை ஆர்டர்கள்" },
  "weekly_sales": { en: "Weekly Sales", ta: "வாராந்திர விற்பனை" },

  // Business specific
  "milk_production": { en: "Milk Production Today", ta: "இன்றைய பால் உற்பத்தி" },
  "milk_sold": { en: "Milk Sold Today", ta: "இன்று விற்ற பால்" },
  "cattle_feed": { en: "Cattle Feed Stock", ta: "கால்நடை தீவன இருப்பு" },
  "cattle_health": { en: "Cattle Health Status", ta: "கால்நடை ஆரோக்கியம்" },
  "total_birds": { en: "Total Birds Count", ta: "மொத்த பறவைகள்" },
  "eggs_today": { en: "Eggs Produced Today", ta: "இன்றைய முட்டை உற்பத்தி" },
  "feed_stock": { en: "Feed Stock Remaining", ta: "தீவன இருப்பு" },
  "mortality": { en: "Mortality Count", ta: "இறப்பு எண்ணிக்கை" },
  "current_crop": { en: "Current Crop", ta: "தற்போதைய பயிர்" },
  "fertilizer": { en: "Fertilizer Usage", ta: "உர பயன்பாடு" },
  "water_usage": { en: "Water Usage", ta: "நீர் பயன்பாடு" },
  "harvest": { en: "Harvest Prediction", ta: "அறுவடை கணிப்பு" },
  "products_created": { en: "Products Created Today", ta: "இன்று உருவாக்கிய பொருட்கள்" },
  "raw_material": { en: "Raw Material Stock", ta: "மூலப்பொருள் இருப்பு" },
  "orders_received": { en: "Orders Received", ta: "பெறப்பட்ட ஆர்டர்கள்" },
  "production_progress": { en: "Production Progress", ta: "உற்பத்தி முன்னேற்றம்" },
  "expiring_products": { en: "Expiring Products", ta: "காலாவதியாகும் பொருட்கள்" },
  "supplier_orders": { en: "Supplier Orders", ta: "சப்ளையர் ஆர்டர்கள்" },
  "daily_customers": { en: "Daily Customer Count", ta: "தினசரி வாடிக்கையாளர்" },

  // Expenses
  "add_expense": { en: "Add Expense", ta: "செலவு சேர்" },
  "date": { en: "Date", ta: "தேதி" },
  "category": { en: "Category", ta: "வகை" },
  "amount": { en: "Amount", ta: "தொகை" },
  "payment_mode": { en: "Payment Mode", ta: "பணம் செலுத்தும் முறை" },
  "notes": { en: "Notes", ta: "குறிப்புகள்" },
  "submit": { en: "Submit Expense", ta: "செலவு சமர்ப்பி" },
  "actions": { en: "Actions", ta: "செயல்கள்" },
  "mode": { en: "Mode", ta: "முறை" },

  // Inventory
  "add_product": { en: "Add Product", ta: "பொருள் சேர்" },
  "product_name": { en: "Product Name", ta: "பொருள் பெயர்" },
  "quantity": { en: "Quantity", ta: "அளவு" },
  "unit": { en: "Unit", ta: "அலகு" },
  "cost_price": { en: "Cost Price", ta: "செலவு விலை" },
  "selling_price": { en: "Selling Price", ta: "விற்பனை விலை" },
  "min_stock": { en: "Min Stock Alert", ta: "குறைந்தபட்ச இருப்பு எச்சரிக்கை" },
  "stock": { en: "Stock", ta: "இருப்பு" },
  "status": { en: "Status", ta: "நிலை" },
  "in_stock": { en: "In Stock", ta: "இருப்பில் உள்ளது" },
  "low_stock_label": { en: "Low Stock", ta: "குறைவான இருப்பு" },

  // Sales
  "new_sale": { en: "New Sale", ta: "புதிய விற்பனை" },
  "customer_name": { en: "Customer Name", ta: "வாடிக்கையாளர் பெயர்" },
  "product": { en: "Product", ta: "பொருள்" },
  "total_price": { en: "Total Price", ta: "மொத்த விலை" },
  "payment_status": { en: "Payment Status", ta: "கட்டண நிலை" },
  "add_sale": { en: "Add Sale", ta: "விற்பனை சேர்" },
  "generate_invoice": { en: "Generate Invoice", ta: "இரசீது உருவாக்கு" },
  "customer": { en: "Customer", ta: "வாடிக்கையாளர்" },
  "invoice": { en: "Invoice", ta: "இரசீது" },
  "view": { en: "View", ta: "காண்க" },
  "paid": { en: "Paid", ta: "செலுத்தப்பட்டது" },
  "pending": { en: "Pending", ta: "நிலுவை" },

  // Analytics
  "profit_analytics": { en: "Profit Analytics", ta: "லாப பகுப்பாய்வு" },
  "download_report": { en: "Download Report", ta: "அறிக்கை பதிவிறக்கு" },
  "monthly_profit_summary": { en: "Monthly Profit Summary", ta: "மாத லாப சுருக்கம்" },
  "expense_vs_income": { en: "Expense vs Income", ta: "செலவு vs வருமானம்" },
  "monthly_profit_trend": { en: "Monthly Profit Trend", ta: "மாத லாப போக்கு" },
  "best_selling": { en: "Best Selling Products", ta: "அதிகம் விற்பனையான பொருட்கள்" },
  "income": { en: "Income", ta: "வருமானம்" },

  // Online Store
  "products": { en: "Products", ta: "பொருட்கள்" },
  "cart": { en: "Cart", ta: "கூடை" },
  "add_to_cart": { en: "Add to Cart", ta: "கூடையில் சேர்" },
  "available": { en: "available", ta: "கிடைக்கும்" },
  "cart_empty": { en: "Your cart is empty", ta: "உங்கள் கூடை காலியாக உள்ளது" },
  "total": { en: "Total", ta: "மொத்தம்" },
  "checkout": { en: "Checkout", ta: "செலுத்து" },

  // Settings
  "edit_profile": { en: "Edit Profile", ta: "சுயவிவரம் திருத்து" },
  "change_password": { en: "Change Password", ta: "கடவுச்சொல் மாற்று" },
  "current_password": { en: "Current Password", ta: "தற்போதைய கடவுச்சொல்" },
  "new_password": { en: "New Password", ta: "புதிய கடவுச்சொல்" },
  "preferences": { en: "Preferences", ta: "விருப்பங்கள்" },
  "language": { en: "Language", ta: "மொழி" },
  "choose_language": { en: "Choose your preferred language", ta: "உங்கள் விருப்ப மொழியைத் தேர்வு செய்யவும்" },
  "dark_mode": { en: "Dark Mode", ta: "இருண்ட பயன்முறை" },
  "dark_mode_desc": { en: "Switch to dark theme", ta: "இருண்ட தீமுக்கு மாறு" },
  "backup_restore": { en: "Backup & Restore", ta: "காப்பு & மீட்டமை" },
  "backup_desc": { en: "Export or import your business data", ta: "உங்கள் வணிக தரவை ஏற்றுமதி அல்லது இறக்குமதி செய்யுங்கள்" },
  "backup": { en: "Backup", ta: "காப்பு" },
  "logout": { en: "Logout", ta: "வெளியேறு" },
  "restore": { en: "Restore", ta: "மீட்டமை" },
  "save_changes": { en: "Save Changes", ta: "மாற்றங்களை சேமி" },
  "update_password": { en: "Update Password", ta: "கடவுச்சொல் புதுப்பி" },
};

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const t = (key: string): string => {
    return translations[key]?.[lang] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
