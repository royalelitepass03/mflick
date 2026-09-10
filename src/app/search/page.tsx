import { createClient } from '@/lib/supabase/server';
import Sidebar from '@/components/Sidebar';
import { redirect } from 'next/navigation';
import { Search } from 'lucide-react';

export default async function SearchPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <div className="min-h-screen flex bg-bg-main">
      <Sidebar active="/search" profile={undefined} />
      <main className="flex-1 min-w-0 bg-bg-feed border-r border-[#242832]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <div className="bg-[#08090D] border border-[#242832] rounded-2xl p-4 shadow-xl mb-6 flex items-center gap-3">
            <Search size={18} className="text-[#5a6068]" />
            <input placeholder="Search users or posts..." className="bg-transparent text-sm text-[#F0F2F5] placeholder-[#5a6068] outline-none w-full" />
          </div>
          <div className="text-[#8A9099] text-sm">No results yet. Try searching!</div>
        </div>
      </main>
    </div>
  );
}
