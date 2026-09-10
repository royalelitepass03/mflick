"use client";
import { useState } from 'react';
import { Home, Hash, Bell, Mail, Settings, Search, Menu, X } from 'lucide-react';

export default function Sidebar({ active, profile }: { active: string; profile?: { full_name?: string; username?: string; avatar_url?: string } }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Explore', icon: Hash, href: '/explore' },
    { label: 'Notifications', icon: Bell, href: '/notifications' },
    { label: 'Messages', icon: Mail, href: '/messages' },
    { label: 'Search', icon: Search, href: '/search' },
    { label: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-xl bg-[#151821]/90 border border-[#242832] backdrop-blur-md text-white"
        aria-label="Menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40 h-screen w-72 shrink-0
          bg-[#08090D]/95 border-r border-[#242832] backdrop-blur-xl
          flex flex-col px-6 py-8 transition-transform duration-300 ease-out
          lg:translate-x-0 lg:z-auto
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <a href="/" className="mb-10 flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E8A93F] via-[#C2862B] to-[#8A5A1F] shadow-[0_0_30px_-8px_rgba(232,169,63,0.35)] flex items-center justify-center group-hover:shadow-[0_0_40px_-6px_rgba(232,169,63,0.55)] transition-shadow">
            <span className="font-display text-xl text-[#08090D] font-bold tracking-tighter leading-none">m</span>
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold text-[#F0F2F5] leading-none tracking-tight">mFlick</h1>
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#8A9099] font-medium">Private Social</span>
          </div>
        </a>

        {/* Nav */}
        <nav className="flex-1 flex flex-col gap-1" aria-label="Primary">
          {links.map((l) => {
            const isActive = active === l.href || active === l.label;
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3.5 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-[#101217] text-[#F0F2F5] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_0_1px_rgba(232,169,63,0.15)]'
                    : 'text-[#8A9099] hover:text-[#F0F2F5] hover:bg-[#101217]/60 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]'
                  }
                `}
              >
                <l.icon size={20} strokeWidth={1.8} className={isActive ? 'text-[#E8A93F]' : ''} />
                <span>{l.label}</span>
                {l.label === 'Notifications' && (
                  <span className="ml-auto min-w-[18px] h-[18px] rounded-full bg-[#E8A93F] text-[#08090D] text-[10px] font-extrabold px-1.5 flex items-center justify-center">3</span>
                )}
              </a>
            );
          })}
        </nav>

        {/* User mini */}
        <a href="/settings" className="mt-auto flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#101217]/60 transition-colors group" onClick={() => setMobileOpen(false)}>
          <img src={profile?.avatar_url || 'https://i.pravatar.cc/150?img=12'} alt="Profile" className="w-9 h-9 rounded-full ring-2 ring-[#242832] group-hover:ring-[#E8A93F]/40 transition-all object-cover" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#F0F2F5] truncate">{profile?.full_name || 'You'}</p>
            <p className="text-[11px] text-[#8A9099] truncate">@{profile?.username || 'you'}</p>
          </div>
        </a>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
}
