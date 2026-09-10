import { createClient } from '@/lib/supabase/server';
import Sidebar from '@/components/Sidebar';
import { redirect } from 'next/navigation';
import { Heart, Repeat2, MessageCircle, Bookmark } from 'lucide-react';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  const avatar = profile?.avatar_url || 'https://i.pravatar.cc/200?img=12';
  const name = profile?.full_name || user.email || 'You';
  const username = profile?.username ? '@' + profile.username : '@user';

  return (
    <div className="min-h-screen flex bg-bg-main">
      <Sidebar active="/profile" profile={profile || undefined} />
      <main className="flex-1 min-w-0 bg-bg-feed border-r border-[#242832]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <div className="bg-[#08090D] border border-[#242832] rounded-2xl overflow-hidden shadow-xl mb-6">
            <div className="h-40 bg-gradient-to-br from-[#151821] via-[#101217] to-[#08090D] relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(232,169,63,0.08),_transparent_70%)]" />
            </div>
            <div className="px-6 pb-6 relative -mt-12">
              <img src={avatar} alt={name} className="w-24 h-24 rounded-full ring-4 ring-[#08090D] border-2 border-[#242832] object-cover shadow-xl mb-4" />
              <h1 className="font-display text-2xl font-semibold text-[#F0F2F5]">{name}</h1>
              <p className="text-[#8A9099] text-sm">{username}</p>
              <p className="text-[#D1D5DB] text-sm mt-3">{profile?.bio || 'Private mFlick user.'}</p>
              <div className="flex gap-4 mt-4 text-sm text-[#8A9099]">
                <span>Joined recently</span>
                <span>·</span>
                <span>Active member</span>
              </div>
            </div>
            <div className="flex gap-8 px-6 pb-6 text-sm text-[#8A9099]">
              <span><span className="font-semibold text-[#F0F2F5]">0</span> posts</span>
              <span><span className="font-semibold text-[#F0F2F5]">0</span> likes</span>
              <span><span className="font-semibold text-[#F0F2F5]">0</span> following</span>
            </div>
          </div>
          <div className="bg-[#08090D] border border-[#242832] rounded-2xl overflow-hidden shadow-xl">
            <div className="flex border-b border-[#242832]">
              {['Posts', 'Replies', 'Media', 'Likes'].map((tab, i) => (
                <button key={tab} className={`flex-1 py-4 text-sm font-medium transition ${i === 0 ? 'text-[#E8A93F] border-b-2 border-[#E8A93F]' : 'text-[#8A9099] hover:text-[#F0F2F5]'}`}>{tab}</button>
              ))}
            </div>
            <div className="divide-y divide-[#242832]/40">
              <div className="p-5 text-[#8A9099] text-sm">No posts yet.</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
