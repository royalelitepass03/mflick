import Sidebar from '@/components/Sidebar';
import { Heart, Repeat2, MessageCircle, Bookmark } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex bg-bg-main">
      <Sidebar active="/profile" />

      <main className="flex-1 min-w-0 bg-bg-feed border-r border-[#242832]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
          {/* Profile header */}
          <div className="bg-[#08090D] border border-[#242832] rounded-2xl overflow-hidden shadow-xl mb-6">
            <div className="h-40 bg-gradient-to-br from-[#151821] via-[#101217] to-[#08090D] relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(232,169,63,0.08),_transparent_70%)]" />
            </div>
            <div className="px-6 pb-6 relative -mt-12">
              <img src="https://i.pravatar.cc/200?img=12" alt="Alex Rivera" className="w-24 h-24 rounded-full ring-4 ring-[#08090D] border-2 border-[#242832] object-cover shadow-xl mb-4" />
              <h1 className="font-display text-2xl font-semibold text-[#F0F2F5]">Alex Rivera</h1>
              <p className="text-[#8A9099] text-sm">@arivera</p>
              <p className="text-[#D1D5DB] text-sm mt-3">Design engineer. Building mFlick for friends. Dark mode enthusiast.</p>
              <div className="flex gap-4 mt-4 text-sm text-[#8A9099]">
                <span>Joined March 2024</span>
                <span>·</span>
                <span>Born March 12, 1995</span>
              </div>
            </div>
            <div className="flex gap-8 px-6 pb-6 text-sm text-[#8A9099]">
              <span className="font-semibold text-[#F0F2F5]">128</span>
              <span className="font-semibold text-[#F0F2F5]">42</span>
              <span className="font-semibold text-[#F0F2F5]">1.2k</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-[#08090D] border border-[#242832] rounded-2xl overflow-hidden shadow-xl">
            <div className="flex border-b border-[#242832]">
              {['Posts', 'Replies', 'Media', 'Likes'].map((tab, i) => (
                <button key={tab} className={`flex-1 py-4 text-sm font-medium transition ${i === 0 ? 'text-[#E8A93F] border-b-2 border-[#E8A93F]' : 'text-[#8A9099] hover:text-[#F0F2F5]'}`}>{tab}</button>
              ))}
            </div>

            {/* Posts */}
            <div className="divide-y divide-[#242832]/40">
              {[
                { content: 'The premium feel of dark glassmorphism is unmatched. Especially with gold accents.', time: '2h', likes: 42, replies: 7, reposts: 3 },
                { content: 'Built this for a private circle. No algorithms, just friends. Feels like how social should be.', time: '1d', likes: 93, replies: 12, reposts: 8 },
                { content: 'Playfair + Inter font pairing = chef kiss. Typography makes or breaks the premium feel.', time: '3d', likes: 28, replies: 4, reposts: 2 },
              ].map((p, i) => (
                <article key={i} className="p-5 hover:bg-[#101217]/30 transition">
                  <p className="text-[#D1D5DB] text-[15px] leading-relaxed mb-3">{p.content}</p>
                  <div className="flex gap-8 text-[#8A9099] text-sm font-medium">
                    <button className="hover:text-[#E8A93F] transition flex items-center gap-1.5"><Heart size={16} /> {p.likes}</button>
                    <button className="hover:text-[#3B82F6] transition flex items-center gap-1.5"><Repeat2 size={16} /> {p.reposts}</button>
                    <button className="hover:text-[#10B981] transition flex items-center gap-1.5"><MessageCircle size={16} /> {p.replies}</button>
                    <button className="hover:text-[#E8A93F] transition flex items-center gap-1.5 ml-auto"><Bookmark size={16} /></button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}