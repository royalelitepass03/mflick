import Sidebar from '@/components/Sidebar';
import { Search, MoreHorizontal } from 'lucide-react';

export default function MessagesPage() {
  return (
    <div className="min-h-screen flex bg-bg-main">
      <Sidebar active="/messages" />

      <main className="flex-1 min-w-0 bg-bg-feed border-r border-[#242832]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-3xl font-semibold text-[#F0F2F5] tracking-tight">Messages</h2>
            <button className="p-2 rounded-full hover:bg-[#101217] text-[#8A9099] hover:text-[#F0F2F5] transition"><MoreHorizontal size={20} /></button>
          </div>

          <div className="bg-[#08090D] border border-[#242832] rounded-2xl p-4 shadow-xl mb-6 flex items-center gap-3">
            <Search size={18} className="text-[#5a6068]" />
            <input placeholder="Search messages" className="bg-transparent text-sm text-[#F0F2F5] placeholder-[#5a6068] outline-none w-full" />
          </div>

          <div className="flex flex-col gap-1">
            {[
              { name: 'Jordan Lee', handle: '@jordanlee', msg: 'The dark glassmorphism looks incredible.', time: '2m', avatar: 'https://i.pravatar.cc/150?img=33', unread: 2 },
              { name: 'Sofia Reed', handle: '@sreed', msg: 'Can you send me the design file?', time: '15m', avatar: 'https://i.pravatar.cc/150?img=47', unread: 0 },
              { name: 'Marcus Chen', handle: '@mchen', msg: 'See you at the private circle meeting?', time: '1h', avatar: 'https://i.pravatar.cc/150?img=68', unread: 0 },
              { name: 'Emily Park', handle: '@epark', msg: 'Love the gold accent — so premium.', time: '3h', avatar: 'https://i.pravatar.cc/150?img=20', unread: 0 },
            ].map((c, i) => (
              <a key={i} href="#" className="flex items-center gap-3.5 px-3 py-3.5 rounded-xl hover:bg-[#101217]/60 transition border-b border-[#242832]/40 last:border-b-0">
                <div className="relative shrink-0">
                  <img src={c.avatar} alt={c.name} className="w-11 h-11 rounded-full ring-2 ring-[#242832] object-cover" />
                  {c.unread > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-[#E8A93F] rounded-full border-2 border-[#101217]" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="font-semibold text-[#F0F2F5] truncate">{c.name}</h4>
                    <span className="text-[11px] text-[#5a6068] shrink-0">{c.time}</span>
                  </div>
                  <p className="text-sm text-[#8A9099] truncate">{c.msg}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
