import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  MessageSquare,
  HelpCircle,
  BookOpen,
  Layers,
  ArrowRight
} from 'lucide-react';

const CATEGORIES = [
  'General Inquiry',
  'Vedic Courses & Programs',
  'Ashta Lakshmi Wealth Assessment',
  'Granth Digital Library',
  'AI Vedic Assistants',
  'Partnership & Academic Collaboration',
  'Technical Support'
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Inquiry',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus('error');
      setErrorMessage('Please enter your full name (at least 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address so we can reply to you.');
      return;
    }

    if (!formData.subject.trim()) {
      setStatus('error');
      setErrorMessage('Please enter a brief subject for your inquiry.');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setStatus('error');
      setErrorMessage('Please enter a message with at least 5 characters.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          category: formData.category,
          subject: formData.subject.trim(),
          message: formData.message.trim()
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success !== false) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          category: 'General Inquiry',
          subject: '',
          message: ''
        });
      } else {
        setStatus('error');
        setErrorMessage(data.detail || data.message || 'Unable to send message at this time. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network connection error. Please verify your connection and try again.');
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider uppercase mb-4">
          <Mail className="w-3.5 h-3.5" />
          <span>सम्पर्क • Samvad &amp; Inquiry</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Connect With Vgurukool
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
          Have questions regarding our sovereign Vedic curriculum, the Ashta Lakshmi assessment, 
          Granth digital library, or enterprise collaboration? Send us a message and our mentors will respond directly to your email.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Context & Guarantees */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

            <h3 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              <span>Direct Sovereign Dialogue</span>
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Vgurukool bridges sacred classical wisdom with autonomous sovereign intelligence. Whether you are a student, researcher, educator, or institutional leader, we look forward to hearing from you.
            </p>

            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Rapid Human Response</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Our team reviews all inquiries and typically responds within 24 to 48 business hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Strict Confidentiality</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Your details and correspondence are strictly confidential and will never be shared with third parties.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Personalized Guidance</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Receive direct guidance on tailoring Vedic study paths, personal finance models, or AI research.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Pillars pillbox */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center space-x-2">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Primary Topics We Support</span>
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/50">Bhagavad Gita Journey</span>
              <span className="px-3 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/50">Ashta Lakshmi Diagnostics</span>
              <span className="px-3 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/50">Sanskrit &amp; Chanting Labs</span>
              <span className="px-3 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/50">Sovereign Cloud &amp; AI</span>
              <span className="px-3 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/50">Institutional Access</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative">
            {status === 'success' ? (
              <div className="py-12 px-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30 mb-6 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Dispatched!</h3>
                <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed mb-8">
                  Thank you for reaching out to Vgurukool. Your inquiry has been securely sent to our team, and we will reply directly to your email address shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition border border-slate-700"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Send Us a Message</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill out the form below. We will reply directly to the email address you provide.
                  </p>
                </div>

                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start space-x-3">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Full Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g., Ayush Sharma"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/50 transition disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Email Address <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/50 transition disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/50 transition disabled:opacity-50"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat} className="bg-slate-900 text-white">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Subject <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      placeholder="e.g., Question about Gita course registration"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/50 transition disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Your Message <span className="text-amber-400">*</span>
                    </label>
                    <span className="text-[11px] text-slate-500">
                      {formData.message.length}/5000
                    </span>
                  </div>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    maxLength={5000}
                    placeholder="Write your message, question, or proposal in detail..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/50 transition resize-y disabled:opacity-50"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Your email is strictly protected and never published.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-sm shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
