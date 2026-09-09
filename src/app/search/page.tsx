import Sidebar from '@/components/Sidebar';
import { Search as SearchIcon } from 'lucide-react';

export default function SearchPage() {
  return (
    <div className="min-h-screen flex bg-bg-main">
      <Sidebar active="/search" />

      <main className="flex-1 min-w-0 bg-bg-feed border-r border-[#242832]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <div className="bg-[#08090D] border border-[#242832] rounded-2xl p-4 shadow-xl mb-6 flex items-center gap-3">
            <SearchIcon size={18} className="text-[#5a6068]" />
            <input placeholder="Search users or posts..." className="bg-transparent text-sm text-[#F0F2F5] placeholder-[#5a6068] outline-none w-full" />
          </div>

          <div className="flex flex-col gap-1">
            {[
              { name: 'Jordan Lee', handle: '@jordanlee', avatar: 'https://i.pravatar.cc/150?img=33' },
              { name: 'Sofia Reed', handle: '@sreed', avatar: 'https://i.pravatar.cc/150?img=47' },
              { name: 'Marcus Chen', handle: '@mchen', avatar: 'https://i.pravatar.cc/150?img=68' },
            ].map((p, i) => (
              <a key={i} href="/profile" className="flex items-center gap-3.5 px-3 py-3.5 rounded-xl hover:bg-[#101217]/60 transition border-b border-[#242832]/40 last:border-b-0">
                <img src={p.avatar} alt={p.name} className="w-11 h-11 rounded-full ring-2 ring-[#242832] object-cover" />
                <div>
                  <p className="font-semibold text-[#F0F2F5]">{p.name}</p>
                  <p className="text-sm text-[#8A9099]">{p.handle}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
