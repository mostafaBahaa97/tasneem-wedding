"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, RefreshCw, MessageCircle } from "lucide-react";

export default function GroomDashboard() {
  const [messages, setMessages] = useState([]);
  const [fetching, setFetching] = useState(true);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr; 
      
      return d.toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return dateStr;
    }
  };

  const fetchMessages = async () => {
    setFetching(true);
    try {
      // بنكلم الـ API الداخلي بتاعنا في Next.js لتخطي الـ CORS
      const res = await fetch('/api/messages', { cache: 'no-store' });
      const data = await res.json();
      
      if (data.error) {
        console.error(data.error);
        setMessages([]);
      } else {
        setMessages(data);
      }
    } catch (error) {
      console.error("Error loading messages:", error);
      setMessages([]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-12" style={{ direction: 'rtl' }}>
      
      {/* Dashboard Control Header */}
      <header className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between border-b border-slate-200 pb-6 mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center">
            <Heart className="w-5 h-5 fill-current text-rose-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-950">لوحة رسايل المعازيم</h1>
          </div>
        </div>

        <button
          onClick={fetchMessages}
          disabled={fetching}
          className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-xl text-sm font-semibold shadow-xs transition disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${fetching ? "animate-spin" : ""}`} />
          <span>تحديث الرسايل</span>
        </button>
      </header>

      {/* Feed Area */}
      <main className="max-w-5xl mx-auto">
        {fetching && messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-3">
            <div className="w-9 h-9 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
            <p className="text-slate-400 text-sm">جاري جلب الذكريات الجميلة من الشيت...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-24 bg-white border border-dashed border-slate-200 rounded-2xl">
            <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">الشيت فاضي حالياً، مفيش حد كتب رسايل لسه.</p>
          </div>
        ) : (
          <motion.div 
            layout 
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {messages.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* الديكور الشيك على الكارت */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-rose-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* الجزء العلوي: الاسم والتاريخ تحت بعض بشكل بسيط ونظيف */}
                  <div className="mb-4">
                    <span className="font-bold text-base text-slate-950 flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      {item.name}
                    </span>
                    <span className="text-xs text-slate-400 block font-medium">
                      {formatDate(item.date)}
                    </span>
                  </div>

                  {/* نص الرسالة وهو البطل الأساسي في الكارت */}
                  <p className="text-slate-700 text-base leading-relaxed font-medium whitespace-pre-line tracking-wide border-t border-slate-50 pt-4 mt-2">
                    "{item.message}"
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

    </div>
  );
}