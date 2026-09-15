"use client";
import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email: '', password: '', birthdate: '', name: '', username: '' });
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          username: form.username,
          full_name: form.name,
          birthdate: form.birthdate,
        }
      }
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Check your email for confirmation!');
      window.location.href = '/';
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main px-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#E8A93F]/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#C2862B]/15 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <a href="/" className="flex items-center gap-3 mb-8 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E8A93F] to-[#8A5A1F] shadow-[0_0_30px_-8px_rgba(232,169,63,0.5)] flex items-center justify-center"><span className="font-display text-2xl text-[#08090D] font-bold">m</span></div>
          <h1 className="font-display text-2xl font-semibold text-[#F0F2F5]">mFlick</h1>
        </a>

        <div className="bg-[#08090D]/80 border border-[#242832] rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex gap-1.5 mb-6">
            {[1, 2].map(s => (
              <div key={s} className={`h-1 flex-1 rounded-full ${s === step ? 'bg-[#E8A93F]' : 'bg-[#242832]'}`} />
            ))}
          </div>

          {step === 1 ? (
            <>
              <h2 className="text-xl font-display font-semibold text-[#F0F2F5] mb-1">Join mFlick</h2>
              <p className="text-[#8A9099] text-sm mb-6">Start with your email and password.</p>
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="flex flex-col gap-3.5">
                <label htmlFor="signup-email" className="text-xs font-medium text-[#8A9099] uppercase tracking-wider">Email</label>
                <input id="signup-email" type="email" required placeholder="you@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#101217] border border-[#242832] text-[#F0F2F5] placeholder-[#5a6068] text-sm outline-none focus:border-[#E8A93F]/60 focus:ring-1 focus:ring-[#E8A93F]/20 transition" />

                <label htmlFor="signup-password" className="text-xs font-medium text-[#8A9099] uppercase tracking-wider mt-1">Password</label>
                <input id="signup-password" type="password" required placeholder="••••••••" minLength={6} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#101217] border border-[#242832] text-[#F0F2F5] placeholder-[#5a6068] text-sm outline-none focus:border-[#E8A93F]/60 focus:ring-1 focus:ring-[#E8A93F]/20 transition" />

                <button type="submit" className="mt-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E8A93F] to-[#C2862B] text-[#08090D] font-extrabold text-sm shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2">Continue <ArrowRight size={16} /></button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-xl font-display font-semibold text-[#F0F2F5] mb-1">Your profile</h2>
              <p className="text-[#8A9099] text-sm mb-6">Birthdate, name, and username.</p>
              <form onSubmit={handleSignup} className="flex flex-col gap-3.5">
                <label htmlFor="birthdate" className="text-xs font-medium text-[#8A9099] uppercase tracking-wider">Birthdate</label>
                <input id="birthdate" type="date" required value={form.birthdate} onChange={e => setForm({ ...form, birthdate: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#101217] border border-[#242832] text-[#F0F2F5] text-sm outline-none focus:border-[#E8A93F]/60 focus:ring-1 focus:ring-[#E8A93F]/20 transition" />

                <label htmlFor="name" className="text-xs font-medium text-[#8A9099] uppercase tracking-wider mt-1">Full Name</label>
                <input id="name" type="text" required placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#101217] border border-[#242832] text-[#F0F2F5] placeholder-[#5a6068] text-sm outline-none focus:border-[#E8A93F]/60 focus:ring-1 focus:ring-[#E8A93F]/20 transition" />

                <label htmlFor="username" className="text-xs font-medium text-[#8A9099] uppercase tracking-wider mt-1">Username</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-[#5a6068] text-sm">@</span>
                  <input id="username" type="text" required placeholder="username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} className="w-full pl-8 pr-4 py-3 rounded-xl bg-[#101217] border border-[#242832] text-[#F0F2F5] placeholder-[#5a6068] text-sm outline-none focus:border-[#E8A93F]/60 focus:ring-1 focus:ring-[#E8A93F]/20 transition" />
                </div>

                <button type="submit" disabled={loading} className="mt-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E8A93F] to-[#C2862B] text-[#08090D] font-extrabold text-sm shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2">
                  {loading ? 'Creating...' : <>Create account <Check size={16} /></>}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
