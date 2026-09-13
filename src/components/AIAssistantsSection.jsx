import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Coins, 
  HeartPulse, 
  BookOpen, 
  Compass, 
  ExternalLink,
  ShieldCheck,
  Zap,
  ArrowRight,
  Layers,
  CheckCircle2,
  Lock,
  Cpu
} from 'lucide-react';

export const ASSISTANTS = [
  {
    id: 'kubera',
    name: 'Kubera',
    devanagari: 'कुबेर',
    title: 'The Vedic Treasurer & Lord of Wealth',
    avatar: '🪙',
    accentColor: '#F59E0B',
    gradient: 'from-amber-500/20 via-amber-500/10 to-transparent',
    borderColor: 'rgba(245, 158, 11, 0.3)',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    tagline: 'Advisor on Artha, Ethical Prosperity & Wealth Stewardship',
    description: 'Specializes in ethical finance, conscious investment, resource management, and the harmony between material prosperity (Artha) and spiritual righteousness (Dharma).',
    capabilities: [
      'Ashta Lakshmi Wealth Blueprinting',
      'Ethical Capital Allocation & Investment',
      'Kautilyan Resource Governance'
    ],
    samplePrompts: [
      'How does Vedic philosophy view wealth creation and ethical abundance?',
      'What is the relationship between Artha (wealth) and Dharma (righteousness)?'
    ],
    caipeUrl: 'https://caipe.vgurukool.com/chat?agent=kubera'
  },
  {
    id: 'dhanvantari',
    name: 'Dhanvantari',
    devanagari: 'धन्वन्तरि',
    title: 'The Celestial Healer & Lord of Ayurveda',
    avatar: '🌿',
    accentColor: '#10B981',
    gradient: 'from-emerald-500/20 via-emerald-500/10 to-transparent',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    tagline: 'Guide on Holistic Wellbeing, Dinacharya & Mind-Body Vitality',
    description: 'Offers guidance on Ayurvedic living, mental calmness, seasonal nutrition (Ritucharya), daily biological rhythms (Dinacharya), and preventative vitality (Ojas).',
    capabilities: [
      'Tridosha Balance (Vata, Pitta, Kapha)',
      'Brahma Muhurta & Dinacharya Alignment',
      'Sattvic Nutrition & Agni Optimization'
    ],
    samplePrompts: [
      'What are the foundational principles of Dinacharya (daily routine) for peak vitality?',
      'How do the three Doshas affect daily productivity and mental clarity?'
    ],
    caipeUrl: 'https://caipe.vgurukool.com/chat?agent=dhanvantari'
  },
  {
    id: 'brihaspati',
    name: 'Brihaspati',
    devanagari: 'बृहस्पति',
    title: 'Guru of the Devas & Master of Philosophy',
    avatar: '✨',
    accentColor: '#8B5CF6',
    gradient: 'from-purple-500/20 via-purple-500/10 to-transparent',
    borderColor: 'rgba(139, 92, 246, 0.3)',
    bgColor: 'rgba(139, 92, 246, 0.1)',
    badgeBg: 'rgba(139, 92, 246, 0.15)',
    tagline: 'Mentor on Vedanta, Upanishadic Inquiry & Intellectual Clarity',
    description: 'Illuminates the profound teachings of Advaita Vedanta, the nature of non-dual consciousness (Brahman & Atman), moral discernment, and philosophical mastery.',
    capabilities: [
      'Advaita & Upanishadic Mahavakyas',
      'The 4 Purusharthas (Dharma, Artha, Kama, Moksha)',
      'Nishkama Karma in Modern Life'
    ],
    samplePrompts: [
      'What is the true essence of "Tat Tvam Asi" in the Chandogya Upanishad?',
      'How can one practice Nishkama Karma (detached action) in a high-demand career?'
    ],
    caipeUrl: 'https://caipe.vgurukool.com/chat?agent=brihaspati'
  },
  {
    id: 'saraswati-vyasa',
    name: 'Veda Vyasa & Saraswati',
    devanagari: 'वेदव्यास & सरस्वती',
    title: 'Keepers of Sacred Slokas & Sanskrit Chanting',
    avatar: '🪷',
    accentColor: '#38BDF8',
    gradient: 'from-sky-500/20 via-sky-500/10 to-transparent',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    bgColor: 'rgba(56, 189, 248, 0.1)',
    badgeBg: 'rgba(56, 189, 248, 0.15)',
    tagline: 'Scholars of Bhagavad Gita Verses, Sanskrit Metrics & Chanting Labs',
    description: 'Assists with verse transliteration, word-by-word Sanskrit etymology (Padachheda & Anvaya), chanting meter (Chandas), and deep hermeneutic analysis of sacred texts.',
    capabilities: [
      'Gita Chapter-by-Chapter Exegesis',
      'Sanskrit Meter (Anushtubh, Trishtubh)',
      'Vedic Articulation & Pronunciation Rules'
    ],
    samplePrompts: [
      'Break down the grammatical and philosophical meaning of Gita Chapter 2, Verse 47.',
      'Explain the Anushtubh meter used across classical Bhagavad Gita slokas.'
    ],
    caipeUrl: 'https://caipe.vgurukool.com/chat?agent=saraswati-vyasa'
  },
  {
    id: 'chanakya',
    name: 'Chanakya',
    devanagari: 'चाणक्य / कौटिल्य',
    title: 'Master of Statecraft, Rajaneeti & Execution',
    avatar: '🏛️',
    accentColor: '#F43F5E',
    gradient: 'from-rose-500/20 via-rose-500/10 to-transparent',
    borderColor: 'rgba(244, 63, 94, 0.3)',
    bgColor: 'rgba(244, 63, 94, 0.1)',
    badgeBg: 'rgba(244, 63, 94, 0.15)',
    tagline: 'Architect of Pragmatic Strategy, Leadership & Crisis Governance',
    description: 'Delivers incisive, realistic counsel rooted in the Arthashastra and Chanakya Niti. Focuses on disciplined execution, organizational resilience, and strategic negotiation.',
    capabilities: [
      'Saptanga Theory of Organizational Structure',
      'Crisis Leadership & Risk Mitigation',
      'Strategic Negotiation & Alliance Building'
    ],
    samplePrompts: [
      'How can founders apply the Saptanga theory to resilient organizational governance?',
      'What are Chanakya’s core principles for navigating high-stakes crisis negotiation?'
    ],
    caipeUrl: 'https://caipe.vgurukool.com/chat?agent=chanakya'
  }
];

export function AIAssistantsSection() {
  const [selectedAgent, setSelectedAgent] = useState(ASSISTANTS[0]);

  return (
    <section id="ai-assistants" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Bot className="w-4 h-4 text-amber-400" />
          <span>Section 4 • Autonomous Vedic Intelligence</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Vedic AI Agents &amp; Socratic Guides
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-3xl mx-auto">
          Consult specialized autonomous agents powered by <strong>CAIPE (Cloud AI Platform Engineering)</strong>, 
          governed by <strong>Keycloak SSO</strong> and <strong>OpenFGA ReBAC</strong>. Launch an agent to start an interactive Socratic dialogue.
        </p>

        {/* Platform Trust & Security Pill Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Keycloak SSO Authenticated</span>
          </div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span>LiteLLM Sovereign AI Gateway</span>
          </div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>OpenFGA ReBAC Access Control</span>
          </div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>CAIPE Multi-Agent Runtime</span>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ASSISTANTS.map((assistant) => (
          <div
            key={assistant.id}
            className="group relative rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
            style={{
              background: `linear-gradient(180deg, ${assistant.bgColor} 0%, rgba(15, 23, 42, 0.8) 25%)`
            }}
          >
            {/* Top Row: Avatar & Status */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg transition-transform group-hover:scale-105"
                  style={{ 
                    backgroundColor: assistant.bgColor, 
                    border: `1px solid ${assistant.borderColor}` 
                  }}
                >
                  {assistant.avatar}
                </div>

                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Live in CAIPE</span>
                  </span>
                </div>
              </div>

              {/* Title and Devanagari */}
              <div className="mb-3">
                <div className="flex items-baseline space-x-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {assistant.name}
                  </h3>
                  <span className="text-xs font-semibold text-slate-400">
                    {assistant.devanagari}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-400 mt-0.5">
                  {assistant.title}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {assistant.description}
              </p>

              {/* Capabilities Chips */}
              <div className="space-y-1.5 mb-6">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Core Capabilities
                </div>
                {assistant.capabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: assistant.accentColor }} />
                    <span className="truncate">{cap}</span>
                  </div>
                ))}
              </div>

              {/* Sample Prompt Preview */}
              <div className="mb-6 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Sample Inquiry</span>
                </div>
                <p className="text-xs italic text-slate-300 line-clamp-2">
                  "{assistant.samplePrompts[0]}"
                </p>
              </div>
            </div>

            {/* CTA: Launch Agent in CAIPE */}
            <div className="pt-2 border-t border-slate-800/80">
              <a
                href={assistant.caipeUrl}
                target="_blank"
                rel="noopener"
                className="w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-md group-hover:shadow-lg"
                style={{
                  backgroundColor: assistant.accentColor,
                  color: '#020617'
                }}
              >
                <span>Launch {assistant.name}</span>
                <ExternalLink className="w-4 h-4 text-slate-950" />
              </a>
              <div className="mt-2 text-center">
                <span className="text-[10px] text-slate-500">
                  Redirects securely via Keycloak SSO to CAIPE Chat
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Studio / Custom Agents Card */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-indigo-500/30 p-6 flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-300">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-3xl text-indigo-400">
                <Cpu className="w-7 h-7" />
              </div>
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <span>Enterprise Studio</span>
              </span>
            </div>

            <div className="mb-3">
              <h3 className="text-xl font-bold text-white">
                Custom Dynamic Agents
              </h3>
              <p className="text-xs font-medium text-slate-400 mt-0.5">
                CAIPE Autonomous Agent Studio
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Build, test, and orchestrate custom AI agents with MCP tools, system prompts, automated workflows, and multi-turn human-in-the-loop approvals.
            </p>

            <div className="space-y-1.5 mb-6">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Studio Features
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                <span>Custom System Prompts &amp; Personas</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                <span>Tool Execution (Web, Python, MCP)</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                <span>Multi-Agent Swarm Orchestration</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            <a
              href="https://caipe.vgurukool.com/dynamic-agents"
              target="_blank"
              rel="noopener"
              className="w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md hover:shadow-indigo-500/25"
            >
              <span>Explore CAIPE Agent Hub</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <div className="mt-2 text-center">
              <span className="text-[10px] text-slate-500">
                Access full Agent Builder &amp; Workflow Studio
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Integration Callout */}
      <div className="mt-12 rounded-2xl bg-slate-900/50 border border-slate-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              Single Sign-On (SSO) Enabled across Vgurukool &amp; CAIPE
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Your logged-in session on Vgurukool carries seamlessly to CAIPE. No separate registration or re-authentication required.
            </p>
          </div>
        </div>
        <a
          href="https://caipe.vgurukool.com/chat"
          target="_blank"
          rel="noopener"
          className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition border border-slate-700 flex items-center space-x-2"
        >
          <span>Open CAIPE Chat</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>
    </section>
  );
}
