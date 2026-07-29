export type Service = {
  id: string;
  name: string;
  price: string;
  description: string;
};

export const SERVICES: Service[] = [
  { id: "bridal-makeup", name: "Bridal Makeup", price: "Starting ₹4,999", description: "Complete bridal look with premium products, tailored to your outfit and features." },
  { id: "reception-makeup", name: "Reception Makeup", price: "Starting ₹3,999", description: "Glamorous, camera-ready look designed for your reception evening." },
  { id: "engagement-makeup", name: "Engagement Makeup", price: "Starting ₹2,999", description: "Soft, romantic makeup that keeps you radiant throughout the ceremony." },
  { id: "party-makeup", name: "Party Makeup", price: "Starting ₹1,499", description: "Trendy party looks — from soft glam to bold statement styles." },
  { id: "saree-draping", name: "Saree Draping", price: "Starting ₹499", description: "Elegant saree draping in classic, Bengali, Gujarati and modern styles." },
  { id: "hairstyles", name: "Hairstyles (Bridal & Party)", price: "Starting ₹799", description: "Buns, braids, curls and floral hair styling for every occasion." },
  { id: "mehndi", name: "Mehndi (Bridal & Arabic)", price: "Arabic ₹50 · Bridal ₹1,500", description: "Intricate bridal, Arabic and Rajasthani mehndi designs." },
  { id: "facials-dtan", name: "Facials & D-Tan", price: "Starting ₹599", description: "Deep-cleansing facials and D-Tan treatments for radiant skin." },
  { id: "threading-waxing", name: "Threading & Waxing", price: "Starting ₹99", description: "Precise threading and gentle waxing with skin-safe products." },
  { id: "skincare", name: "Skin Care Treatments", price: "Starting ₹899", description: "Targeted treatments for glow, hydration and pigmentation." },
];