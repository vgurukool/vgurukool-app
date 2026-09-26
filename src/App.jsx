import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  ChevronRight, 
  ExternalLink, 
  LogIn, 
  LogOut, 
  Activity, 
  Bot, 
  Check, 
  X 
} from 'lucide-react';
import { ContactSection } from './components/ContactSection';
import { VgurukoolLogo } from './components/VgurukoolLogo';

// Socratic AI Acharyas Definition
const ACHARYAS = {
  brihaspati: {
    id: 'brihaspati',
    avatar: '✨',
    name: 'Acharya Brihaspati',
    devanagari: 'बृहस्पति',
    role: 'Guru of the Devas • Master of Vedanta',
    tagline: 'Mentor on Vedanta, Upanishadic Inquiry & Intellectual Clarity',
    accentColor: '#8B5CF6',
    badgeColor: 'rgba(139, 92, 246, 0.2)',
    desc: 'Illuminates non-dual consciousness (Brahman & Atman), the 4 Purusharthas (Dharma, Artha, Kama, Moksha), and moral discernment. Instead of answering like a search engine, Brihaspati asks guiding counter-questions to awaken your own Viveka.',
    sampleQuestion: '"How can I practice Nishkama Karma (detached action) when my performance is evaluated only by quarterly numbers?"',
    socraticReply: {
      lead: 'Acharya Brihaspati observes:',
      text: 'Reflect deeply: does your agitation arise from executing the effort, or from clinging to whether the market acknowledges it? Gita 2.47 clarifies that your sovereignty is exclusively over your craft (karmaṇy-evādhikāras-te), never over external applause. What part of your daily effort remains pure when you strip away the fear of the quarterly review?'
    },
    caipeUrl: 'https://caipe.vgurukool.com/chat?agent=brihaspati'
  },
  chanakya: {
    id: 'chanakya',
    avatar: '🏛️',
    name: 'Acharya Chanakya',
    devanagari: 'कौटिल्य',
    role: 'Architect of Statecraft • Kautilya Niti',
    tagline: 'Master of Statecraft, Rajaneeti, Crisis Leadership & Pragmatic Execution',
    accentColor: '#F43F5E',
    badgeColor: 'rgba(244, 63, 94, 0.2)',
    desc: 'Delivers realistic, incisive counsel rooted in the Arthashastra and Chanakya Niti. Focuses on disciplined governance, strategic negotiation, crisis navigation, and the Saptanga theory of organizational resilience.',
    sampleQuestion: '"We are negotiating with an aggressive competitor who possesses 10x our marketing budget. How should we proceed?"',
    socraticReply: {
      lead: 'Acharya Chanakya counsels:',
      text: 'A river avoids the mountain not out of weakness, but because water finds the underlying crevice. Identify what your giant adversary cannot afford to risk: speed, agility, and bespoke trust. Have you mapped their internal fissures before engaging in open conflict?'
    },
    caipeUrl: 'https://caipe.vgurukool.com/chat?agent=chanakya'
  },
  dhanvantari: {
    id: 'dhanvantari',
    avatar: '🌿',
    name: 'Acharya Dhanvantari',
    devanagari: 'धन्वन्तरि',
    role: 'Celestial Healer • Lord of Ayurveda',
    tagline: 'Guide on Holistic Wellbeing, Dinacharya & Mind-Body Vitality',
    accentColor: '#10B981',
    badgeColor: 'rgba(16, 185, 129, 0.2)',
    desc: 'Ayurvedic wisdom tailored to modern life: circadian alignment (Dinacharya), seasonal nutrition (Ritucharya), digestive fire optimization (Agni), and preventative vitality (Ojas) to ensure your mind has the physical foundation to think deeply.',
    sampleQuestion: '"I feel mentally exhausted by 2 PM every day despite 8 hours of sleep and high caffeine."',
    socraticReply: {
      lead: 'Acharya Dhanvantari diagnoses:',
      text: 'Caffeine masks exhaustion without recharging Prana. Your 2 PM crash indicates impaired Agni (digestive stagnation) combined with circadian desynchronization. At what time is your heaviest meal taken, and when did your eyes last encounter natural morning sunlight?'
    },
    caipeUrl: 'https://caipe.vgurukool.com/chat?agent=dhanvantari'
  },
  kubera: {
    id: 'kubera',
    avatar: '🪙',
    name: 'Acharya Kubera',
    devanagari: 'कुबेर',
    role: 'Vedic Treasurer • Lord of Wealth',
    tagline: 'Advisor on Artha, Ethical Prosperity & Wealth Stewardship',
    accentColor: '#F59E0B',
    badgeColor: 'rgba(245, 158, 11, 0.2)',
    desc: 'Guides ethical capital allocation, conscious investment, resource management, and the harmony between material prosperity (Artha) and spiritual righteousness (Dharma).',
    sampleQuestion: '"Is it spiritually compromising to actively pursue significant material wealth and equity?"',
    socraticReply: {
      lead: 'Acharya Kubera clarifies:',
      text: 'Artha is one of the four sacred Purusharthas—without capital, who feeds the Gurukuls, builds hospitals, and shelters the vulnerable? The corruption lies not in generating abundance, but in greed without Dharma. Are you accumulating wealth as an owner, or as a sovereign trustee for society?'
    },
    caipeUrl: 'https://caipe.vgurukool.com/chat?agent=kubera'
  },
  vyasa: {
    id: 'vyasa',
    avatar: '🪷',
    name: 'Veda Vyasa & Saraswati',
    devanagari: 'वेदव्यास & सरस्वती',
    role: 'Keepers of Sacred Slokas • Chanting Labs',
    tagline: 'Scholars of Bhagavad Gita Verses, Sanskrit Metrics & Hermeneutics',
    accentColor: '#38BDF8',
    badgeColor: 'rgba(56, 189, 248, 0.2)',
    desc: 'Guides phonetic articulation, word-by-word Sanskrit etymology (Padachheda & Anvaya), chanting meter (Chandas like Anushtubh and Gayatri), and textual exegesis of canonical Shastras.',
    sampleQuestion: '"Why is authentic Sanskrit pronunciation so critical to understanding the Shastras?"',
    socraticReply: {
      lead: 'Veda Vyasa illuminates:',
      text: 'Sanskrit is vibrational mathematics. Unlike modern languages where sounds arbitrarily label objects, Vedic roots (Dhatus) generate resonance directly connected to psychological states. A mispronounced accent shifts the entire metaphysical meaning. Shall we analyze the meter of the Mahamrityunjaya Mantra together?'
    },
    caipeUrl: 'https://caipe.vgurukool.com/chat?agent=saraswati-vyasa'
  }
};

export default function App({ keycloak, authenticated = false }) {
  const [selectedAcharyaKey, setSelectedAcharyaKey] = useState('brihaspati');

  const userName = keycloak?.tokenParsed?.name || keycloak?.tokenParsed?.preferred_username || 'Learner';
  const userRoles = keycloak?.realmAccess?.roles || [];
  const isInstructor = userRoles.includes('instructor') || userRoles.includes('admin');
  const isAdmin = userRoles.includes('admin');

  const activeAcharya = ACHARYAS[selectedAcharyaKey] || ACHARYAS.brihaspati;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-amber-950/80 via-amber-900/40 to-slate-950 border-b border-amber-500/20 text-xs py-2 px-4 text-center">
        <span className="inline-flex items-center gap-2 text-amber-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <strong className="font-semibold text-amber-300">Gurukul Paradigm Revived:</strong>
          <span>Moving beyond industrial test-taking to deep inquiry, character, and sovereign AI mentorship.</span>
          <a href="#pedagogy" className="underline hover:text-white font-medium ml-1">Explore the 3-Step Pedagogy →</a>
        </span>
      </div>

      {/* Header Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo - Preserves Original Logo & Clean Brand */}
          <a href="/" className="flex items-center space-x-3.5 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 p-0.5 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <VgurukoolLogo className="w-7 h-7" />
              </div>
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-wider text-white">
                Vgurukool
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Ancient Wisdom • Modern Sovereign Intelligence
              </p>
            </div>
          </a>

          {/* Navigation Links (Updated with Section 6 removed) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-sm font-medium text-slate-300">
            <a href="#why-gurukul" className="px-3 py-2 rounded-xl hover:text-white hover:bg-slate-800/60 transition">
              1. The Paradigm
            </a>
            <a href="#pedagogy" className="px-3 py-2 rounded-xl hover:text-white hover:bg-slate-800/60 transition">
              2. Pedagogy
            </a>
            <a href="#acharyas" className="px-3 py-2 rounded-xl text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3. AI Acharyas</span>
            </a>
            <a href="#ecosystem" className="px-3 py-2 rounded-xl hover:text-white hover:bg-slate-800/60 transition">
              4. Sovereign Ecosystem
            </a>
            <a href="#ashta-lakshmi" className="px-3 py-2 rounded-xl hover:text-white hover:bg-slate-800/60 transition flex items-center gap-1.5">
              <span className="text-emerald-400">☸</span>
              <span>5. 8-Pillar Flourishing</span>
            </a>
            <a href="#contact" className="px-3 py-2 rounded-xl hover:text-white hover:bg-slate-800/60 transition">
              6. Contact Us
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
                onClick={() => keycloak?.login ? keycloak.login() : window.location.assign('https://platform.vgurukool.com')}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/20 transition flex items-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In with Keycloak</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Inspired by Ancient Bharatiya Pedagogy • Powered by Sovereign AI</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.12]">
            How the Gurukul System Built<br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
              Thinkers, Not Just Test-Takers.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Modern education became an industrial assembly line of rote memorization, exam anxiety, and fragmented subjects. <strong className="text-white font-semibold">Vgurukool</strong> revives the authentic Gurukul paradigm—integrating critical inquiry, character formation, practical sciences, and 8-fold holistic abundance—personalized through dedicated <strong>Sovereign AI Acharyas</strong>.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#pedagogy"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-sm shadow-xl shadow-orange-500/25 transition flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Discover the 3-Step Pedagogy</span>
            </a>
            <a
              href="#acharyas"
              className="px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-amber-400 font-bold text-sm transition flex items-center space-x-2 shadow-lg"
            >
              <Bot className="w-4 h-4 text-amber-400" />
              <span>Experience Socratic AI Guru</span>
            </a>
            <a
              href="#ashta-lakshmi"
              className="px-7 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 font-bold text-sm transition flex items-center space-x-2"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>8-Pillar Life Flourishing Compass</span>
            </a>
          </div>

          {/* Quick Commitments / Trust Indicators */}
          <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-3.5 bg-slate-900/40 rounded-xl border border-slate-800">
              <div className="text-amber-400 text-xs font-mono">Pedagogy</div>
              <div className="text-white font-bold text-sm mt-0.5">Shravana • Manana • Nididhyasana</div>
              <div className="text-slate-400 text-[11px] mt-1">Deep intake, Socratic debate &amp; lived practice</div>
            </div>
            <div className="p-3.5 bg-slate-900/40 rounded-xl border border-slate-800">
              <div className="text-amber-400 text-xs font-mono">Mentorship</div>
              <div className="text-white font-bold text-sm mt-0.5">Guru-Shishya by AI</div>
              <div className="text-slate-400 text-[11px] mt-1">1-on-1 personalized to each seeker's Swabhava</div>
            </div>
            <div className="p-3.5 bg-slate-900/40 rounded-xl border border-slate-800">
              <div className="text-emerald-400 text-xs font-mono">Holistic Measure</div>
              <div className="text-white font-bold text-sm mt-0.5">Ashta Lakshmi Balance</div>
              <div className="text-slate-400 text-[11px] mt-1">Not just marks: 8 dimensions of life flourishing</div>
            </div>
            <div className="p-3.5 bg-slate-900/40 rounded-xl border border-slate-800">
              <div className="text-sky-400 text-xs font-mono">Architecture</div>
              <div className="text-white font-bold text-sm mt-0.5">Sovereign &amp; Private</div>
              <div className="text-slate-400 text-[11px] mt-1">CNOE GitOps, Keycloak SSO &amp; local-first data</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE CORE PARADIGM SHIFT */}
      <section id="why-gurukul" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-900">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 1 • Why Modern Education is Broken</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            The Great Divide: Industrial Schooling vs. The Gurukul Paradigm
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-3xl mx-auto">
            Traditional education was never about preparing youth for exam halls. It was designed to forge resilient thinkers, ethical leaders, and lifelong seekers.
          </p>
        </div>

        {/* Comparative Visual Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* The Modern Test-Taker Assembly Line */}
          <div className="bg-gradient-to-br from-rose-950/20 via-slate-900/80 to-slate-950 border border-rose-900/40 rounded-3xl p-8 relative flex flex-col justify-between">
            <div className="absolute top-4 right-4 text-rose-400 text-xs font-mono uppercase tracking-wider bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
              The Factory Model
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center mb-5 text-rose-400">
                <X className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">The Standardized Test-Taker</h3>
              <p className="text-sm text-slate-400 mb-6">Optimized for rote reproduction, artificial testing metrics, and short-term compliance.</p>

              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold">✕</span>
                  <div>
                    <strong className="text-white">Rote Memorization over Understanding:</strong>
                    <p className="text-slate-400 text-xs mt-0.5">Students cram formulas and predigested answers to score marks, only to discard the memory after exams.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold">✕</span>
                  <div>
                    <strong className="text-white">One-Size-Fits-All Conveyor Belt:</strong>
                    <p className="text-slate-400 text-xs mt-0.5">Disregards individual temperament (Swabhava) and forces diverse intellects into a rigid percentile ranking.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold">✕</span>
                  <div>
                    <strong className="text-white">Siloed, Disconnected Knowledge:</strong>
                    <p className="text-slate-400 text-xs mt-0.5">Separates sciences, ethics, mental health, and philosophy, creating highly specialized workers with existential burnout.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold">✕</span>
                  <div>
                    <strong className="text-white">Anxiety &amp; Extrinsic Motivation:</strong>
                    <p className="text-slate-400 text-xs mt-0.5">Fear of failure and grade point competition eclipses the joy of discovery and self-realization.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-rose-950/60 text-xs text-rose-300 font-medium">
              Outcome: High test scores with low discernment, fragile mental health, and ethical vulnerability.
            </div>
          </div>

          {/* The Vgurukool Sovereign AI Model */}
          <div className="bg-gradient-to-br from-amber-950/30 via-slate-900/90 to-slate-950 border border-amber-500/40 rounded-3xl p-8 relative flex flex-col justify-between shadow-2xl shadow-amber-500/5">
            <div className="absolute top-4 right-4 text-amber-400 text-xs font-mono uppercase tracking-wider bg-amber-500/15 px-2.5 py-1 rounded-full border border-amber-500/30">
              The Vgurukool Way
            </div>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-5 text-amber-400">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">The Sovereign Holistic Thinker</h3>
              <p className="text-sm text-slate-400 mb-6">Rooted in self-inquiry, moral discernment (Viveka), experiential mastery, and AI-enabled one-on-one mentorship.</p>

              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Manana &amp; Socratic Dialectics:</strong>
                    <p className="text-slate-400 text-xs mt-0.5">Students engage in debate (Vada), test premises, analyze counter-arguments, and arrive at first-principles understanding.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">AI-Powered Guru-Shishya Parampara:</strong>
                    <p className="text-slate-400 text-xs mt-0.5">Sovereign AI Acharyas adapt pedagogy directly to your unique constitution, pacing, learning style, and life duty (Swadharma).</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Integration of Para &amp; Apara Vidya:</strong>
                    <p className="text-slate-400 text-xs mt-0.5">Weaving technical competence, statecraft, and economics with inner spiritual grounding, philosophy, and Ayurvedic vitality.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <strong className="text-white">Nididhyasana (Lived Mastery &amp; Character):</strong>
                    <p className="text-slate-400 text-xs mt-0.5">Knowledge is not verified by multiple-choice sheets, but measured across the 8 dimensions of genuine life flourishing (Ashta Lakshmi).</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-amber-900/40 text-xs text-amber-300 font-semibold flex items-center justify-between">
              <span>Outcome: Independent intellectual autonomy, moral fortitude &amp; sustainable prosperity.</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 3-STAGE GURUKUL PEDAGOGICAL ENGINE */}
      <section id="pedagogy" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-900">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 2 • Classical Learning Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            The Triad of Deep Cognition
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-3xl mx-auto">
            How does a mind evolve from consuming raw information into diamond-sharp discernment? The Gurukul system utilized a three-tier cognitive method, now supercharged with sovereign AI.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stage 1: Shravana */}
          <div className="bg-slate-900/70 rounded-3xl p-8 border border-slate-800 hover:border-amber-500/30 transition duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">Stage 01</span>
                <span className="text-sm font-bold text-slate-400 font-mono">श्रवणम्</span>
              </div>
              <h3 className="text-2xl font-black text-white mb-1">Shravana</h3>
              <div className="text-xs font-semibold text-amber-300 mb-4">Attentive Intake &amp; Canonical Immersion</div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                In modern life, reading has decayed into dopamine-fueled skimming. Shravana trains deep listening, unhurried absorption of foundational scriptures, and direct contact with authentic primary sources.
              </p>

              <div className="space-y-2.5 pt-2 border-t border-slate-800">
                <div className="text-xs font-bold text-slate-200">Supported by Vgurukool:</div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-amber-400">▸</span>
                  <span><strong>Granth Digital Library:</strong> Canonical Upanishads, Gita &amp; Sutras</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-amber-400">▸</span>
                  <span><strong>LearnHouse Academy:</strong> 18-week immersive Gita cohort</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-amber-400">▸</span>
                  <span><strong>Bhasha Vidya:</strong> Classical Sanskrit chanting and meter</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80">
              <a href="https://granth.vgurukool.com" target="_blank" rel="noreferrer" className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center justify-between">
                <span>Explore Granth Library</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Stage 2: Manana */}
          <div className="bg-gradient-to-b from-amber-950/20 to-slate-900/90 rounded-3xl p-8 border border-amber-500/40 shadow-xl shadow-amber-500/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/30">Stage 02 • Core Engine</span>
                <span className="text-sm font-bold text-amber-400 font-mono">मननम्</span>
              </div>
              <h3 className="text-2xl font-black text-white mb-1">Manana</h3>
              <div className="text-xs font-semibold text-orange-300 mb-4">Reflective Inquiry &amp; Socratic Debate</div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                The heart of building thinkers. A seeker is forbidden from blind belief. Through dialectical debate (Tarka), questioning assumptions, and testing paradoxes, knowledge transforms into unshakable conviction.
              </p>

              <div className="space-y-2.5 pt-2 border-t border-amber-900/30">
                <div className="text-xs font-bold text-amber-200">Supported by Vgurukool:</div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="text-orange-400">▸</span>
                  <span><strong>Socratic AI Acharyas:</strong> AI that questions instead of spoon-feeding</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="text-orange-400">▸</span>
                  <span><strong>Dialectical Debates:</strong> Challenge philosophies with Brihaspati &amp; Chanakya</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="text-orange-400">▸</span>
                  <span><strong>Acharya DeepTutor:</strong> Socratic guidance on tough ethical dilemmas</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-amber-900/40">
              <a href="#acharyas" className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center justify-between">
                <span>Try an Acharya Inquiry Session</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Stage 3: Nididhyasana */}
          <div className="bg-slate-900/70 rounded-3xl p-8 border border-slate-800 hover:border-emerald-500/30 transition duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Stage 03</span>
                <span className="text-sm font-bold text-slate-400 font-mono">निदिध्यासनम्</span>
              </div>
              <h3 className="text-2xl font-black text-white mb-1">Nididhyasana</h3>
              <div className="text-xs font-semibold text-emerald-300 mb-4">Experiential Mastery &amp; Lived Integration</div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                Wisdom is only real when embodied in action. Nididhyasana is the habitual internalization of truth into daily life, decision-making, emotional mastery, family stewardship, and ethical wealth generation.
              </p>

              <div className="space-y-2.5 pt-2 border-t border-slate-800">
                <div className="text-xs font-bold text-slate-200">Supported by Vgurukool:</div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-emerald-400">▸</span>
                  <span><strong>Ashta Lakshmi LifeOS:</strong> Daily 8-dimension lifestyle balance audit</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-emerald-400">▸</span>
                  <span><strong>Karma Vijaya:</strong> Ethical action and scenario simulation engine</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-emerald-400">▸</span>
                  <span><strong>Granth &amp; Svadhyaya:</strong> Lifelong self-directed scripture study</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80">
              <a href="#ashta-lakshmi" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center justify-between">
                <span>Audit Your Life Flourishing</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE SOVEREIGN AI ACHARYAS */}
      <section id="acharyas" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-900">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 3 • Guru-Shishya Parampara Reimagined</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Personal AI Acharyas for Every Seeker
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-3xl mx-auto">
            In antiquity, the Guru observed the student's unique constitution, asking poignant questions rather than handing down dogma. Our specialized sovereign AI Acharyas revive this personalized inquiry across all vital fields of life.
          </p>
        </div>

        {/* Interactive Acharyas Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Acharya Selector List (5 Columns) */}
          <div className="lg:col-span-5 space-y-3">
            {Object.keys(ACHARYAS).map((key) => {
              const item = ACHARYAS[key];
              const isSelected = selectedAcharyaKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedAcharyaKey(key)}
                  className={`w-full text-left p-4 rounded-2xl border transition duration-200 flex items-center gap-4 ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/40 text-white shadow-lg shadow-amber-500/5'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: item.badgeColor }}
                  >
                    {item.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-base">{item.name}</h4>
                      <span className="text-xs font-mono" style={{ color: item.accentColor }}>{item.devanagari}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{item.tagline}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Acharya Interactive Dialogue Sandbox (7 Columns) */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative min-h-[460px]">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activeAcharya.avatar}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{activeAcharya.name}</h3>
                    <p className="text-xs font-medium" style={{ color: activeAcharya.accentColor }}>
                      {activeAcharya.role}
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Socratic Mode Active
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {activeAcharya.desc}
              </p>

              {/* Socratic Dialogue Box */}
              <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800 space-y-3 mb-6">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Simulated Socratic Exchange</span>
                  <span className="text-amber-400">Guru-Shishya Dialog</span>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-[10px] flex items-center justify-center font-bold flex-shrink-0">
                    You
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200">
                    {activeAcharya.sampleQuestion}
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div 
                    className="w-6 h-6 rounded-full text-[10px] flex items-center justify-center font-bold flex-shrink-0"
                    style={{ backgroundColor: activeAcharya.badgeColor }}
                  >
                    {activeAcharya.avatar}
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 leading-relaxed">
                    <p className="font-semibold mb-1" style={{ color: activeAcharya.accentColor }}>
                      {activeAcharya.socraticReply.lead}
                    </p>
                    <p className="text-slate-300">{activeAcharya.socraticReply.text}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-400">Powered by CAIPE Multi-Agent &amp; LiteLLM Gateway</span>
              <a 
                href={activeAcharya.caipeUrl} 
                target="_blank" 
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 text-slate-950 font-bold text-xs shadow-lg transition flex items-center gap-1.5"
              >
                <span>Launch Live Dialogue in CAIPE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE INTEGRATED VGURUKOOL SOVEREIGN ECOSYSTEM */}
      <section id="ecosystem" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-900">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 4 • Unified Wisdom Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            The Sovereign Gurukul Ecosystem
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-3xl mx-auto">
            Every tool in Vgurukool is an interconnected organ of a singular sanctuary for thinkers. Single Sign-On via Keycloak OIDC, backed by resilient cloud-native infrastructure.
          </p>
        </div>

        {/* Ecosystem Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. LearnHouse LMS */}
          <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-800 hover:border-blue-500/40 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-lg">🎓</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Production</span>
              </div>
              <h4 className="text-lg font-bold text-white">LearnHouse Academy</h4>
              <div className="text-xs font-mono text-slate-400 mb-2">learnhouse.vgurukool.com</div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Structured micro-lesson masterclasses. Flagship 18-week Bhagavad Gita cohort with 182 activities, chapter assessments, and authentic recitation labs.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800/80">
              <a href="https://learnhouse.vgurukool.com" target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center justify-between">
                <span>Enter Academy</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 2. Granth Digital Library */}
          <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-800 hover:border-amber-500/40 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-lg">📖</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Production</span>
              </div>
              <h4 className="text-lg font-bold text-white">Granth Sovereign Library</h4>
              <div className="text-xs font-mono text-slate-400 mb-2">granth.vgurukool.com</div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                A digital sanctuary powered by Calibre-Web for primary Shastras, Upanishads, and commentaries. Multi-device reader with EPUB/PDF sovereign access.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800/80">
              <a href="https://granth.vgurukool.com" target="_blank" rel="noreferrer" className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center justify-between">
                <span>Browse Canonical Texts</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 3. Acharya DeepTutor & CAIPE */}
          <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-800 hover:border-purple-500/40 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-lg">🤖</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Live Gateway</span>
              </div>
              <h4 className="text-lg font-bold text-white">CAIPE &amp; DeepTutor</h4>
              <div className="text-xs font-mono text-slate-400 mb-2">caipe.vgurukool.com</div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Multi-agent cognitive orchestration. Engage in dialectical debate with Brihaspati, Chanakya, Kubera, and Dhanvantari through our sovereign LiteLLM proxy.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800/80">
              <a href="https://caipe.vgurukool.com" target="_blank" rel="noreferrer" className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center justify-between">
                <span>Open AI Council</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 4. Ashta Lakshmi LifeOS */}
          <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/40 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-lg">☸</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active Portal</span>
              </div>
              <h4 className="text-lg font-bold text-white">Ashta Lakshmi Mandala</h4>
              <div className="text-xs font-mono text-slate-400 mb-2">ashta-lakshmi.vgurukool.com</div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Holistic prosperity diagnostic. 40-metric audit across liquid capital, food vitality, courage, family legacy, leadership, and primordial peace.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800/80">
              <a href="https://ashta-lakshmi.vgurukool.com" target="_blank" rel="noopener" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center justify-between">
                <span>Launch Life Flourishing Audit</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 5. Bhasha Vidya & Sanskrit Labs */}
          <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-800 hover:border-pink-500/40 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center font-bold text-lg">🗣️</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Roadmap</span>
              </div>
              <h4 className="text-lg font-bold text-white">Bhasha Vidya (FreeLingo)</h4>
              <div className="text-xs font-mono text-slate-400 mb-2">bhasha.vgurukool.com</div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Interactive spoken Sanskrit, Chandas chanting meter verification, and Paninian grammar labs for pristine Vedic articulation.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800/80">
              <span className="text-xs text-slate-500 font-medium">Integration in Progress</span>
            </div>
          </div>

          {/* 6. Incorg Document Intelligence */}
          <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-800 hover:border-teal-500/40 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-lg">⚡</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Production API</span>
              </div>
              <h4 className="text-lg font-bold text-white">Incorg &amp; Open Banking</h4>
              <div className="text-xs font-mono text-slate-400 mb-2">incorg.vgurukool.com</div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Deterministic document OCR and dense FAISS vector RAG pipeline. Powers financial statement parsing for Dhana Lakshmi's Vedic spending analysis.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800/80">
              <a href="https://incorg.vgurukool.com" target="_blank" rel="noreferrer" className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center justify-between">
                <span>Explore Incorg API</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: ASHTA LAKSHMI — REPOSITIONED AS 8 DIMENSIONS OF HUMAN FLOURISHING */}
      <section id="ashta-lakshmi" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-900">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 5 • The Measure of Genuine Flourishing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ashta Lakshmi: The 8-Fold Compass
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-3xl mx-auto">
            In the Gurukul tradition, education never ended with academic marks. Real success was defined as <strong className="text-white">Rta</strong>—an interconnected harmony across eight forms of human abundance.
          </p>
        </div>

        {/* Featured LifeOS Balance Canvas */}
        <div className="bg-gradient-to-br from-slate-900/90 via-slate-900 to-emerald-950/20 border border-emerald-500/25 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs font-bold">
                <span>🌿 Beyond Mere Financial Capital</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                Why High GPA Without Character and Vitality is Failure
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                A deficit in physical vitality (Dhanya) clouds cognitive discernment (Vidya). A lack of ethical courage (Dhairya) cripples purposeful execution (Vijaya). The Ashta Lakshmi framework gives you a quantitative mirror into your full life equilibrium.
              </p>

              {/* 8 Pillars Micro-Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <div className="text-pink-400 text-xs font-bold">1. Adi</div>
                  <div className="text-slate-200 text-xs font-medium">Primordial Peace</div>
                </div>
                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <div className="text-emerald-400 text-xs font-bold">2. Dhana</div>
                  <div className="text-slate-200 text-xs font-medium">Liquid Capital</div>
                </div>
                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <div className="text-amber-400 text-xs font-bold">3. Dhanya</div>
                  <div className="text-slate-200 text-xs font-medium">Vitality &amp; Food</div>
                </div>
                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <div className="text-purple-400 text-xs font-bold">4. Gaja</div>
                  <div className="text-slate-200 text-xs font-medium">Grace &amp; Impact</div>
                </div>
                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <div className="text-cyan-400 text-xs font-bold">5. Santana</div>
                  <div className="text-slate-200 text-xs font-medium">Family Legacy</div>
                </div>
                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <div className="text-rose-400 text-xs font-bold">6. Dhairya</div>
                  <div className="text-slate-200 text-xs font-medium">Courage &amp; Grit</div>
                </div>
                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <div className="text-yellow-400 text-xs font-bold">7. Vijaya</div>
                  <div className="text-slate-200 text-xs font-medium">Victory / Efficacy</div>
                </div>
                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <div className="text-sky-400 text-xs font-bold">8. Vidya</div>
                  <div className="text-slate-200 text-xs font-medium">Sacred Mastery</div>
                </div>
              </div>

              {/* Single Ashta Lakshmi Portal CTA (Dhana button removed) */}
              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="https://ashta-lakshmi.vgurukool.com"
                  target="_blank"
                  rel="noopener"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20 transition flex items-center space-x-2"
                >
                  <span>Ashta Lakshmi Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Visual Flourishing Radar Preview */}
            <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Flourishing Equilibrium</span>
                <span className="text-xs font-mono text-emerald-400">Index: 84 / 100</span>
              </div>

              <div className="space-y-2.5 text-xs">
                {[
                  { name: 'Vidya Lakshmi (Wisdom & Critical Thinking)', score: 92, color: 'bg-blue-500' },
                  { name: 'Adi Lakshmi (Spiritual Inner Peace)', score: 88, color: 'bg-pink-500' },
                  { name: 'Dhanya Lakshmi (Health & Nutritional Vitality)', score: 82, color: 'bg-amber-500' },
                  { name: 'Dhairya Lakshmi (Courage & Resilience)', score: 85, color: 'bg-rose-500' },
                  { name: 'Dhana Lakshmi (Resource Stewardship)', score: 78, color: 'bg-emerald-500' },
                  { name: 'Santana Lakshmi (Family Legacy & Heritage)', score: 86, color: 'bg-cyan-500' },
                  { name: 'Gaja Lakshmi (Leadership & Community Impact)', score: 74, color: 'bg-purple-500' },
                  { name: 'Vijaya Lakshmi (Execution Efficacy & Overcoming)', score: 80, color: 'bg-yellow-500' }
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

      {/* SECTION 6: CONTACT US */}
      <ContactSection />

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <VgurukoolLogo className="w-5 h-5 inline-block" glow={false} />
            <span className="text-amber-400 font-bold text-sm tracking-wide">Vgurukool</span>
            <span>•</span>
            <span>Ancient Wisdom &amp; Modern Sovereign Intelligence</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="https://ashta-lakshmi.vgurukool.com/" target="_blank" rel="noopener" className="hover:text-slate-300">Ashta Lakshmi Portal</a>
            <a href="https://learnhouse.vgurukool.com" target="_blank" rel="noreferrer" className="hover:text-slate-300">LearnHouse LMS</a>
            <a href="https://granth.vgurukool.com" target="_blank" rel="noreferrer" className="hover:text-slate-300">Granth Library</a>
            <a href="https://platform.vgurukool.com" target="_blank" rel="noreferrer" className="hover:text-slate-300">Keycloak IAM</a>
            <a href="#contact" className="text-amber-400 hover:text-amber-300 transition">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
