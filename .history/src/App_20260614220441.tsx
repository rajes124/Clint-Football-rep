import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, 
  Send, 
  Sparkles, 
  Award, 
  Star, 
  MapPin, 
  Trophy, 
  Users, 
  Eye, 
  Image as ImageIcon, 
  Calendar, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Mail, 
  Menu, 
  CheckCircle2, 
  MousePointer2, 
  Flame, 
  Heart,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  Globe,
  Activity
} from "lucide-react";
import ParticleBackground from "./components/ParticleBackground";
import InteractiveShootout from "./components/InteractiveShootout";
import { BRAZIL_PLAYERS, TIMELINE_MOMENTS, GALLERY_ITEMS, ASSETS, Player } from "./data";

const EXTRA_PLAYER_STATS: Record<string, { speed: number; dribbling: number; shot: number; physical: number; passing: number }> = {
  pele: { speed: 92, dribbling: 96, shot: 99, physical: 89, passing: 95 },
  ronaldinho: { speed: 94, dribbling: 100, shot: 92, physical: 81, passing: 97 },
  ronaldo: { speed: 98, dribbling: 95, shot: 100, physical: 93, passing: 84 },
  neymar: { speed: 91, dribbling: 98, shot: 89, physical: 72, passing: 94 },
};

const FORMATIONS_DATA = {
  "1970": {
    name: "Classic Jogo Bonito 4-2-4",
    desc: "The legendary setup of Mexico 1970. Four attacking forwards with high fluidity, supported by Pelé's genius operating behind the front line.",
    keyStrength: "Unmatched attacking overload & extreme individual flair",
    players: [
      { num: 1, pos: "Felix (GK)", top: "86%", left: "50%" },
      { num: 4, pos: "C. Alberto", top: "70%", left: "15%" },
      { num: 2, pos: "Brito", top: "72%", left: "38%" },
      { num: 3, pos: "Piazza", top: "72%", left: "62%" },
      { num: 16, pos: "Everaldo", top: "70%", left: "85%" },
      { num: 5, pos: "Clodoaldo", top: "54%", left: "33%" },
      { num: 8, pos: "Gérson", top: "52%", left: "67%" },
      { num: 7, pos: "Jairzinho", top: "25%", left: "15%" },
      { num: 9, pos: "Tostão", top: "20%", left: "38%" },
      { num: 10, pos: "Pelé", top: "28%", left: "62%" },
      { num: 11, pos: "Rivelino", top: "25%", left: "85%" },
    ]
  },
  "1994": {
    name: "Tetra Balanced Quadrangle 4-2-2-2",
    desc: "Built by Carlos Alberto Parreira, this system secured the 1994 USA World Cup. Two rock-solid defensive shield midfielders protecting two playmakers, feeding the clinical duo Bebeto & Romário.",
    keyStrength: "Absolute central axis control & lethal counter-attacks",
    players: [
      { num: 1, pos: "Taffarel (GK)", top: "86%", left: "50%" },
      { num: 2, pos: "Jorginho", top: "70%", left: "15%" },
      { num: 13, pos: "Aldair", top: "72%", left: "38%" },
      { num: 15, pos: "Márcio Santos", top: "72%", left: "62%" },
      { num: 6, pos: "Branco", top: "70%", left: "85%" },
      { num: 5, pos: "Mauro Silva", top: "55%", left: "35%" },
      { num: 8, pos: "Dunga (C)", top: "55%", left: "65%" },
      { num: 9, pos: "Zinho", top: "42%", left: "30%" },
      { num: 17, pos: "Mazinho", top: "42%", left: "70%" },
      { num: 11, pos: "Romário", top: "22%", left: "35%" },
      { num: 20, pos: "Bebeto", top: "22%", left: "65%" },
    ]
  },
  "2002": {
    name: "Penta Fluid Pentagon 3-5-2",
    desc: "Luiz Felipe Scolari's tactical masterpiece of Korea/Japan 2002. A solid 3-man backline that unleashed wingbacks Cafu & Roberto Carlos, backed by Ronaldinho serving Rivaldo & top-scorer Ronaldo Nazário.",
    keyStrength: "Lethal wings & unguardable 'Three R' attacking trifecta",
    players: [
      { num: 1, pos: "Marcos (GK)", top: "86%", left: "50%" },
      { num: 3, pos: "Lúcio", top: "74%", left: "25%" },
      { num: 5, pos: "Edmílson", top: "76%", left: "50%" },
      { num: 4, pos: "Roque Júnior", top: "74%", left: "75%" },
      { num: 2, pos: "Cafu (C)", top: "45%", left: "10%" },
      { num: 6, pos: "R. Carlos", top: "45%", left: "90%" },
      { num: 8, pos: "G. Silva", top: "56%", left: "35%" },
      { num: 15, pos: "Kléberson", top: "54%", left: "65%" },
      { num: 11, pos: "Ronaldinho", top: "35%", left: "50%" },
      { num: 10, pos: "Rivaldo", top: "22%", left: "35%" },
      { num: 9, pos: "Ronaldo", top: "20%", left: "65%" },
    ]
  }
};

export default function App() {
  // Navigation & UI State
  const [activeSection, setActiveSection] = useState("hero");
  const hasAnimatedGlobal = useRef(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customCursor, setCustomCursor] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  // Dynamic Categories UI States
  const [fanCategory, setFanCategory] = useState<"legends" | "sovereignty" | "kit" | "tactics">("legends");
  const [selectedKit, setSelectedKit] = useState<"home" | "away" | "third">("home");
  const [jerseyName, setJerseyName] = useState("RISHI");
  const [jerseyNumber, setJerseyNumber] = useState("10");
  const [selectedTactics, setSelectedTactics] = useState<"1970" | "1994" | "2002">("1970");
  const [activeLegendId, setActiveLegendId] = useState("pele");
  const [selectedSovereigntyId, setSelectedSovereigntyId] = useState("moment-2");

  // Gallery Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Contact Form State
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState({ name: "", email: "", message: "" });
  const [formSuccess, setFormSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  // Interactive Spinning Football State
  const [ballRotationDegree, setBallRotationDegree] = useState(0);
  const [ballTouchCount, setBallTouchCount] = useState(0);

  // Track cursor position for custom cursor
  useEffect(() => {
    if (!customCursor) return;
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [customCursor]);

  // Handle active section outline on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "brazil-fan", "gallery", "timeline", "statistics", "interactive", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Form submit with validation
  const validateForm = () => {
    let valid = true;
    const errors = { name: "", email: "", message: "" };

    if (!formState.name.trim()) {
      errors.name = "Please enter your name.";
      valid = false;
    }
    if (!formState.email.trim()) {
      errors.email = "Please enter your email.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = "Please enter a valid email address.";
      valid = false;
    }
    if (!formState.message.trim()) {
      errors.message = "Please enter your message.";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSending(true);
    // Simulate API storage/send delay
    setTimeout(() => {
      setSending(false);
      setFormSuccess(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setFormSuccess(false), 5000);
    }, 1500);
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nextLightboxImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev < GALLERY_ITEMS.length - 1 ? prev + 1 : 0));
  };

  const prevLightboxImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : GALLERY_ITEMS.length - 1));
  };

  // Spinning soccer ball interaction
  const handleBallInteractions = () => {
    setBallRotationDegree((prev) => prev + 120);
    setBallTouchCount((prev) => prev + 1);
  };

  // FIXED REALTIME STAT COUNTER COMPONENT WITH TRIGGER LOCKS
  function StatCounter({ endValue, title, icon: Icon, delay = 0.1 }: { endValue: number; title: string; icon: any; delay?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement | null>(null);
    const hasAnimated = useRef(false); 

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true; // অ্যানিমেশন একবার শুরু হলে লক করে দেবে
            
            let startTime: number | null = null;
            const duration = 2000; // ২ সেকেন্ডের মসৃণ অ্যানিমেশন

            const stepAnimation = (timestamp: number) => {
              if (!startTime) startTime = timestamp;
              const progress = timestamp - startTime;
              const progressRatio = Math.min(progress / duration, 1);
              
              // Smooth Ease-out গাণিতিক ম্যাপিং 
              const easeOutQuad = progressRatio * (2 - progressRatio);
              const currentCount = Math.floor(easeOutQuad * endValue);
              
              setCount(currentCount);

              if (progress < duration) {
                window.requestAnimationFrame(stepAnimation);
              } else {
                setCount(endValue); // চূড়ান্ত সংখ্যা নিশ্চিত করার জন্য ফিক্স
              }
            };

            const delayTimeout = setTimeout(() => {
              window.requestAnimationFrame(stepAnimation);
            }, delay * 1000);

            return () => clearTimeout(delayTimeout);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) observer.unobserve(ref.current);
      };
    }, [endValue, delay]);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className="bg-white/[0.04] backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center relative group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pr-4 opacity-0 group-hover:opacity-100 duration-300" />
        <div className="w-14 h-14 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#FEDD00] group-hover:scale-110 transition-transform duration-300 shadow-md">
          <Icon className="w-6 h-6" />
        </div>
        <div className="mt-4 font-mono text-4xl lg:text-5xl font-extrabold text-yellow-400">
          {count}
          {endValue === 150 ? "+" : endValue === 50 ? "+" : ""}
        </div>
        <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-gray-300">
          {title}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white relative select-none">
      
      {/* Absolute floating micro particles and mouse glows */}
      <ParticleBackground />

      {/* Styled Custom Ball Cursor */}
      {customCursor && (
        <div
          className={`custom-cursor hidden md:block ${cursorHovered ? "custom-cursor-hover" : ""}`}
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
        />
      )}

      {/* Header Navigation Segment */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/[0.04] backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => scrollTo("hero")}
            onClickCapture={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#009739] to-[#FEDD00] border border-white/20 flex items-center justify-center text-white shadow-md shadow-amber-500/10 group-hover:rotate-12 transition-transform duration-300">
              <Trophy size={14} className="text-neutral-950 font-black" />
            </div>
            <div>
              <span className="font-display font-black tracking-tight text-white group-hover:text-[#FEDD00] transition-colors">
                M.T. AHMED
              </span>
              <p className="text-[10px] uppercase font-mono tracking-widest text-[#009739] flex items-center gap-1">
                Seleção Supporter <Star size={10} className="text-[#FEDD00] fill-[#FEDD00]" />
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {[
              { id: "hero", label: "Hero" },
              { id: "about", label: "About" },
              { id: "brazil-fan", label: "Brazil supporter" },
              { id: "gallery", label: "Arena gallery" },
              { id: "timeline", label: "Moments" },
              { id: "statistics", label: "Matchday stats" },
              { id: "interactive", label: "Shootout game" },
              { id: "contact", label: "Contact " },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className={`text-xs uppercase font-bold tracking-wider transition-all duration-300 ${
                  activeSection === link.id
                    ? "text-yellow-400 scale-105 border-b-2 border-yellow-400 pb-0.5"
                    : "text-gray-300 hover:text-emerald-400"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Custom controls & hamburger menu */}
          <div className="flex items-center gap-4">
            
            {/* Quick custom cursor switch */}
            <button
              onClick={() => setCustomCursor(!customCursor)}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="text-[10px] hidden md:flex items-center gap-1.5 opacity-60 hover:opacity-100 bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-500/20 transition-all text-gray-300"
              title="Toggle Football Cursor Trails"
            >
              <MousePointer2 size={11} className={customCursor ? "text-yellow-400 animate-bounce" : ""} />
              Cursor {customCursor ? "On" : "Off"}
            </button>

            {/* Mobile Nav Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="lg:hidden p-2 rounded-lg bg-emerald-950/40 hover:bg-emerald-900 border border-emerald-500/20 text-[#00933b]"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-slate-950 border-b border-emerald-950/80 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3">
                {[
                  { id: "hero", label: "Home Base" },
                  { id: "about", label: "Supporter Biography" },
                  { id: "brazil-fan", label: "Brazil Legends Hub" },
                  { id: "gallery", label: "Supporter Arena Gallery" },
                  { id: "timeline", label: "Iconic Memories" },
                  { id: "statistics", label: "Interactive Counter Stats" },
                  { id: "interactive", label: "Goal Shootout mini-game" },
                  { id: "contact", label: "Contact Messenger" },
                ].map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="block w-full text-left py-2 px-3 rounded-lg hover:bg-emerald-950/45 text-sm font-semibold text-gray-200 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Floating Call & WhatsApp Widgets */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        
        {/* Call Widget */}
        <motion.a
          href="tel:+8801928868741"
          onMouseEnter={() => setCursorHovered(true)}
          onMouseLeave={() => setCursorHovered(false)}
          className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-blue-500/30 hover:scale-110 active:scale-95 transition-all outline-none border border-blue-400"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          title="Call Md. Taskin Ahmed Directly"
        >
          <Phone className="w-5 h-5 animate-pulse" />
        </motion.a>

        {/* WhatsApp Supporter Widget */}
        <motion.a
          href="https://wa.me/8801928868741?text=Hello%20Taskin%20Ahmed,%20I%20visited%20your%20football%20website%20and%20would%20like%20to%20connect%20with%20you."
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setCursorHovered(true)}
          onMouseLeave={() => setCursorHovered(false)}
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-green-500/35 hover:scale-115 active:scale-95 transition-all outline-none border border-green-400 group relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          title="Chat on WhatsApp"
        >
          <div className="absolute -left-36 bg-black/80 px-3 py-1 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 duration-200 pointer-events-none uppercase tracking-widest font-bold">
            Chat on WhatsApp
          </div>
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.63-1.023-5.101-2.887-6.968C16.58 1.918 14.108.89 11.48.89c-5.44 0-9.866 4.418-9.87 9.852 0 1.698.441 3.354 1.282 4.811L1.85 21.75l6.415-1.683zM18.12 15.3c-.334-.167-1.977-.975-2.28-1.085-.303-.11-.524-.167-.745.167-.221.334-.856 1.085-1.049 1.307-.193.222-.387.25-.72.083-1.002-.502-1.96-1.12-2.73-1.791-.6-.523-1.05-1.169-1.168-1.37-.117-.2-.013-.309.087-.408.09-.09.199-.233.298-.35.1-.116.133-.2.2-.333.066-.134.033-.25-.017-.35-.05-.1-.442-1.066-.606-1.46-.16-.387-.335-.335-.46-.341-.12-.007-.257-.007-.394-.007s-.361.05-.55.25c-.187.2-1.745 1.706-1.745 4.16s1.785 4.814 2.034 5.147c.25.333 3.513 5.365 8.51 7.525 1.189.513 2.118.82 2.842 1.05 1.2.38 2.29.325 3.153.196.963-.144 1.97-.805 2.25-1.545.278-.74.278-1.37.194-1.505-.084-.135-.304-.216-.638-.383z" />
          </svg>
        </motion.a>
      </div>

      {/* Hero Section Master */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.95) 100%), url(${ASSETS.brazilStadium})`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Sup Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md"
            >
              <Trophy className="text-[#FEDD00] w-4 h-4 animate-bounce" />
              <span className="text-xs uppercase font-mono font-black tracking-widest text-[#FEDD00] flex items-center gap-1">
                Seleção Supporter Hub <Star size={10} className="text-[#FEDD00] fill-[#FEDD00]" />
              </span>
            </motion.div>

            {/* Main Greeting Typography */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="font-display text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-none capitalize"
              >
                Md. Taskin <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FEDD00] via-[#009739] to-emerald-400">Ahmed</span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-3 text-lg md:text-xl font-medium text-emerald-300"
              >
                <span className="flex items-center gap-1.5">Computer Science & Technology <Star size={12} className="text-[#FEDD00] fill-[#FEDD00]" /></span>
                <span className="hidden md:inline text-[#FEDD00]">•</span>
                <span className="text-[#FEDD00]">Tech Enthusiast</span>
              </motion.div>
            </div>

            {/* Supporter Slogan */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-gray-300 text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              &ldquo;Dream. Support. Celebrate.&rdquo; Supporting the legendary Brazil National Football Team is more than a casual hobby. It is an undying passion, a pure sports lifestyle, and a persistent drive for football perfection.
            </motion.p>

            {/* Quick Hero Target Contact CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6"
            >
              <button
                onClick={() => scrollTo("contact")}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className="px-8 py-3.5 rounded-sm bg-[#FEDD00] hover:bg-[#ffe338] text-neutral-950 font-black text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-xl shadow-yellow-500/10 cursor-pointer"
              >
                <Send size={15} />
                Contact Me
              </button>

              <a
                href="https://wa.me/8801928868741?text=Hello%20Taskin%20Ahmed,%20I%2520visited%2520your%2520football%2520website%2520and%2520would%2520like%2520to%2520connect%2520with%2520you."
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className="px-8 py-3.5 rounded-sm bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white font-black text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles size={15} className="text-[#FEDD00]" />
                WhatsApp Me
              </a>
            </motion.div>

            {/* Supporter Facts Banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex items-center gap-8 pt-8 border-t border-white/10 justify-center lg:justify-start text-xs font-mono text-gray-400"
            >
              <div>
                <span className="block text-white font-mono text-lg font-bold">5 STARS</span>
                Seleção supporters
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <span className="block text-white font-mono text-lg font-bold">DHAKA</span>
                Supporter Origin
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <span className="block text-white font-mono text-lg font-bold">JOGA BONITO</span>
                Football Ideologue
              </div>
            </motion.div>
          </div>

          {/* Hero Profile Photo Animation Right */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            
            {/* Sporty Corner Brackets for Hero Frame */}
            <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-[#FEDD00] pointer-events-none z-20" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-[#009739] pointer-events-none z-20" />

            {/* Visual Stadium Background Layer behind the avatar */}
            <div className="absolute w-[360px] h-[360px] md:w-[420px] md:h-[420px] rounded-full bg-white/[0.02] border-2 border-dashed border-white/10 flex items-center justify-center animate-spin" style={{ animationDuration: "35s" }}>
              <div className="absolute w-5 h-5 bg-[#FEDD00] rounded-full top-[10%] left-[10%] shadow-lg shadow-yellow-500/50" />
              <div className="absolute w-3 h-3 bg-emerald-400 rounded-full bottom-[20%] right-[10%]" />
              <div className="absolute w-4 h-4 bg-blue-500 rounded-full bottom-[10%] left-[25%]" />
            </div>

            {/* Rotating glowing halo rings */}
            <motion.div
              className="absolute w-[320px] h-[320px] md:w-[380px] md:h-[380px] rounded-full border-4 border-t-[#FEDD00] border-r-[#009739] border-b-white/5 border-l-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            {/* Glowing Stadium Backdrop Aura */}
            <div className="absolute inset-0 w-[240px] h-[240px] md:w-[300px] md:h-[300px] bg-gradient-to-r from-[#FEDD00] to-[#009739] filter blur-[70px] opacity-20 rounded-full" />

            {/* Floating Football Profile Frame Card */}
            <motion.div
              className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full overflow-hidden border-4 border-white/20 bg-cover bg-center shadow-2xl z-10 flex items-center justify-center"
              animate={{
                y: ["0px", "-15px", "0px"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src={ASSETS.taskinAvatar}
                alt="Md. Taskin Ahmed Profile Avatar"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                referrerPolicy="no-referrer"
              />
              
              {/* Brazil Supporter Overlay Badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 px-4 py-1.5 rounded-full border border-white/15 flex items-center gap-1">
                <span className="text-[10px] uppercase font-mono tracking-widest font-black text-[#FEDD00]">
                  Supporter Supporter 🇧🇷
                </span>
              </div>
            </motion.div>

            {/* Floating football elements */}
            <motion.div 
              className="absolute text-3xl md:text-4xl top-[5%] right-[5%] z-20"
              animate={{ y: [-10, 10, -10], rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              ⚽
            </motion.div>
            <motion.div 
              className="absolute text-2xl md:text-3xl bottom-[5%] left-[2%] z-20"
              animate={{ y: [10, -10, 10], rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              🏆
            </motion.div>
          </div>
        </div>

        {/* Stadium Floodlight Visual Effect Top */}
        <div className="absolute top-0 left-0 right-0 h-4 border-b border-white/10 bg-gradient-to-b from-[#009739]/5 to-transparent flex justify-around pointer-events-none z-20">
          <div className="w-16 h-1 bg-[#FEDD00] filter blur-sm animate-pulse" />
          <div className="w-16 h-1 bg-emerald-500 filter blur-sm" />
          <div className="w-16 h-1 bg-[#FEDD00] filter blur-sm animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="w-16 h-1 bg-emerald-500 filter blur-sm" />
          <div className="w-16 h-1 bg-[#FEDD00] filter blur-sm animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-xs uppercase tracking-widest font-black text-[#FEDD00] mb-2 flex items-center justify-center gap-1"
            >
              <Heart className="w-4 h-4 fill-[#FEDD00] text-[#FEDD00] animate-pulse" />
              Supporter Biography
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white capitalize"
            >
              The Story behind the Jogo Bonito devotion
            </motion.h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* About Illustration Left */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative rounded-2xl p-4 bg-white/[0.04] border border-white/10 backdrop-blur-md max-w-[340px] group overflow-hidden shadow-xl"
              >
                {/* Sports brackets inside card */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#FEDD00] pointer-events-none z-20" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#009739] pointer-events-none z-20" />

                <div className="absolute inset-0 bg-gradient-to-tr from-[#FEDD00]/5 to-transparent pr-4 opacity-0 group-hover:opacity-100 duration-300" />
                <img
                  src={ASSETS.footballAction}
                  alt="Soccer Celebration Silhouette"
                  className="rounded-xl w-full h-[360px] object-cover filter brightness-85 group-hover:brightness-100 transition-all duration-500 transform group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Micro Badge floating */}
                <div className="absolute top-8 right-8 bg-[#FEDD00] text-black px-3 py-1 rounded-sm text-[10px] font-mono tracking-wider font-extrabold shadow-md">
                  SUPPORTER SPOTLIGHT
                </div>
              </motion.div>
            </div>

            {/* About Glassmorphism Description Card Right */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Glassmorphism Story Card */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white/[0.06] backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative"
              >
                {/* Decorative Brackets */}
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#FEDD00] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#009739] pointer-events-none" />

                <div className="absolute -top-4 -left-4 w-12 h-12 bg-white/5 border border-white/15 rounded-full flex items-center justify-center text-xl text-yellow-300 backdrop-blur-md">
                  🇧🇷
                </div>

                <h4 className="font-display text-lg text-[#FEDD00] font-bold mb-4 uppercase tracking-wider">
                  Md. Taskin Ahmed
                </h4>
                
                <p className="text-gray-300 text-sm md:text-base leading-relaxed font-sans">
                  Md. Taskin Ahmed is a passionate football supporter and a dedicated fan of the Brazil National Football Team. Football is more than a game for him; it is a source of inspiration, excitement, and unforgettable memories.
                </p>

                <p className="text-gray-400 text-xs md:text-sm leading-relaxed mt-4">
                  For years, has tracked the tactical evolutions, historic world cup journeys, and iconic player profiles that compose the proud lineage of the Selecao. In a fast paced world, football remains his constant source of pure energy and active leisure.
                </p>

                {/* Info Pills Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
                  <div>
                    <span className="block text-[10px] uppercase text-[#009739] font-bold tracking-wider">Passion</span>
                    <span className="text-sm font-semibold text-white">Brazil Supporter</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-[#009739] font-bold tracking-wider">Nationality</span>
                    <span className="text-sm font-semibold text-white">Bangladeshi</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-[#009739] font-bold tracking-wider">Favorite Crest</span>
                    <span className="text-sm font-semibold text-white">CBF Amarelinha 💛</span>
                  </div>
                </div>
              </motion.div>

              {/* Fan Motto Spotlight */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  className="bg-white/[0.03] border border-white/10 p-4 rounded-xl flex items-start gap-3 backdrop-blur-sm"
                  whileHover={{ y: -4 }}
                >
                  <div className="bg-white/5 p-2.5 rounded-lg text-[#FEDD00] border border-white/10">
                    <Trophy size={16} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-white">Championship Faith</h5>
                    <p className="text-[11px] text-gray-400 mt-1">Believing in the Hexa (6th Title) since childhood days.</p>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white/[0.03] border border-white/10 p-4 rounded-xl flex items-start gap-3 backdrop-blur-sm"
                  whileHover={{ y: -4 }}
                >
                  <div className="bg-white/5 p-2.5 rounded-lg text-[#FEDD00] border border-white/10">
                    <Users size={16} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-white">Supporter lifestyle</h5>
                    <p className="text-[11px] text-gray-400 mt-1">Connecting with global fans, collecting jerseys, and organizing match viewings.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brazil Fan Section */}
      <section id="brazil-fan" className="py-24 bg-[#0a0a0a] border-t border-b border-white/10 relative overflow-hidden">
        
        {/* Animated Flag Canvas styling */}
        <div className="absolute top-[5%] right-[-10%] w-[350px] h-[250px] bg-gradient-to-br from-[#009739]/5 to-[#FEDD00]/3 opacity-30 transform -rotate-12 rounded-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-black text-[#FEDD00] mb-2 block font-display">
                Dedicated Fan Showcase 🇧🇷
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white capitalize">
                Brazil National Football Team History
              </h3>
            </div>
            
            {/* Tiny animated brazil flag badge */}
            <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1 rounded-full">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEDD00] animate-ping" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-yellow-400">Pentacampeão Pride</span>
            </div>
          </div>

          {/* Dynamic HUD Categories Navbar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white/[0.02] border border-white/5 p-2 rounded-xl mb-12 backdrop-blur-md">
            {[
              { id: "legends", label: "Legends Vault", desc: "Star Profile Analyzer", icon: Star, color: "text-amber-400" },
              { id: "sovereignty", label: "World Sovereignty", desc: "The Five Stars Story", icon: Trophy, color: "text-[#FEDD00]" },
              { id: "kit", label: "Samba Kit Studio", desc: "Print Your Own Jersey", icon: Award, color: "text-[#009739]" },
              { id: "tactics", label: "Tactical Arena", desc: "Championship Plays", icon: Activity, color: "text-blue-400" }
            ].map((cat) => {
              const IconComp = cat.icon;
              const isActive = fanCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setFanCategory(cat.id as any)}
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  className={`flex items-center gap-3 p-3.5 rounded-lg text-left transition-all relative overflow-hidden group cursor-pointer border ${
                    isActive 
                      ? "bg-white/[0.05] border-white/25 shadow-xl shadow-[#FEDD00]/5" 
                      : "bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/15"
                  }`}
                >
                  {/* Glowing background slider */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabGlow"
                      className="absolute inset-0 bg-gradient-to-r from-[#009739]/5 to-[#FEDD00]/10 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <div className={`p-2 rounded-md ${isActive ? "bg-white/10" : "bg-white/[0.02]"} transition-colors`}>
                    <IconComp size={18} className={cat.color} />
                  </div>
                  <div>
                    <span className={`text-xs font-black uppercase tracking-wider block ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                      {cat.label}
                    </span>
                    <span className="text-[9px] text-gray-500 uppercase font-mono tracking-widest mt-0.5 block">{cat.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dynamic Tab Panel Content */}
          <div className="min-h-[400px]">
            {/* Tab 1: Legends Vault */}
            {fanCategory === "legends" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Left: Star Picker List */}
                <div className="lg:col-span-4 flex flex-col gap-3">
                  <div className="mb-2">
                    <h4 className="text-xs font-mono uppercase text-[#009739] tracking-widest font-black">Select Legend Star</h4>
                    <p className="text-[11px] text-gray-400">Analyze the tactical profiles of historic icons.</p>
                  </div>
                  {BRAZIL_PLAYERS.map((player) => {
                    const isSelected = activeLegendId === player.id;
                    return (
                      <button
                        key={player.id}
                        onClick={() => setActiveLegendId(player.id)}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all group cursor-pointer ${
                          isSelected
                            ? "bg-[#009739]/10 border-[#009739] shadow-lg shadow-[#009739]/5"
                            : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/15"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/5 border border-white/10 shrink-0">
                            <img src={player.imageUrl} alt={player.nickname} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="text-[10.5px] font-mono text-[#FEDD00] block mb-0.5">N° {player.number}</span>
                            <span className="text-xs font-black uppercase text-white group-hover:text-[#FEDD00] transition-colors">{player.nickname}</span>
                          </div>
                        </div>
                        <span className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded ${
                          isSelected ? "bg-[#009739] text-white" : "bg-white/5 text-gray-400"
                        }`}>{player.role.split(" ")[0]}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Right: Detailed Live HUD Profile analyzer */}
                <div className="lg:col-span-8 bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden relative p-6 backdrop-blur-md flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#FEDD00] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#009739] pointer-events-none" />

                  {(() => {
                    const player = BRAZIL_PLAYERS.find((p) => p.id === activeLegendId) || BRAZIL_PLAYERS[0];
                    const stats = EXTRA_PLAYER_STATS[player.id] || { speed: 90, dribbling: 90, shot: 90, physical: 80, passing: 90 };
                    return (
                      <div className="space-y-6">
                        {/* Profile header */}
                        <div className="flex flex-col sm:flex-row gap-6 items-start">
                          <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#FEDD00]/60 shrink-0 bg-neutral-900 shadow-xl shadow-amber-500/10 relative">
                            <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover" />
                            <div className="absolute bottom-1 right-1 bg-black/80 text-[9px] font-mono font-bold text-[#FEDD00] px-1 py-0.5 rounded border border-white/10">N° {player.number}</div>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono tracking-widest text-[#009739] font-black uppercase">{player.role}</span>
                            <h3 className="font-display text-2xl font-black text-white">{player.name}</h3>
                            <p className="text-xs text-[#FEDD00] font-mono italic">"{player.nickname}" — {player.birthYear}</p>
                          </div>
                        </div>

                        {/* Bio brief */}
                        <div className="text-xs text-gray-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5 relative">
                          <span className="absolute top-2 right-2 text-3xl font-serif text-white/5 pointer-events-none">“</span>
                          {player.description}
                        </div>

                        {/* Attribute progress bars */}
                        <div className="space-y-3">
                          <h5 className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold">Live Skill Attributes</h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                              { label: "Samba Dribbling & Flair", val: stats.dribbling },
                              { label: "Pace / Speed Acceleration", val: stats.speed },
                              { label: "Lethal Finishing / Shot Power", val: stats.shot },
                              { label: "Samba Playmaking & Vision", val: stats.passing },
                            ].map((skill, idx) => (
                              <div key={idx} className="space-y-1 bg-white/[0.01] border border-white/5 p-2.5 rounded-lg">
                                <div className="flex justify-between items-center text-[11px]">
                                  <span className="text-gray-300 font-medium">{skill.label}</span>
                                  <span className="font-mono text-[#FEDD00] font-extrabold">{skill.val}%</span>
                                </div>
                                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.val}%` }}
                                    transition={{ duration: 1, delay: 0.1 }}
                                    className="h-full bg-gradient-to-r from-[#009739] to-[#FEDD00] rounded-full"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Trick showcase & modal trigger */}
                        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="text-xs">
                            <span className="text-[10px] font-mono uppercase text-gray-500 block">Active Signature Artistry:</span>
                            <span className="font-serif font-black text-emerald-300">{player.signatureMove}</span>
                          </div>
                          <button
                            onClick={() => setSelectedPlayer(player)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-gradient-to-r from-[#FEDD00] to-yellow-500 hover:from-yellow-500 hover:to-amber-500 text-neutral-950 text-xs font-black uppercase tracking-wider transition-all hover:scale-105 cursor-pointer shadow-lg"
                          >
                            <Sparkles size={11} className="animate-spin" /> Launch Career Showcase
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            )}

            {/* Tab 2: World Sovereignty */}
            {fanCategory === "sovereignty" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Five Star Selector Bar */}
                <div className="flex flex-wrap justify-center gap-2">
                  {TIMELINE_MOMENTS.map((moment) => {
                    const isSelected = selectedSovereigntyId === moment.id;
                    return (
                      <button
                        key={moment.id}
                        onClick={() => setSelectedSovereigntyId(moment.id)}
                        className={`px-5 py-3 rounded-xl border transition-all flex flex-col items-center gap-1 cursor-pointer ${
                          isSelected
                            ? "bg-gradient-to-r from-[#FEDD00]/15 to-yellow-500/10 border-[#FEDD00] shadow-lg shadow-yellow-500/5 text-white"
                            : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/15 text-gray-400 hover:text-white"
                        }`}
                      >
                        <span className="text-xl">⭐</span>
                        <span className="text-xs font-black font-mono">{moment.year}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Sovereignty Highlight HUD Box */}
                {(() => {
                  const moment = TIMELINE_MOMENTS.find(m => m.id === selectedSovereigntyId) || TIMELINE_MOMENTS[0];
                  return (
                    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden backdrop-blur-md">
                      {/* Big decorative year on back */}
                      <span className="absolute right-4 bottom-0 text-[100px] md:text-[180px] font-mono font-black text-white/[0.01] select-none leading-none pointer-events-none">
                        {moment.year}
                      </span>
                      
                      <div className="max-w-xl space-y-4 relative z-10">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/10 border border-yellow-500/30 px-3 py-1 rounded text-xs text-[#FEDD00] font-mono uppercase tracking-widest font-black">
                          <Trophy size={11} /> {moment.badge}
                        </div>

                        <div>
                          <p className="text-xs text-[#009739] uppercase font-mono tracking-widest font-bold">{moment.subtitle}</p>
                          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mt-1">{moment.title}</h3>
                        </div>

                        <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans">
                          {moment.description}
                        </p>

                        <div className="pt-4 border-t border-white/5 flex items-center gap-6">
                          <div>
                            <span className="text-[10px] uppercase font-mono text-gray-500">Host Country:</span>
                            <span className="block text-xs font-bold text-white mt-0.5">
                              {moment.subtitle.replace("World Cup ", "")}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-mono text-gray-500">Sovereign Level:</span>
                            <span className="block text-xs font-bold text-emerald-300 mt-0.5 flex items-center gap-1">
                              👑 King of World Football
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}

            {/* Tab 3: Kit Customizer */}
            {fanCategory === "kit" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                {/* Control Customize Panel */}
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-6 relative">
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#FEDD00] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#009739] pointer-events-none" />

                  <div>
                    <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">Uniform Print Customizer</h4>
                    <p className="text-xs text-gray-400 mt-1">Make your own custom Brazil supporter uniform print instantly.</p>
                  </div>

                  <div className="space-y-4">
                    {/* Input Player Name */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block pb-0.5">Print Player Name</label>
                      <input
                        type="text"
                        value={jerseyName}
                        onChange={(e) => setJerseyName(e.target.value.substring(0, 12).toUpperCase())}
                        placeholder="ENTER NAME"
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-xs font-mono text-white tracking-widest focus:outline-none focus:border-[#FEDD00] transition-colors"
                      />
                    </div>

                    {/* Input shirt number */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block pb-0.5">Squad Number</label>
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={jerseyNumber}
                        onChange={(e) => {
                          const val = e.target.value;
                          setJerseyNumber(val ? val.substring(0, 2) : "");
                        }}
                        placeholder="10"
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-xs font-mono text-white focus:outline-none focus:border-[#FEDD00] transition-colors"
                      />
                    </div>

                    {/* Uniform style selection */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block pb-0.5">Seleção Uniform Kit</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "home", label: "Canarinho I", color: "bg-[#FEDD00]" },
                          { id: "away", label: "Colonial II", color: "bg-blue-600" },
                          { id: "third", label: "Midnight III", color: "bg-[#0c0c0c] border border-white/20" },
                        ].map((kit) => (
                          <button
                            key={kit.id}
                            onClick={() => setSelectedKit(kit.id as any)}
                            className={`p-2.5 rounded-lg border text-[11px] font-black uppercase text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                              selectedKit === kit.id
                                ? "bg-white/10 border-white/30 text-[#FEDD00]"
                                : "bg-white/[0.01] border-white/5 text-gray-400 hover:text-white"
                            }`}
                          >
                            <span className={`w-2.5 h-2.5 rounded-full ${kit.color} shrink-0`} />
                            {kit.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 text-[11px] text-gray-500 leading-relaxed font-mono">
                    ✦ This jersey print tool is rendered vector-natively. Experience extreme athletic precision custom support.
                  </div>
                </div>

                {/* Right: Interactive 3D CSS Shirt Preview */}
                <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 relative flex items-center justify-center h-96 overflow-hidden shadow-2xl shadow-emerald-500/5">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#009739]/10 to-transparent pointer-events-none" />
                  <div className="absolute top-[40%] left-0 right-0 h-[1px] bg-white/5 pointer-events-none" />
                  <div className="absolute top-[20%] left-[20%] right-[20%] bottom-[20%] border border-white/5 rounded-full pointer-events-none" />

                  {/* Jersey Vector Hanging Card Shape */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className={`w-64 h-80 rounded-xl flex flex-col justify-between p-6 relative shadow-2xl scale-105 border ${
                      selectedKit === "home"
                        ? "bg-[#FEDD00] text-[#009739] border-[#FEDD00]/20"
                        : selectedKit === "away"
                        ? "bg-blue-600 text-white border-blue-600/20"
                        : "bg-[#0c0c0c] text-[#FEDD00] border-white/10"
                    }`}
                  >
                    {/* Collar sew detailing */}
                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 rounded-b-full z-10 ${
                      selectedKit === "home" ? "bg-[#009739]" : selectedKit === "away" ? "bg-yellow-400" : "bg-[#1c1c1c] border-b border-yellow-500"
                    }`} />

                    {/* Left & Right sleeve cuffs sleeve design */}
                    <div className={`absolute left-0 top-12 w-3 h-10 rounded-r-lg ${
                      selectedKit === "home" ? "bg-[#009739]" : selectedKit === "away" ? "bg-yellow-400" : "bg-yellow-500"
                    }`} />
                    <div className={`absolute right-0 top-12 w-3 h-10 rounded-l-lg ${
                      selectedKit === "home" ? "bg-[#009739]" : selectedKit === "away" ? "bg-yellow-400" : "bg-yellow-500"
                    }`} />

                    {/* Chest CBF Crest detailing */}
                    <div className="flex justify-between items-start mt-2">
                      <div className="flex flex-col items-center">
                        <Star size={7} className="fill-current text-current mb-0.5" />
                        <div className="text-[8px] font-black tracking-widest border border-current px-1 rounded-sm leading-none">CBF</div>
                        {/* 5 world cups stars */}
                        <div className="flex items-center gap-0.5 mt-1">
                          {[1, 2, 3, 4, 5].map(st => (
                            <Star key={st} size={4} className="fill-current" />
                          ))}
                        </div>
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-widest font-black opacity-85">DRI-FIT</div>
                    </div>

                    {/* Big Print properties */}
                    <div className="text-center flex-1 flex flex-col items-center justify-center -mt-2">
                      <span className={`text-xs uppercase tracking-widest font-mono font-black scale-y-110 leading-none mb-1 block block-print mx-auto ${
                        selectedKit === "third" ? "text-yellow-400" : ""
                      }`}>
                        {jerseyName || "SUPPORTER"}
                      </span>
                      <span className={`text-[100px] leading-none font-sans font-black tracking-tighter ${
                        selectedKit === "third" ? "text-white" : ""
                      }`}>
                        {jerseyNumber || "10"}
                      </span>
                    </div>

                    {/* Sponsor and footer seals */}
                    <div className="border-t border-current/10 pt-2 flex justify-between items-center text-[8px] font-black tracking-widest opacity-90">
                      <span>OFFICIAL FAN HUBS</span>
                      <span>AMARELINHA</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Tab 4: Tactical Arena */}
            {fanCategory === "tactics" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Tactical board controllers */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="mb-2">
                    <h4 className="text-sm font-display font-black text-white uppercase tracking-wider">Tactical Hub Masterclass</h4>
                    <p className="text-xs text-gray-400">Interact with tactical formations that changed football history.</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    {[
                      { id: "1970", label: "Mexico 1970 (4-2-4)", desc: "Fluid attacking Samba masterwork" },
                      { id: "1994", label: "USA 1994 (4-2-2-2)", desc: "Symmetric Defensive Shield" },
                      { id: "2002", label: "Korea/Japan 2002 (3-5-2)", desc: "Mighty Wingbacks & Three R's" },
                    ].map((play) => (
                      <button
                        key={play.id}
                        onClick={() => setSelectedTactics(play.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedTactics === play.id
                            ? "bg-[#009739]/10 border-[#009739] shadow-lg shadow-[#009739]/0 mx-0.5 pb-2 text-white"
                            : "bg-white/[0.01] border-white/5 text-gray-400 hover:text-white hover:border-white/10"
                        }`}
                      >
                        <span className="text-xs font-black uppercase block">{play.label}</span>
                        <span className="text-[10px] text-gray-400 font-mono mt-0.5 block">{play.desc}</span>
                      </button>
                    ))}
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl text-xs space-y-2 leading-relaxed">
                    <p className="font-bold text-white uppercase font-mono tracking-wider text-[11px] text-[#009739]">System Tactics Summary:</p>
                    <p className="text-gray-300">{FORMATIONS_DATA[selectedTactics].desc}</p>
                    <p className="text-[#FEDD00] font-bold mt-1 text-[11px]">✦ Key strength: {FORMATIONS_DATA[selectedTactics].keyStrength}</p>
                  </div>
                </div>

                {/* Orthographic virtual pitch layout */}
                <div className="lg:col-span-8 bg-[#040404] border border-white/10 rounded-2xl overflow-hidden p-6 md:p-8 relative flex flex-col justify-between shadow-2xl h-[420px]">
                  <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 to-[#040404] pointer-events-none" />
                  
                  {/* Grass soccer field relative layer */}
                  <div className="w-full h-full relative rounded-xl border border-white/10 bg-emerald-900/5 overflow-hidden">
                    {/* Centered lines, goal marks */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-10 border-b border-l border-r border-white/15" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-10 border-t border-l border-r border-white/15" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/15 rounded-full" />
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/15" />

                    {/* Animated coordinates players nodes */}
                    <AnimatePresence>
                      {FORMATIONS_DATA[selectedTactics].players.map((node) => (
                        <motion.div
                          key={node.pos}
                          layout
                          className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-[#009739] to-emerald-600 hover:from-[#FEDD00] hover:to-amber-500 border-2 border-white/80 shadow-lg flex items-center justify-center text-white hover:text-neutral-950 font-black font-mono text-[9px] cursor-help group z-10 transition-colors"
                          style={{
                            top: node.top,
                            left: node.left,
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          {node.num}
                          {/* Hover display popup player name */}
                          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/95 text-white text-[9px] border border-white/15 py-1 px-2.5 rounded shadow-xl uppercase font-mono tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
                            {node.pos}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Legend modal selection dialog detail */}
        <AnimatePresence>
          {selectedPlayer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className="bg-[#0c0c0c] border border-white/15 max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl relative backdrop-blur-xl"
              >
                {/* Decorative Corner Brackets */}
                <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#FEDD00] pointer-events-none z-30" />
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#009739] pointer-events-none z-30" />

                {/* Header Close button */}
                <button
                  onClick={() => setSelectedPlayer(null)}
                  className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black text-gray-100 border border-white/15 cursor-pointer"
                >
                  <X size={16} />
                </button>

                {/* Cover space inside the dialog */}
                <div className="relative h-56 bg-slate-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent z-15" />
                  <img
                    src={selectedPlayer.imageUrl}
                    alt={selectedPlayer.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="absolute bottom-5 left-6 right-6 z-20">
                    <span className="text-xs font-mono font-extrabold uppercase text-[#FEDD00] tracking-widest block">
                      {selectedPlayer.nickname} • N° {selectedPlayer.number}
                    </span>
                    <h4 className="font-display text-2xl font-black text-white">
                      {selectedPlayer.name}
                    </h4>
                    <p className="text-xs font-mono text-gray-400 mt-1">
                      Born: {selectedPlayer.birthYear}
                    </p>
                  </div>
                </div>

                {/* Dialog Information Core */}
                <div className="p-6 space-y-6">
                  <div>
                    <h5 className="text-[10px] uppercase font-mono tracking-widest text-[#009739] font-black mb-1">Role / Position</h5>
                    <p className="text-sm text-gray-200">{selectedPlayer.role}</p>
                  </div>

                  <div>
                    <h5 className="text-[10px] uppercase font-mono tracking-widest text-[#009739] font-black mb-2">Key Career Achievements</h5>
                    <ul className="space-y-2">
                      {selectedPlayer.achievements.map((ach, idx) => (
                        <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                          <span className="text-[#FEDD00] font-mono">✦</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs text-gray-400">
                    <div>
                      <span className="block text-[10px] uppercase font-mono text-[#009739]">Signature Trick:</span>
                      <strong className="text-white font-serif">{selectedPlayer.signatureMove}</strong>
                    </div>

                    <button
                      onClick={() => setSelectedPlayer(null)}
                      className="px-4 py-1.5 rounded-sm bg-[#FEDD00] hover:bg-[#ffe338] text-[#050505] text-xs font-bold transition-all cursor-pointer"
                    >
                      Close Profile
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Football Arena Gallery */}
      <section id="gallery" className="py-24 bg-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-black text-[#FEDD00] mb-2 block font-display flex items-center justify-center gap-1">
              <ImageIcon size={14} className="text-[#FEDD00]" /> Supporter Stadium Moments
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white capitalize">
              Football Supporter Atmosphere
            </h3>
            <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto">
              Md. Taskin Ahmed collects matchday photography representing the visual noise and vibrant crowd atmosphere of Brazilian stadiums.
            </p>
          </div>

          {/* Masonry Grid with elegant hover zoom */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {GALLERY_ITEMS.map((item, idx) => (
              <motion.div
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className="break-inside-avoid bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden cursor-pointer relative group shadow-lg backdrop-blur-sm hover:border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Micro brackets shown only on card hover */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#FEDD00]/70 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#009739]/70 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                <div className="relative overflow-hidden bg-[#0a0a0a] min-h-[160px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 duration-300 z-10 transition-opacity" />
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-108"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Absolute subtle zoom icon */}
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 p-2 rounded-full border border-white/15 text-[#FEDD00]">
                    <Eye size={14} />
                  </div>
                </div>

                {/* Subtitle brief details visible on hover or mobile */}
                <div className="p-4">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#009739] font-black rounded-sm bg-white/5 border border-white/10 px-2.5 py-0.5">
                    {item.category}
                  </span>
                  <h4 className="font-display font-bold text-sm text-white mt-2 group-hover:text-[#FEDD00] transition-all">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 truncate mt-1">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Photo Lightbox Dialog Component */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
            >
              {/* Top controls */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-55">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                  Matchday Supporter Experience ({lightboxIndex + 1} / {GALLERY_ITEMS.length})
                </span>
                
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 ml-auto rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 cursor-pointer"
                  title="Close Lightbox"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Central carousel navigation */}
              <div className="flex items-center w-full max-w-5xl justify-between gap-4 mt-12">
                
                {/* Left Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevLightboxImage();
                  }}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/15 text-white transition-all hover:scale-105"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Massive Slide Image Display */}
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="max-h-[70vh] max-w-[80vw] flex flex-col items-center justify-center relative rounded-xl overflow-hidden border border-white/15"
                >
                  <img
                    src={GALLERY_ITEMS[lightboxIndex].imageUrl}
                    alt={GALLERY_ITEMS[lightboxIndex].title}
                    className="max-h-[60vh] w-auto max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Photo Description overlay */}
                  <div className="w-full bg-black/90 p-4 border-t border-white/10 text-center">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#FEDD00] font-bold">
                      {GALLERY_ITEMS[lightboxIndex].category}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">
                      {GALLERY_ITEMS[lightboxIndex].title}
                    </h3>
                    <p className="text-xs text-gray-300 mt-1 text-center max-w-md mx-auto">
                      {GALLERY_ITEMS[lightboxIndex].description}
                    </p>
                  </div>
                </motion.div>

                {/* Right Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextLightboxImage();
                  }}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/15 text-white transition-all hover:scale-105"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Mini Gallery Index Thumbnails */}
              <div className="flex gap-2.5 mt-8 overflow-x-auto max-w-lg px-4 py-2">
                {GALLERY_ITEMS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setLightboxIndex(idx)}
                    className={`h-12 w-16 rounded overflow-hidden flex-shrink-0 opacity-40 hover:opacity-100 transition-all border-2 ${
                      lightboxIndex === idx ? "border-[#FEDD00] scale-105 opacity-100" : "border-transparent"
                    }`}
                  >
                    <img src={item.imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Favorite Football Moments (Timeline Section) */}
      <section id="timeline" className="py-24 bg-[#0a0a0a] border-t border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs uppercase tracking-widest font-black text-[#FEDD00] mb-2 block font-display flex items-center justify-center gap-1.5">
              <Calendar size={14} className="text-[#FEDD00]" />
              Iconic Supporter Timeline
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white capitalize">
              Legendary Brazil World Cup Memories
            </h3>
            <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto">
              A historical chronicle of the iconic milestones in Brazil Football history that inspired Md. Taskin Ahmed’s football support pathway.
            </p>
          </div>

          {/* Timeline center line */}
          <div className="relative border-l border-white/10 max-w-3xl mx-auto pl-6 sm:pl-10 space-y-12">
            
            {TIMELINE_MOMENTS.map((moment, idx) => (
              <motion.div
                key={moment.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative group pb-4"
              >
                {/* Timeline Node Point wrapper on left */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-neutral-900 border-2 border-[#FEDD00] group-hover:bg-[#FEDD00] group-hover:scale-125 duration-300 z-10" />
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#FEDD00]/20 animate-ping" />

                {/* Timeline Card */}
                <div 
                  className="bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 hover:border-[#FEDD00]/30 transition-all duration-300 relative overflow-hidden"
                  style={{
                    boxShadow: `0 8px 30px -10px ${moment.glowColor || "rgba(0,0,0,0.5)"}`,
                  }}
                >
                  <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#FEDD00]/45 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#009739]/45 pointer-events-none" />

                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
                    <div>
                      {/* Year badge */}
                      <span className="font-mono text-2xl font-black text-[#FEDD00] tracking-tight block">
                        {moment.year}
                      </span>
                      <h4 className="font-display font-bold text-lg text-white mt-1 group-hover:text-yellow-300 transition-colors">
                        {moment.title}
                      </h4>
                      <p className="text-xs text-emerald-400 font-mono tracking-wider">{moment.subtitle}</p>
                    </div>

                    <span className="text-[10px] font-mono tracking-widest uppercase font-black text-[#FEDD00] bg-white/5 border border-white/10 px-3 py-1 rounded-sm shrink-0 flex items-center gap-1">
                      <Star size={11} className="text-[#FEDD00] fill-[#FEDD00]" />
                      {moment.badge}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans mt-3">
                    {moment.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics counters Section */}
      <section id="statistics" className="py-20 bg-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-black text-emerald-400 mb-2 block font-display">
              Supporter Metric Board
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white capitalize">
            Taskin Ahmed&apos;s Football supporters In Numbers
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCounter endValue={5} title="World Cup Titles Supported" icon={Trophy} delay={0.1} />
            <StatCounter endValue={4} title="Legendary Key Players Cataloged" icon={Users} delay={0.2} />
            <StatCounter endValue={150} title="Memorable Matches Watched" icon={Flame} delay={0.3} />
            <StatCounter endValue={50} title="Supporter Memories & Memorabilia" icon={Award} delay={0.4} />
          </div>
        </div>
      </section>

      {/* Interactive Football Section */}
      <section id="interactive" className="py-24 bg-[#0a0a0a] border-t border-b border-white/10 relative overflow-hidden">
        
        {/* Floating background lighting controllers */}
        <div className="absolute top-[8%] left-[10%] w-px h-[300px] bg-gradient-to-b from-[#FEDD00]/20 to-transparent pointer-events-none" />
        <div className="absolute top-[8%] right-[10%] w-px h-[300px] bg-gradient-to-b from-[#009739]/20 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-black text-yellow-400 mb-2 block font-display">
              Interactive Arena
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white capitalize">
              Unleash the Samba Football Energy
            </h3>
            <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto">
              Interact with the rotating football, customize the stadium floodlighting controls below, or play the shootout challenge to verify your accuracy!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Spinning Football interaction side */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center space-y-6">
              
              <div className="text-xs uppercase tracking-widest text-[#009739] font-mono font-bold">
                Spinning Supporter Crest Ball
              </div>

              {/* Hover rotation ball container */}
              <motion.div
                onClick={handleBallInteractions}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className="w-48 h-48 rounded-full bg-gradient-to-br from-[#FEDD00] to-[#009739] p-0.5 flex items-center justify-center cursor-pointer shadow-2xl relative group overflow-hidden"
                style={{
                  boxShadow: "0 10px 40px -10px rgba(0, 151, 57, 0.4)"
                }}
                whileHover={{ scale: 1.05 }}
                animate={{ rotate: ballRotationDegree }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
              >
                {/* Visual soccer segments */}
                <div className="w-full h-full rounded-full bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute w-[110%] h-[110%] border-4 border-dashed border-white/10 rounded-full animate-spin" style={{ animationDuration: "14s" }} />
                  <Trophy size={32} className="text-[#FEDD00]" />
                  <span className="text-[12px] font-mono font-black text-[#009739] tracking-wider block mt-2">
                    GOLD CUP SPINNER
                  </span>
                  <span className="text-[9px] text-gray-400 uppercase font-mono mt-1">Tap to Spin Trophy</span>
                </div>
              </motion.div>

              <div className="text-xs text-gray-300 flex items-center justify-center gap-1">
                You spun the ball <strong className="text-[#FEDD00]">{ballTouchCount}</strong> times. <span className="text-[#FEDD00] font-semibold">Anonto Rishi</span> appreciates your athletic synergy! <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" />
              </div>

              {/* Stadium Floodlights Switch controller mockup */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 w-full max-w-[280px]">
                <span className="text-[10px] font-mono text-[#009739] block uppercase font-bold tracking-widest mb-2 text-center">Stadium Lighting Control</span>
                <div className="flex justify-around items-center gap-2">
                  <button onClick={() => setBallRotationDegree(p => p + 45)} className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-[10px] font-bold text-white transition-all uppercase cursor-pointer">Tilt Left</button>
                  <button onClick={() => setBallRotationDegree(p => p - 45)} className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-[10px] font-bold text-white transition-all uppercase cursor-pointer">Tilt Right</button>
                </div>
              </div>
            </div>

            {/* Shootout Challenge side */}
            <div className="lg:col-span-7">
              <InteractiveShootout />
            </div>
          </div>
        </div>
      </section>

      {/* Premium Contact Section */}
      <section id="contact" className="py-24 bg-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-black text-[#009739] mb-2 block font-display flex items-center justify-center gap-1">
              <Mail size={13} className="text-[#FEDD00]" />
              Contact Messenger Hub
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white capitalize">
              Connect with Taskin Ahmed
            </h3>
            <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto">
              Want to discuss World Cup prospects, collaborate on a sports lifestyle gig, or just say hello? Write your message right below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
            
            {/* Quick Contact Information Left */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white/[0.04] border border-white/10 p-6 rounded-2xl relative overflow-hidden backdrop-blur-md">
                <span className="text-[10px] font-mono uppercase text-gray-400 block tracking-widest font-black mb-3 text-[#FEDD00]">Direct Support Info</span>
                
                <div className="space-y-4">
                  <div>
                    <span className="block text-[10px] uppercase text-[#009739] font-bold">Nationality & Base</span>
                    <span className="text-sm font-semibold text-white">Dhaka, Bangladesh 🇧🇩</span>
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase text-[#009739] font-bold">Direct Phone</span>
                    <span className="text-sm font-semibold text-white font-mono hover:text-[#009739] transition-colors">
                      <a href="tel:+8801928868741">+880 1928-868741</a>
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase text-[#009739] font-bold">Favorite Team Club</span>
                    <span className="text-sm font-semibold text-white">Brazil National Football Team Canarinha Amarelinha</span>
                  </div>
                </div>

                {/* Aesthetic Samba visual stamp in bottom */}
                <div className="border-t border-white/10 mt-6 pt-4 text-[10px] text-gray-500 leading-relaxed italic">
                  &ldquo;Neste peito bate um coração Canarinho... In this chest beats a Canarinho supporter heart.&rdquo;
                </div>
              </div>

              {/* Direct quick call card */}
              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 text-center flex flex-col items-center justify-center backdrop-blur-md">
                <div className="w-10 h-10 rounded-full bg-[#009739]/20 border border-[#009739]/45 flex items-center justify-center text-[#FEDD00] mb-3 animate-pulse">
                  <Phone size={16} />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Instant voice connection</h4>
                <p className="text-[11px] text-gray-400 mt-1 mb-3">Prefer direct phone calls? Tap below to invoke a standard cellular phone dialer.</p>
                <a href="tel:+8801928868741" className="px-5 py-1.5 rounded-sm bg-[#009739] hover:bg-[#008532] text-[10px] font-bold text-white transition-colors block w-full max-w-[200px]">Call +8801928868741</a>
              </div>
            </div>

            {/* Validation Contact Form Right */}
            <div className="lg:col-span-8">
              <div className="bg-white/[0.03] border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl backdrop-blur-md">
                
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Name */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-bold mb-1.5">What is your Name?</label>
                      <input
                        type="text"
                        placeholder="e.g. Neymar Silva"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FEDD00] focus:ring-1 focus:ring-[#FEDD00]/50 transition-all duration-300"
                      />
                      {formErrors.name && <p className="text-red-400 text-[10px] mt-1 font-mono">{formErrors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-bold mb-1.5">Your Email address</label>
                      <input
                        type="email"
                        placeholder="neymar@silva.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FEDD00] focus:ring-1 focus:ring-[#FEDD00]/50 transition-all duration-300"
                      />
                      {formErrors.email && <p className="text-red-400 text-[10px] mt-1 font-mono">{formErrors.email}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-bold mb-1.5">Your football message or query</label>
                    <textarea
                      rows={4}
                      placeholder="Discuss World Cup tactics, suggest matches, or say hello..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FEDD00] focus:ring-1 focus:ring-[#FEDD00]/50 transition-all duration-300"
                    />
                    {formErrors.message && <p className="text-red-400 text-[10px] mt-1 font-mono">{formErrors.message}</p>}
                  </div>

                  {/* Submit buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] text-gray-500 font-mono italic">
                      Fast validation shield active 🛡️
                    </span>

                    <button
                      type="submit"
                      disabled={sending}
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                      className="px-6 py-2.5 rounded-sm bg-[#FEDD00] hover:bg-[#ffe338] text-neutral-950 font-black text-xs uppercase tracking-wider transition-all duration-300 transform hover:scale-103 active:scale-97 flex items-center gap-1.5 shadow-md border border-yellow-300 cursor-pointer"
                    >
                      {sending ? "Sending..." : "Send Message"}
                      <Send size={12} />
                    </button>
                  </div>
                </form>

                {/* Form Success Overlay Notification */}
                <AnimatePresence>
                  {formSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mt-4 p-4 rounded-lg bg-emerald-900/60 border border-emerald-400/30 flex items-start gap-3"
                    >
                      <CheckCircle2 className="text-yellow-400 w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Message Dispatched successfully!</h4>
                        <p className="text-[11px] text-gray-300 mt-0.5">Hello! Your query is saved at Anonto Rishi&apos;s workspace pipeline. He will review your message soon!</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links & Footer */}
      <footer className="bg-[#050505] pt-20 pb-12 border-t border-white/10 px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand stamp */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5">
              <Trophy size={16} className="text-[#FEDD00]" />
              <h4 className="font-display font-black text-lg text-white tracking-tight uppercase">Taskin Ahmed </h4>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Leading the digital frontier of Brazil football support networks. This interactive sports portal is designed and code-crafted with absolute precision as a professional showcase.
            </p>
            <div className="pt-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#009739] font-bold block">Developer Hub Connection</span>
              <p className="text-xs text-gray-500 font-mono mt-1">Status: Active & Online</p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h5 className="text-[10px] uppercase font-mono tracking-widest text-[#009739] font-black pb-1 border-b border-white/5">
              Quick Navigation
            </h5>
            <div className="flex flex-col space-y-2">
              {[
                { id: "hero", label: "Home Base" },
                { id: "about", label: "Supporter Bio" },
                { id: "brazil-fan", label: "Football Legends" },
                { id: "gallery", label: "Arena Showcase" },
                { id: "timeline", label: "Iconic Moments" },
                { id: "interactive", label: "Penalty Shootout" }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-xs text-gray-400 hover:text-[#FEDD00] transition-colors text-left font-mono text-[11px] uppercase"
                >
                  ✦ {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Connection Contacts Column */}
          <div className="space-y-4">
            <h5 className="text-[10px] uppercase font-mono tracking-widest text-[#009739] font-black pb-1 border-b border-white/5">
              Secure Communications
            </h5>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#FEDD00] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-200">Nationality & Base</p>
                  <p className="text-[11px]">Dhaka, Bangladesh</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail size={14} className="text-[#009739] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-200">Electronic Mail</p>
                  <p className="text-[11px] font-mono select-all">mdtaskinahmedtasin@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Connect Supporter Socials Column */}
          <div className="space-y-4">
            <h5 className="text-[10px] uppercase font-mono tracking-widest text-[#009739] font-black pb-1 border-b border-white/5">
              Official Channels
            </h5>
            <p className="text-xs text-gray-400 leading-relaxed">
              Connect directly with our support networks, community events, and social pipelines.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[
                { label: "Facebook", icon: Facebook, url: "https://www.facebook.com/share/17ig9nro1H/?mibextid=wwXIfr" },
                { label: "Instagram", icon: Instagram, url: "https://www.instagram.com/mdtaskinahamedtasin?igsh=MTM5N2xpMTEwM3I0cA%3D%3D&utm_source=qr" },
                { label: "YouTube", icon: Youtube, url: "https://youtube.com/@mdtaskinahmed3089?si=QUJos5R1oyRt1UUb" },
                { label: "WhatsApp", icon: MessageCircle, url: "https://wa.me/8801928868741" },
              ].map((soc) => {
                const IconComp = soc.icon;
                return (
                  <a
                    key={soc.label}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-sm bg-white/5 hover:bg-[#009739] hover:text-white border border-white/10 flex items-center justify-center text-[#FEDD00] hover:scale-105 transition-all text-sm shadow cursor-pointer"
                    title={`Connect on ${soc.label}`}
                  >
                    <IconComp size={16} />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Rights Bar */}
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="text-xs text-gray-500">
            <p>© 2026 Taskin Ahmed. All Rights Reserved.</p>
          </div>
          <div className="text-xs text-gray-500">
            <p className="text-[10px] opacity-85 uppercase tracking-widest font-mono">
              Designed & built exclusively by <strong className="text-[#FEDD00] font-extrabold transition-colors">Anonto Rishi</strong> with premium Jogo Bonito support spirit.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
