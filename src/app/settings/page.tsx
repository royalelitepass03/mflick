import { createClient } from '@/lib/supabase/server';
import Sidebar from '@/components/Sidebar';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  const avatar = profile?.avatar_url || 'https://i.pravatar.cc/150?img=12';
  const displayName = profile?.full_name || user.email || 'You';
  const usernameVal = profile?.username ? '@' + profile.username : '@user';
  const emailVal = user.email || '';
  const birthdateVal = profile?.birthdate || '';

  return (
    <div className="min-h-screen flex bg-bg-main">
      <Sidebar active="/settings" profile={profile || undefined} />
      <main className="flex-1 min-w-0 bg-bg-settings border-r border-[#242832]">
        <div className="max-w-xl mx-auto px-6 py-10">
          <h2 className="font-display text-3xl font-semibold text-[#F0F2F5] mb-2 tracking-tight">Settings</h2>
          <p className="text-[#8A9099] text-sm mb-8">Manage your account, privacy, and preferences.</p>
          <div className="bg-[#08090D] border border-[#242832] rounded-2xl p-6 shadow-xl space-y-6">
            <section>
              <h3 className="font-display text-lg font-semibold text-[#F0F2F5] mb-4">Profile</h3>
              <div className="flex items-center gap-4 mb-4">
                <img src={avatar} alt="Profile" className="w-16 h-16 rounded-full ring-2 ring-[#242832] object-cover" />
                <div>
                  <p className="font-bold text-[#F0F2F5]">{displayName}</p>
                  <p className="text-sm text-[#8A9099]">{usernameVal}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label className="text-xs text-[#8A9099] uppercase tracking-wider block mb-1">Username</label><input defaultValue={usernameVal} className="w-full px-3 py-2 rounded-lg bg-[#101217] border border-[#242832] text-sm text-[#F0F2F5] outline-none focus:border-[#E8A93F]/60" readOnly /></div>
                <div><label className="text-xs text-[#8A9099] uppercase tracking-wider block mb-1">Email</label><input defaultValue={emailVal} className="w-full px-3 py-2 rounded-lg bg-[#101217] border border-[#242832] text-sm text-[#F0F2F5] outline-none focus:border-[#E8A93F]/60" readOnly /></div>
                <div><label className="text-xs text-[#8A9099] uppercase tracking-wider block mb-1">Birthdate</label><input defaultValue={birthdateVal} type="date" className="w-full px-3 py-2 rounded-lg bg-[#101217] border border-[#242832] text-sm text-[#F0F2F5] outline-none focus:border-[#E8A93F]/60" readOnly /></div>
                <div><label className="text-xs text-[#8A9099] uppercase tracking-wider block mb-1">Display Name</label><input defaultValue={displayName} className="w-full px-3 py-2 rounded-lg bg-[#101217] border border-[#242832] text-sm text-[#F0F2F5] outline-none focus:border-[#E8A93F]/60" readOnly /></div>
              </div>
            </section>
            <hr className="border-[#242832]" />
            <section>
              <h3 className="font-display text-lg font-semibold text-[#F0F2F5] mb-4">Privacy</h3>
              <div className="flex items-center justify-between py-2"><span className="text-sm text-[#D1D5DB]">Private profile</span><button className="w-10 h-6 rounded-full bg-[#E8A93F] relative"><span className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white shadow" /></button></div>
              <div className="flex items-center justify-between py-2"><span className="text-sm text-[#D1D5DB]">Allow search</span><button className="w-10 h-6 rounded-full bg-[#242832] relative"><span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-[#8A9099] shadow" /></button></div>
            </section>
            <hr className="border-[#242832]" />
            <section>
              <h3 className="font-display text-lg font-semibold text-[#F0F2F5] mb-4">Danger</h3>
              <button className="px-4 py-2 rounded-lg border border-red-900/60 text-red-400 text-sm font-medium hover:bg-red-950/30 transition">Delete account</button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
