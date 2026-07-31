"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, Sparkles, Quote, PenLine, Feather } from "lucide-react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxVBOVyJAsvczQ02uKMHqeMY52EPcqEDV2NIfSRA7Fgji7z65Gvrf_xQsSycz2lm2gv/exec";

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("form");
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  // التحكم في شاشة التحميل (3 ثواني بالظبط)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setLoading(true);
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });

      setStep("thank-you");
      setName("");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } }
  };

  return (
    <div className="min-h-screen bg-[#faf9f8] flex items-center justify-center p-4 md:p-8 overflow-hidden" style={{ direction: 'rtl' }}>
      
      <AnimatePresence mode="wait">
        {showLoadingScreen ? (
          /* ================= اللودينج سكرين ================= */
          <motion.div
            key="loading-screen"
            exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#faf9f8]"
          >
            <div className="flex flex-col items-center">
              {/* أنيميشن القلبين اللي بيتقابلوا */}
              <div className="relative w-48 h-16 mb-4">
                
                {/* قلب العريس (بيبدأ من الشمال لليمين) */}
                <motion.div
                  initial={{ left: "0%", opacity: 0 }}
                  animate={{ left: "50%", opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  <Heart className="w-10 h-10 text-slate-800" />
                </motion.div>

                {/* القلب المندمج في النص (بيظهر لما يتقابلوا) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.4, 1], opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.6, type: "spring" }}
                  >
                    <Heart className="w-12 h-12 text-rose-500 fill-rose-500 drop-shadow-xl" />
                  </motion.div>
                </div>

                {/* قلب العروسة (بيبدأ من اليمين للشمال) */}
                <motion.div
                  initial={{ left: "100%", opacity: 0 }}
                  animate={{ left: "50%", opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  <Heart className="w-10 h-10 text-rose-400" />
                </motion.div>
                
              </div>

              {/* خط التحميل اللي بيكمل من الناحيتين */}
              <div className="w-48 h-1 bg-slate-200 rounded-full relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "50%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute left-0 top-0 bottom-0 bg-slate-800 rounded-r-full"
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "50%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute right-0 top-0 bottom-0 bg-rose-400 rounded-l-full"
                />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-slate-400 text-sm mt-6 font-medium tracking-wide"
              >
                جاري تجهيز الفرحة...
              </motion.p>
            </div>
          </motion.div>
        ) : (
          /* ================= محتوى الموقع الأساسي ================= */
          <motion.div
            key="main-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10"
          >
            {/* ديكورات خلفية ناعمة */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            {/* القسم الأيمن: الصورة والآية (Visuals) */}
            <div className="md:w-5/12 relative min-h-[250px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: "url('/hero.png')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
              
              <div className="relative z-10 p-8 text-center text-white flex flex-col items-center h-full justify-between py-10 md:py-12">
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <Heart className="w-8 h-8 text-rose-300 fill-rose-300/30 mx-auto mb-4 animate-pulse" />
                  <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 drop-shadow-lg">
                    إسلام <span className="text-rose-300 font-light mx-2">&</span> تسنيم
                  </h1>
                  <p className="text-white/80 tracking-widest text-sm uppercase">1 أغسطس 2026</p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="mt-8 space-y-4"
                >
                  <Quote className="w-6 h-6  mx-auto transform rotate-180 mb-2" />
                  <p className="text-lg md:text-xl leading-relaxed font-medium text-white/95 drop-shadow-md px-4">
                    "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً"
                  </p>
                  <p className="text-sm text-white/60 drop-shadow-md">سورة الروم</p>
                </motion.div>
              </div>
            </div>

            {/* القسم الأيسر: الفورم */}
            <div className="md:w-7/12 p-8 md:p-12 lg:p-16 relative flex flex-col justify-center bg-white/80 backdrop-blur-sm">
              <AnimatePresence mode="wait">
                {step === "form" ? (
                  <motion.div
                    key="form-view"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, x: -20 }}
                    className="w-full max-w-md mx-auto relative z-10"
                  >
                    <motion.div variants={itemVariants} className="text-center mb-10">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-50 text-rose-500 mb-4">
                        <Feather className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">بصمة وِد</h2>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        كلماتكم تصنع ذكرى لا تُنسى، اتركوا لنا جزءاً من قلوبكم هنا لنقرأها ونسعد بها.
                      </p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          الاسم الكريم
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="أدخل اسمك هنا..."
                            required
                            className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400/50 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                          />
                          <PenLine className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          أمنياتك للعرسان
                        </label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="اكتب تهنئتك، نصيحتك، أو دعوة حلوة من قلبك..."
                          rows={4}
                          required
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400/50 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400 resize-none"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="pt-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full relative group overflow-hidden bg-slate-900 hover:bg-slate-800 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
                        >
                          {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              <span className="relative z-10 text-base">إرسال التهنئة</span>
                              <Send className="w-4 h-4 relative z-10 transform group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                        </button>
                      </motion.div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-view"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-full max-w-md mx-auto text-center py-12"
                  >
                    <div className="relative inline-block mb-6">
                      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                        <Sparkles className="w-10 h-10 text-green-500" />
                      </div>
                      <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        transition={{ delay: 0.3, type: "spring" }}
                        className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm"
                      >
                      </motion.div>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-slate-800 mb-4">شكرا يا {submittedName}!</h3>
                    <p className="text-slate-600 text-lg leading-relaxed mb-8">
                      شكراً لكلماتك الرقيقة. تم حفظ رسالتك لتكون جزءاً من ذكرياتنا السعيدة في هذا اليوم.
                    </p>
                    <div className="flex justify-center bg-rose-50 px-6 py-3 rounded-full text-rose-600 font-medium text-sm">
                    <p className="text-sm text-rose-600 font-medium px-2">عقبال عندكم، ودمتم في مسرات</p>
                        <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />


                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-12 pt-6 border-t border-slate-100 text-center flex  justify-center gap-2 text-xs text-slate-400 relative z-10">
                <p className="flex items-center gap-1">
                صُنع بحب بواسطه
                  <a 
                    href="https://mostafa-s-portfolio.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-bold text-slate-600 hover:text-rose-500 transition-colors"
                  >
                    Mostafa Bahaa
                  </a>
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}