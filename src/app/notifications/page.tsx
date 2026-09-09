import Sidebar from '@/components/Sidebar';
import { Bell, Heart, Repeat2, MessageCircle, AtSign, Check } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <div className="min-h-screen flex bg-bg-main">
      <Sidebar active="/notifications" />

      <main className="flex-1 min-w-0 bg-bg-feed border-r border-[#242832]">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <h2 className="font-display text-3xl font-semibold text-[#F0F2F5] mb-6 tracking-tight">Notifications</h2>

          <div className="flex flex-col gap-2">
            {[
              { type: 'like', user: 'Jordan Lee', handle: '@jordanlee', text: 'liked your post.', time: '2m', avatar: 'https://i.pravatar.cc/150?img=33' },
              { type: 'repost', user: 'Sofia Reed', handle: '@sreed', text: 'reposted your post.', time: '15m', avatar: 'https://i.pravatar.cc/150?img=47' },
              { type: 'mention', user: 'Marcus Chen', handle: '@mchen', text: 'mentioned you.', time: '1h', avatar: 'https://i.pravatar.cc/150?img=68' },
              { type: 'follow', user: 'Emily Park', handle: '@epark', text: 'followed you.', time: '3h', avatar: 'https://i.pravatar.cc/150?img=20' },
              { type: 'comment', user: 'Jordan Lee', handle: '@jordanlee', text: 'commented on your post.', time: '4h', avatar: 'https://i.pravatar.cc/150?img=33' },
            ].map((n, i) => (
              <a key={i} href="#" className="flex items-start gap-3.5 px-3 py-3.5 rounded-xl hover:bg-[#101217]/60 transition border-b border-[#242832]/40 last:border-b-0">
                <img src={n.avatar} alt={n.user} className="w-10 h-10 rounded-full ring-2 ring-[#242832] object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-[#D1D5DB] leading-snug"><span className="font-semibold text-[#F0F2F5]">{n.user}</span> <span className="text-[#8A9099]">{n.handle}</span> {n.text}</p>
                  <p className="text-[11px] text-[#5a6068] mt-1">{n.time}</p>
                </div>
                <div className="text-[#E8A93F] shrink-0">
                  {n.type === 'like' && <Heart size={18} fill="currentColor" />}
                  {n.type === 'repost' && <Repeat2 size={18} />}
                  {n.type === 'mention' && <AtSign size={18} />}
                  {n.type === 'follow' && <Check size={18} />}
                  {n.type === 'comment' && <MessageCircle size={18} />}
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
