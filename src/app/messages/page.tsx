import { createClient } from '@/lib/supabase/server';
import Sidebar from '@/components/Sidebar';
import { redirect } from 'next/navigation';

export default async function MessagesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <div className="min-h-screen flex bg-bg-main">
      <Sidebar active="/messages" profile={undefined} />
      <main className="flex-1 min-w-0 bg-bg-feed border-r border-[#242832]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <h2 className="font-display text-3xl font-semibold text-[#F0F2F5] tracking-tight mb-6">Messages</h2>
          <p className="text-[#8A9099] text-sm">No messages yet. Start a conversation!</p>
        </div>
      </main>
    </div>
  );
}
