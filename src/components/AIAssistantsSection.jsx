import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Coins, 
  HeartPulse, 
  BookOpen, 
  Compass, 
  RotateCcw,
  Loader2,
  CheckCircle,
  MessageSquare
} from 'lucide-react';

export const ASSISTANTS = [
  {
    id: 'kubera',
    name: 'Kubera',
    title: 'The Vedic Treasurer & Lord of Wealth',
    avatar: '🪙',
    accentColor: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
    tagline: 'Advisor on Artha, Ethical Prosperity & Wealth Stewardship',
    systemRole: 'You are Kubera, the legendary Vedic Treasurer and guardian of cosmic wealth. Provide practical, dignified, ethical counsel on Artha (wealth), resource management, sustainable enterprise, and creating lasting abundance grounded in Dharma.',
    description: 'Specializes in ethical finance, conscious investment, resource management, and the harmony between material prosperity and spiritual dharma.',
    prompts: [
      'How does Vedic philosophy view wealth creation and ethical abundance?',
      'What is the relationship between Artha (wealth) and Dharma (righteousness)?',
      'How can I cultivate the Dhana and Gaja Lakshmi principles in my business?'
    ]
  },
  {
    id: 'dhanvantari',
    name: 'Dhanvantari',
    title: 'The Celestial Healer & Lord of Ayurveda',
    avatar: '🌿',
    accentColor: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    tagline: 'Guide on Holistic Wellbeing, Dinacharya & Mind-Body Vitality',
    systemRole: 'You are Lord Dhanvantari, the primordial physician of the cosmos and originator of Ayurveda. Provide serene, compassionate, and holistic guidance on dinacharya (daily routine), natural vitality (Ojas), mindful nutrition, and mental equilibrium.',
    description: 'Offers guidance on Ayurvedic living, mental calmness, seasonal nutrition (Ritucharya), daily rhythms (Dinacharya), and preventative holistic wellness.',
    prompts: [
      'What are the foundational principles of Dinacharya (daily routine) for peak vitality?',
      'How do the three Doshas (Vata, Pitta, Kapha) affect daily productivity?',
      'What simple breathwork and herbal practices help restore calm during high stress?'
    ]
  },
  {
    id: 'brihaspati',
    name: 'Brihaspati',
    title: 'Guru of the Devas & Master of Philosophy',
    avatar: '✨',
    accentColor: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.1)',
    borderColor: 'rgba(139, 92, 246, 0.3)',
    tagline: 'Mentor on Vedanta, Upanishadic Inquiry & Intellectual Clarity',
    systemRole: 'You are Brihaspati, Guru of the celestial deities and master of deep Vedic philosophy. Offer sharp intellectual clarity, exploring non-dual Vedantic wisdom, self-inquiry, ethics, and clarity in complex life dilemmas.',
    description: 'Illuminates the profound teachings of the Upanishads, the nature of consciousness (Brahman & Atman), moral discernment, and philosophical mastery.',
    prompts: [
      'What is the true essence of "Tat Tvam Asi" in the Chandogya Upanishad?',
      'How can one practice Nishkama Karma (detached action) in a demanding modern career?',
      'How do the four Purusharthas create a balanced life journey?'
    ]
  },
  {
    id: 'saraswati',
    name: 'Veda Vyasa & Saraswati',
    title: 'Keepers of Sacred Slokas & Sanskrit Chanting',
    avatar: '🪷',
    accentColor: '#38BDF8',
    bgColor: 'rgba(56, 189, 248, 0.1)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    tagline: 'Scholars of Bhagavad Gita Verses, Sanskrit Metrics & Chanting Labs',
    systemRole: 'You are the collaborative voice of Maharishi Veda Vyasa and Goddess Saraswati. Provide scholarly, authentic explanations of Bhagavad Gita verses, Sanskrit meter (chandas), grammatical roots, and the spiritual beauty of sacred chanting.',
    description: 'Assists with verse transliteration, word-by-word Sanskrit etymology, chanting meter, and deep hermeneutic analysis of sacred texts.',
    prompts: [
      'Break down the grammatical and philosophical meaning of Gita Chapter 2, Verse 47.',
      'Explain the Anushtubh meter used across most Bhagavad Gita slokas.',
      'How can a beginner start chanting with accurate Vedic pronunciation and svadhyaya?'
    ]
  }
];

export function AIAssistantsSection() {
  const [activeAssistantId, setActiveAssistantId] = useState('kubera');
  const [messages, setMessages] = useState(() => ({
    kubera: [
      { sender: 'assistant', text: 'Hari Om. I am Kubera, guardian of treasures and stewardship. How may I assist your pursuit of ethical prosperity and purposeful wealth today?' }
    ],
    dhanvantari: [
      { sender: 'assistant', text: 'Namaste. I am Dhanvantari, fountain of Ayurvedic healing. How may I guide your physical vitality, mental tranquility, and holistic wellness today?' }
    ],
    brihaspati: [
      { sender: 'assistant', text: 'Salutations, seeker. I am Brihaspati. What inquiry into the Upanishads, Dharma, or Vedantic philosophy stirs in your intellect today?' }
    ],
    saraswati: [
      { sender: 'assistant', text: 'Pranams. We welcome you to the sacred groves of Sanskrit study and Gita recitation. Which verse, meter, or linguistic nuance would you like to explore?' }
    ]
  }));

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef(null);

  const activeAssistant = ASSISTANTS.find(a => a.id === activeAssistantId) || ASSISTANTS[0];
  const currentMessages = messages[activeAssistantId] || [];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages, isLoading]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    setInputText('');
    
    // Append user message
    const updatedMessages = [...currentMessages, { sender: 'user', text }];
    setMessages(prev => ({
      ...prev,
      [activeAssistantId]: updatedMessages
    }));

    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId: activeAssistant.id,
          systemPrompt: activeAssistant.systemRole,
          message: text,
          history: updatedMessages.slice(-6)
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => ({
          ...prev,
          [activeAssistantId]: [...updatedMessages, { sender: 'assistant', text: data.reply }]
        }));
      } else {
        throw new Error('Chat API returned an error');
      }
    } catch (err) {
      console.warn('AI Chat API fallback activated:', err);
      // Contextual fallback based on persona
      let fallbackReply = '';
      if (activeAssistant.id === 'kubera') {
        fallbackReply = `True wealth (Artha) in the Vedic perspective is an instrument of Dharma, not an end in itself. When you cultivate Dhana (monetary discipline) aligned with Vidya (wisdom) and Dhanya (nourishment for your community), prosperity sustains over generations rather than fleeting in speculation. Focus on creating enduring value with integrity.`;
      } else if (activeAssistant.id === 'dhanvantari') {
        fallbackReply = `Ayurveda reminds us: "Swasthasya swasthya rakshanam" — to protect the health of the healthy is our primary duty. Start with your Dinacharya: rise during Brahma Muhurta (before sunrise), cleanse the sensory organs, hydrate with warm water, and honor the digestive fire (Agni) at noon. In stillness, your cellular vitality (Ojas) regenerates naturally.`;
      } else if (activeAssistant.id === 'brihaspati') {
        fallbackReply = `The ancient rishis taught that knowledge is twofold: Paravidya (higher realization of the non-dual Self) and Aparavidya (empirical mastery of arts and sciences). Do not seek merely to accumulate information; seek discerning wisdom (Viveka) that cuts through transient illusions to reveal your changeless inner awareness.`;
      } else {
        fallbackReply = `In the words of the Gita (2.47): "Karmanye vadhikaraste ma phaleshu kadachana." You have sovereignty over your sacred effort and intentional action, never over its fruit. Chanting these words with genuine devotion elevates the mind above anxiety and aligns you with universal purpose.`;
      }

      setMessages(prev => ({
        ...prev,
        [activeAssistantId]: [...updatedMessages, { sender: 'assistant', text: fallbackReply }]
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages(prev => ({
      ...prev,
      [activeAssistantId]: [
        { sender: 'assistant', text: `Conversation reset. Greetings from ${activeAssistant.name}. How may I guide your inquiry today?` }
      ]
    }));
  };

  return (
    <section id="ai-assistants" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Bot className="w-4 h-4 text-amber-400" />
          <span>Section 4 • Interactive Vedic Intelligence</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Vedic AI Assistants &amp; Socratic Guides
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
          Engage in direct, real-time dialogue with dedicated AI personas specialized in wealth stewardship, Ayurveda, Vedantic philosophy, and sacred Sanskrit recitation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Assistant Selector Tabs (Left Col: 4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
            Select an Acharya / Guide
          </div>
          {ASSISTANTS.map((assistant) => {
            const isSelected = assistant.id === activeAssistantId;
            return (
              <button
                key={assistant.id}
                onClick={() => setActiveAssistantId(assistant.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start space-x-3.5 ${
                  isSelected
                    ? 'bg-slate-800/90 shadow-lg ring-1'
                    : 'bg-slate-900/50 hover:bg-slate-800/40 border-slate-800/80 hover:border-slate-700'
                }`}
                style={{
                  borderColor: isSelected ? assistant.accentColor : undefined,
                  boxShadow: isSelected ? `0 4px 20px ${assistant.bgColor}` : undefined
                }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: assistant.bgColor, border: `1px solid ${assistant.borderColor}` }}
                >
                  {assistant.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-base truncate">{assistant.name}</span>
                    {isSelected && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: assistant.bgColor, color: assistant.accentColor }}>
                        Active
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-medium text-slate-400 truncate mt-0.5">
                    {assistant.title}
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {assistant.tagline}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Chat Console Panel (Right Col: 8 cols) */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl flex flex-col h-[600px] overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ backgroundColor: activeAssistant.bgColor, border: `1px solid ${activeAssistant.borderColor}` }}
              >
                {activeAssistant.avatar}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-white text-base leading-tight">{activeAssistant.name}</h3>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <p className="text-xs text-slate-400 truncate">{activeAssistant.title}</p>
              </div>
            </div>

            <button
              onClick={handleResetChat}
              title="Reset Conversation"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-4 py-2.5 bg-slate-900/40 border-b border-slate-800/80 flex items-center space-x-2 overflow-x-auto scrollbar-none text-xs">
            <span className="text-slate-500 flex-shrink-0 font-medium">Try asking:</span>
            {activeAssistant.prompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                className="px-2.5 py-1 rounded-full bg-slate-800/70 hover:bg-slate-700/80 text-slate-300 hover:text-white flex-shrink-0 border border-slate-700/50 transition truncate max-w-xs"
              >
                "{p}"
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {currentMessages.map((msg, index) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={index}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      isUser
                        ? 'bg-amber-600 text-white rounded-br-none shadow-md'
                        : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-bl-none'
                    }`}
                  >
                    {!isUser && (
                      <div className="flex items-center space-x-1.5 text-xs font-bold mb-1" style={{ color: activeAssistant.accentColor }}>
                        <span>{activeAssistant.name}</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800/90 border border-slate-700/60 rounded-2xl rounded-bl-none px-4 py-3 flex items-center space-x-2 text-sm text-slate-400">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>{activeAssistant.name} is reflecting...</span>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/60">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Ask ${activeAssistant.name} about ${activeAssistant.id === 'kubera' ? 'wealth & ethical business' : activeAssistant.id === 'dhanvantari' ? 'wellness & daily habits' : activeAssistant.id === 'brihaspati' ? 'philosophy & karma' : 'Gita verses & chanting'}...`}
                className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold transition flex items-center space-x-1.5"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
