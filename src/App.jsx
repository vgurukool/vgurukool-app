import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  BookOpen, 
  ChevronRight, 
  Coins, 
  HeartHandshake, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  LogIn, 
  LogOut, 
  User, 
  ArrowRight,
  Sun,
  Shield,
  Trophy,
  Users,
  Feather,
  Wheat,
  Activity,
  Award,
  Crown
} from 'lucide-react';
import { AIAssistantsSection } from './components/AIAssistantsSection';

// 8 Lakshmi Apps Definition
const LAKSHMI_APPS = [
  {
    id: 'dhana',
    name: 'Dhana Lakshmi',
    devanagari: 'धन लक्ष्मी',
    title: 'Monetary Wealth & Resource Flow',
    description: 'Track liquid wealth, cash flow resilience, debt-to-asset balance, and ethical capital deployment.',
    icon: Coins,
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.25)',
    status: 'Live App',
    statusColor: '#10B981',
    url: 'https://dhana-lakshmi.vgurukool.com'
  },
  {
    id: 'dhanya',
    name: 'Dhanya Lakshmi',
    devanagari: 'धान्य लक्ष्मी',
    title: 'Nourishment & Sustenance',
    description: 'Audit food sovereignty, nutritional vitality, sustainable living practices, and seasonal harmony.',
    icon: Wheat,
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.25)',
    status: 'Live App',
    statusColor: '#10B981',
    url: 'https://dhanya-lakshmi.vgurukool.com'
  },
  {
    id: 'gaja',
    name: 'Gaja Lakshmi',
    devanagari: 'गज लक्ष्मी',
    title: 'Royal Grace & Leadership',
    description: 'Evaluate social capital, authority, community standing, and ethical leadership influence.',
    icon: Crown,
    color: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.1)',
    borderColor: 'rgba(139, 92, 246, 0.25)',
    status: 'Live App',
    statusColor: '#10B981',
    url: 'https://gaja-lakshmi.vgurukool.com'
  },
  {
    id: 'vidya',
    name: 'Vidya Lakshmi',
    devanagari: 'विद्या लक्ष्मी',
    title: 'Knowledge & Skill Mastery',
    description: 'Assess continuous learning, scriptural fluency, technical competencies, and mentorship capability.',
    icon: BookOpen,
    color: '#38BDF8',
    bgColor: 'rgba(56, 189, 248, 0.1)',
    borderColor: 'rgba(56, 189, 248, 0.25)',
    status: 'Live App',
    statusColor: '#10B981',
    url: 'https://vidya-lakshmi.vgurukool.com'
  },
  {
    id: 'adi',
    name: 'Adi Lakshmi',
    devanagari: 'आदि लक्ष्मी',
    title: 'Primordial Spiritual Foundation',
    description: 'Evaluates inner grounding, spiritual peace, mindfulness practices, and awareness of the primordial self.',
    icon: Sun,
    color: '#EC4899',
    bgColor: 'rgba(236, 72, 153, 0.1)',
    borderColor: 'rgba(236, 72, 153, 0.25)',
    status: 'In Development',
    statusColor: '#94A3B8',
    url: null
  },
  {
    id: 'dhairya',
    name: 'Dhairya / Veera Lakshmi',
    devanagari: 'धैर्य / वीर लक्ष्मी',
    title: 'Courage & Resilience',
    description: 'Measures fortitude under adversity, stress resilience, perseverance, and ethical bravery.',
    icon: Shield,
    color: '#EF4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.25)',
    status: 'In Development',
    statusColor: '#94A3B8',
    url: null
  },
  {
    id: 'vijaya',
    name: 'Vijaya Lakshmi',
    devanagari: 'विजय लक्ष्मी',
    title: 'Victory & Goal Achievement',
    description: 'Tracks execution efficacy, career milestones, purposeful victory, and overcomings of obstacles.',
    icon: Trophy,
    color: '#EAB308',
    bgColor: 'rgba(234, 179, 8, 0.1)',
    borderColor: 'rgba(234, 179, 8, 0.25)',
    status: 'In Development',
    statusColor: '#94A3B8',
    url: null
  },
  {
    id: 'santana',
    name: 'Santana Lakshmi',
    devanagari: 'सन्तान लक्ष्मी',
    title: 'Family Harmony & Legacy',
    description: 'Fosters inter-generational harmony, conscious parenting, family values, and enduring cultural heritage.',
    icon: Users,
    color: '#06B6D4',
    bgColor: 'rgba(6, 182, 212, 0.1)',
    borderColor: 'rgba(6, 182, 212, 0.25)',
    status: 'In Development',
    statusColor: '#94A3B8',
    url: null
  }
];

// Course Catalog
const COURSES = [
  {
    id: 'gita-journey',
    category: 'sacred',
    status: 'Available Now',
    statusColor: '#10B981',
    statusBg: 'rgba(16, 185, 129, 0.15)',
    title: 'The Bhagavad Gita: 18-Week Journey',
    devanagari: 'श्रीमद्भगवद्गीता • Complete 701 Verses',
    description: 'Comprehensive study of all 18 chapters structured into 5-verse interactive micro-lessons with authentic pronunciation, transliteration, English/Hindi commentary, and chapter exit quizzes.',
    duration: '18 Weeks • 182 Activities',
    instructor: 'Rajni',
    launchUrl: 'https://learnhouse.vgurukool.com/orgs/default/courses/course_7f895b1e-2123-420a-ac53-1326bfef3b50',
    actionText: 'Enter Course on LearnHouse'
  },
  {
    id: 'upanishads-vedanta',
    category: 'philosophy',
    status: 'Coming Soon',
    statusColor: '#818CF8',
    statusBg: 'rgba(129, 140, 248, 0.15)',
    title: 'Principal Upanishadic Wisdom',
    devanagari: 'उपनिषद् • The Essence of Vedanta',
    description: 'Deep exploration of Isha, Kena, Katha, and Prashna Upanishads unraveling the nature of pure consciousness, universal Brahman, and practical non-dual philosophy.',
    duration: '8 Weeks • 10 Upanishads',
    instructor: 'Curriculum Council',
    launchUrl: 'https://learnhouse.vgurukool.com',
    actionText: 'Join Waitlist'
  },
  {
    id: 'sanskrit-meter',
    category: 'sanskrit',
    status: 'Coming Soon',
    statusColor: '#818CF8',
    statusBg: 'rgba(129, 140, 248, 0.15)',
    title: 'Spoken Sanskrit & Metered Chanting',
    devanagari: 'संस्कृतम् • Chandas & Phonetics',
    description: 'Master Sanskrit phonetics, Paninian grammatical stems, and traditional prosody for classical meters like Anushtubh, Trishtubh, and Gayatri.',
    duration: '6 Weeks • Chanting Labs',
    instructor: 'Sanskrit Acharyas',
    launchUrl: 'https://learnhouse.vgurukool.com',
    actionText: 'Join Waitlist'
  },
  {
    id: 'patanjali-yoga',
    category: 'philosophy',
    status: 'Coming Soon',
    statusColor: '#818CF8',
    statusBg: 'rgba(129, 140, 248, 0.15)',
    title: 'Patanjali Yoga Sutras in Practice',
    devanagari: 'योगसूत्र • The Eight Limbs of Raja Yoga',
    description: 'Systematic study of the four padas (Samadhi, Sadhana, Vibhuti, Kaivalya), cultivating mental stillness (Chitta Vritti Nirodha) and ethical clarity.',
    duration: '10 Weeks • 196 Sutras',
    instructor: 'Yogic Faculty',
    launchUrl: 'https://learnhouse.vgurukool.com',
    actionText: 'Join Waitlist'
  },
  {
    id: 'vedic-economics',
    category: 'prosperity',
    status: 'Coming Soon',
    statusColor: '#818CF8',
    statusBg: 'rgba(129, 140, 248, 0.15)',
    title: 'Vedic Economics & Ethical Enterprise',
    devanagari: 'अर्थशास्त्र • Dhana, Dhanya & Artha',
    description: 'Applying Kautilyan resource stewardship and the Ashta Lakshmi framework to modern personal finance, conscious enterprise, and ethical leadership.',
    duration: '6 Weeks • Case Studies',
    instructor: 'Dr. V. Rao',
    launchUrl: 'https://learnhouse.vgurukool.com',
    actionText: 'Join Waitlist'
  }
];

export default function App({ keycloak, authenticated = false }) {
  const [courseCategory, setCourseCategory] = useState('all');

  const filteredCourses = courseCategory === 'all'
    ? COURSES
    : COURSES.filter(c => c.category === courseCategory);

  const userName = keycloak?.tokenParsed?.name || keycloak?.tokenParsed?.preferred_username || 'Learner';
  const userRoles = keycloak?.realmAccess?.roles || [];
  const isInstructor = userRoles.includes('instructor') || userRoles.includes('admin');
  const isAdmin = userRoles.includes('admin');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand */}
          <a href="/" className="flex items-center space-x-3.5 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 p-0.5 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <span className="text-xl text-amber-400 font-bold">ॐ</span>
              </div>
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-tight text-white flex items-center space-x-2">
                <span>Gurukool</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30 font-medium">
                  Academy
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Ancient Wisdom • Modern Innovation
              </p>
            </div>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium text-slate-300">
            <a href="#self-assessment" className="px-3.5 py-2 rounded-xl hover:text-white hover:bg-slate-800/60 transition">
              1. Self Assessment
            </a>
            <a href="#courses" className="px-3.5 py-2 rounded-xl hover:text-white hover:bg-slate-800/60 transition">
              2. Courses &amp; Programs
            </a>
            <a href="#apps" className="px-3.5 py-2 rounded-xl hover:text-white hover:bg-slate-800/60 transition">
              3. The 8 Lakshmi Apps
            </a>
            <a href="#ai-assistants" className="px-3.5 py-2 rounded-xl text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>4. AI Assistants</span>
            </a>
          </nav>

          {/* Auth Button */}
          <div className="flex items-center space-x-3">
            {authenticated ? (
              <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 rounded-full py-1.5 px-3">
                <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/30">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left pr-1">
                  <div className="text-xs font-bold text-white truncate max-w-[120px]">{userName}</div>
                  <div className="text-[10px] text-amber-400 font-medium">
                    {isAdmin ? 'Platform Admin' : isInstructor ? 'Instructor' : 'Enrolled Student'}
                  </div>
                </div>
                <button
                  onClick={() => keycloak.logout({ redirectUri: window.location.origin })}
                  title="Sign Out"
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => keycloak.login()}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/20 transition flex items-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In with Keycloak</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Sovereign Vedic Learning &amp; Abundance Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Ancient Vedic Wisdom.<br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
              Modern Sovereign Prosperity.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Welcome to Gurukool Academy. Evaluate your life through the 8 forms of Vedic wealth, immerse yourself in our 18-week Bhagavad Gita curriculum, explore dedicated Lakshmi apps, and dialogue with interactive Vedic AI assistants.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#self-assessment"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-sm shadow-xl shadow-orange-500/25 transition flex items-center space-x-2"
            >
              <Activity className="w-4 h-4" />
              <span>1. Self Assessment</span>
            </a>
            <a
              href="#courses"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 font-bold text-sm transition flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>2. Course Catalog</span>
            </a>
            <a
              href="#apps"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 font-bold text-sm transition flex items-center space-x-2"
            >
              <Coins className="w-4 h-4 text-emerald-400" />
              <span>3. The 8 Lakshmi Apps</span>
            </a>
            <a
              href="#ai-assistants"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-amber-500/40 font-bold text-sm transition flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>4. AI Assistants</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 1: SELF ASSESSMENT */}
      <section id="self-assessment" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-900">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Section 1 • Holistic Wealth Diagnostic</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ashta Lakshmi Self Assessment
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Wealth in the Vedic tradition is eight-fold. Evaluate your balance across spiritual peace, monetary capital, health, courage, legacy, and knowledge.
          </p>
        </div>

        {/* Feature Box */}
        <div className="bg-gradient-to-br from-slate-900/90 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-amber-500/15 text-amber-400 text-xs font-bold">
                <span>🌟 Dedicated Assessment Portal</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                Measure Your 8 Forms of Vedic Prosperity with Quantitative Precision
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                The dedicated Ashta Lakshmi platform conducts a comprehensive 40-metric audit across your liquid savings, emotional resilience, family harmony, health sovereignty, and purposeful learning.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl">
                  <div className="text-xs text-slate-400">Questionnaire</div>
                  <div className="text-sm font-bold text-white mt-0.5">40 Core Metrics</div>
                </div>
                <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl">
                  <div className="text-xs text-slate-400">Visualization</div>
                  <div className="text-sm font-bold text-white mt-0.5">Radar Audit &amp; YoY</div>
                </div>
                <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl">
                  <div className="text-xs text-slate-400">Spending Audit</div>
                  <div className="text-sm font-bold text-white mt-0.5">Vedic Categorizer</div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="https://ashta-lakshmi.vgurukool.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20 transition"
                >
                  <span>Launch Ashta Lakshmi Assessment Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Assessment Mini Preview */}
            <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Eight Pillars Audit</span>
                <span className="text-xs font-mono text-emerald-400">Score Range: 0 - 100</span>
              </div>
              <div className="space-y-2.5 text-xs">
                {[
                  { name: 'Adi Lakshmi (Spiritual Grounding)', score: 85, color: 'bg-pink-500' },
                  { name: 'Dhana Lakshmi (Liquid Capital)', score: 72, color: 'bg-emerald-500' },
                  { name: 'Dhanya Lakshmi (Health & Sustenance)', score: 78, color: 'bg-amber-500' },
                  { name: 'Gaja Lakshmi (Social Standing & Influence)', score: 68, color: 'bg-purple-500' },
                  { name: 'Santana Lakshmi (Family Legacy)', score: 90, color: 'bg-cyan-500' },
                  { name: 'Dhairya Lakshmi (Courage & Resilience)', score: 82, color: 'bg-red-500' },
                  { name: 'Vijaya Lakshmi (Execution & Victory)', score: 75, color: 'bg-yellow-500' },
                  { name: 'Vidya Lakshmi (Wisdom & Mastery)', score: 88, color: 'bg-blue-500' }
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                      <span>{item.name}</span>
                      <span className="text-slate-200 font-bold">{item.score}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.score}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: COURSE CATALOG & PROGRAMS */}
      <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-900">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>Section 2 • Sovereign Curriculum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Course Catalog &amp; Vedic Programs
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Authentic, lineage-verified courses delivered through our LearnHouse learning management platform.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {[
              { id: 'all', label: 'All Disciplines' },
              { id: 'sacred', label: 'Sacred Literature' },
              { id: 'philosophy', label: 'Philosophy & Yoga' },
              { id: 'sanskrit', label: 'Sanskrit & Chanting' },
              { id: 'prosperity', label: 'Wealth & Governance' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCourseCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  courseCategory === tab.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Bhagavad Gita Card */}
        <div className="mb-10 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Flagship Course • Complete 701 Verses</span>
            </div>
            <span className="text-xs text-amber-400 font-mono">18 Weeks • 182 Interactive Activities</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            The Bhagavad Gita: An 18-Week Transformative Journey
          </h3>
          <p className="mt-1 text-sm font-mono text-amber-300">
            श्रीमद्भगवद्गीता • Structured 5-Verse Micro-Lessons
          </p>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Immerse yourself in Arjuna's inner awakening and Sri Krishna's timeless dialogue on Karma, Bhakti, and Jnana. Every single verse is unpacked with authentic meter, root Sanskrit etymology, Hindi and English commentaries, and chapter assessments.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="https://learnhouse.vgurukool.com/orgs/default/courses/course_7f895b1e-2123-420a-ac53-1326bfef3b50"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-sm shadow-lg shadow-orange-500/25 transition"
            >
              <span>Enter Bhagavad Gita Course on LearnHouse</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Other Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.filter(c => c.id !== 'gita-journey').map((course) => (
            <div
              key={course.id}
              className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition hover:-translate-y-1 duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                    style={{ backgroundColor: course.statusBg, color: course.statusColor }}
                  >
                    {course.status}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{course.duration}</span>
                </div>

                <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
                  {course.title}
                </h4>
                <p className="text-xs font-mono text-amber-400/80 mt-0.5">{course.devanagari}</p>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">{course.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-500">Acharya: <strong className="text-slate-300">{course.instructor}</strong></span>
                <a
                  href={course.launchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center space-x-1"
                >
                  <span>{course.actionText}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: THE 8 LAKSHMI APPLICATIONS */}
      <section id="apps" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-900">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Coins className="w-4 h-4 text-emerald-400" />
            <span>Section 3 • Sovereign App Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Eight Lakshmi Applications
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Dedicated applications tailored to each specific form of Vedic abundance, built on sovereign micro-frontends with unified Keycloak SSO.
          </p>
        </div>

        {/* 8 Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LAKSHMI_APPS.map((app) => {
            const Icon = app.icon;
            const isLive = Boolean(app.url);
            return (
              <div
                key={app.id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: app.bgColor, border: `1px solid ${app.borderColor}` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: app.color }} />
                    </div>
                    <span 
                      className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                      style={{ 
                        backgroundColor: isLive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(148, 163, 184, 0.15)',
                        color: isLive ? '#10B981' : '#94A3B8'
                      }}
                    >
                      {app.status}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white leading-tight">{app.name}</h4>
                  <p className="text-xs font-mono text-amber-400/80 mt-0.5">{app.devanagari}</p>
                  <p className="text-xs font-semibold text-slate-300 mt-1">{app.title}</p>
                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">{app.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  {isLive ? (
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition"
                    >
                      <span>Launch {app.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                    </a>
                  ) : (
                    <button
                      disabled
                      className="w-full py-2 px-3 rounded-xl bg-slate-950/60 text-slate-500 font-medium text-xs border border-slate-800 cursor-not-allowed"
                    >
                      Module In Development
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: VEDIC AI ASSISTANTS */}
      <AIAssistantsSection />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-amber-400 font-bold text-sm">ॐ Vgurukool</span>
            <span>•</span>
            <span>Ancient Wisdom &amp; Modern Innovation</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="https://ashta-lakshmi.vgurukool.com" target="_blank" rel="noreferrer" className="hover:text-slate-300">Ashta Lakshmi Assessment</a>
            <a href="https://learnhouse.vgurukool.com" target="_blank" rel="noreferrer" className="hover:text-slate-300">LearnHouse LMS</a>
            <a href="https://platform.vgurukool.com/keycloak" target="_blank" rel="noreferrer" className="hover:text-slate-300">Keycloak IAM</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
