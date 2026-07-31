import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: "variable", // كدا هيحمل كل الأوزان معاك تلقائياً وبأعلى كفاءة
  variable: "--font-cairo",
});

export const metadata = {
  title: "فرح إسلام & تسنيم | بصمة وِد",
  description: "شاركونا فرحتنا واتركوا لنا ذكرى طيبة في يوم زفافنا.",
  icons: {
    icon: "/icon.png",
  },
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} scroll-smooth`}>
        
      <body className="font-sans bg-slate-50 text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}