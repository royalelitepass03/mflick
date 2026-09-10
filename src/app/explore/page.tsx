import { createClient } from '@/lib/supabase/server';
import Sidebar from '@/components/Sidebar';
import { redirect } from 'next/navigation';
import { TrendingUp } from 'lucide-react';

export default async function ExplorePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <div className="min-h-screen flex bg-bg-main">
      <Sidebar active="/explore" profile={undefined} />
      <main className="flex-1 min-w-0 bg-bg-feed border-r border-[#242832]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <h2 className="font-display text-3xl font-semibold text-[#F0F2F5] mb-6 tracking-tight flex items-center gap-3"><TrendingUp size={24} className="text-[#E8A93F]" /> Explore</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['#mFlick', '#PrivateSocial', '#DarkLuxury', '#GlassUI', '#GoldAccent', '#Typography'].map(tag => (
              <a key={tag} href="#" className="bg-[#08090D] border border-[#242832] rounded-2xl p-6 hover:border-[#E8A93F]/30 transition shadow-xl hover:shadow-2xl">
                <h3 className="font-display text-xl font-semibold text-[#F0F2F5]">{tag}</h3>
                <p className="text-sm text-[#8A9099] mt-2">Trending in the private circle.</p>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
