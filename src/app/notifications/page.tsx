import { createClient } from '@/lib/supabase/server';
import Sidebar from '@/components/Sidebar';
import { redirect } from 'next/navigation';
import { Bell, Heart, Repeat2, MessageCircle, AtSign, Check } from 'lucide-react';

export default async function NotificationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <div className="min-h-screen flex bg-bg-main">
      <Sidebar active="/notifications" profile={undefined} />
      <main className="flex-1 min-w-0 bg-bg-feed border-r border-[#242832]">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <h2 className="font-display text-3xl font-semibold text-[#F0F2F5] mb-6 tracking-tight">Notifications</h2>
          <p className="text-[#8A9099] text-sm">No notifications yet.</p>
        </div>
      </main>
    </div>
  );
}
