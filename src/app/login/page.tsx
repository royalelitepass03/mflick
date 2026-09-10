"use client";
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else window.location.href = '/';
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#E8A93F]/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#C2862B]/15 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <a href="/" className="flex items-center gap-3 mb-10 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E8A93F] to-[#8A5A1F] shadow-[0_0_30px_-8px_rgba(232,169,63,0.5)] flex items-center justify-center group-hover:scale-[1.03] transition-transform">
            <span className="font-display text-2xl text-[#08090D] font-bold leading-none">m</span>
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold text-[#F0F2F5] leading-none">mFlick</h1>
            <span className="text-[11px] text-[#8A9099] tracking-[0.12em] uppercase">Private Social</span>
          </div>
        </a>

        <div className="bg-[#08090D]/80 border border-[#242832] rounded-3xl p-8 shadow-[0_0_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <h2 className="text-2xl font-display font-semibold text-[#F0F2F5] mb-2 tracking-tight">Welcome back</h2>
          <p className="text-[#8A9099] text-sm mb-6">Sign in to your private circle.</p>

          <form className="flex flex-col gap-3.5" onSubmit={handleLogin}>
            <label htmlFor="email" className="text-xs font-medium text-[#8A9099] uppercase tracking-wider">Email</label>
            <input id="email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#101217] border border-[#242832] text-[#F0F2F5] placeholder-[#5a6068] text-sm outline-none focus:border-[#E8A93F]/60 focus:ring-1 focus:ring-[#E8A93F]/20 transition" />

            <label htmlFor="password" className="text-xs font-medium text-[#8A9099] uppercase tracking-wider mt-1">Password</label>
            <input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#101217] border border-[#242832] text-[#F0F2F5] placeholder-[#5a6068] text-sm outline-none focus:border-[#E8A93F]/60 focus:ring-1 focus:ring-[#E8A93F]/20 transition" />

            <button type="submit" disabled={loading} className="mt-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E8A93F] to-[#C2862B] text-[#08090D] font-extrabold text-sm shadow-[0_4px_20px_-4px_rgba(232,169,63,0.5)] hover:shadow-[0_6px_28px_-4px_rgba(232,169,63,0.7)] transition flex items-center justify-center gap-2">
              {loading ? 'Logging in...' : <>Log in <ArrowRight size={16} /></>}
            </button>
          </form>

          <div className="relative my-5"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#242832]" /></div><div className="relative flex justify-center"><span className="bg-[#08090D]/80 px-3 text-[11px] text-[#5a6068] uppercase tracking-widest">or</span></div></div>

          <button onClick={handleGoogleLogin} className="w-full py-3 rounded-xl bg-[#101217] border border-[#242832] text-[#F0F2F5] text-sm font-medium hover:bg-[#151821] hover:border-[#2d3140] transition flex items-center justify-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.66-2.22.07-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-[#8A9099] mt-6">New here? <a href="/signup" className="text-[#E8A93F] font-semibold hover:underline">Create an account</a></p>
        </div>
      </div>
    </div>
  );
}
