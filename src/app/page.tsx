import Sidebar from '@/components/Sidebar';

export default function HomePage() {
  return (
    <div className="min-h-screen flex bg-bg-main">
      <Sidebar active="/" />

      {/* Main feed */}
      <main className="flex-1 min-w-0 bg-bg-feed border-r border-[#242832]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl font-semibold text-[#F0F2F5] tracking-tight">Home</h2>
              <p className="text-xs text-[#8A9099] mt-1 tracking-wide">For You · Private Circle</p>
            </div>
            <div className="hidden sm:flex gap-1.5 bg-[#08090D] p-1 rounded-full border border-[#242832]">
              <button className="px-3 py-1 text-xs font-medium rounded-full bg-[#101217] text-[#F0F2F5] shadow-sm border border-[#242832]/50">For You</button>
              <button className="px-3 py-1 text-xs font-medium rounded-full text-[#8A9099] hover:text-[#F0F2F5] transition">Following</button>
            </div>
          </div>

          {/* Create post */}
          <div className="bg-[#08090D] border border-[#242832] rounded-2xl p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_8px_32px_rgba(0,0,0,0.3)] mb-8 transition hover:border-[#2d3140]">
            <div className="flex gap-3">
              <img src="https://i.pravatar.cc/150?img=12" alt="You" className="w-10 h-10 rounded-full ring-2 ring-[#242832] shrink-0 object-cover" />
              <div className="flex-1">
                <textarea
                  placeholder="What is happening?"
                  className="w-full bg-transparent text-[#F0F2F5] placeholder-[#5a6068] text-[15px] leading-relaxed resize-none outline-none min-h-[72px]"
                  rows={2}
                />
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#1a1d23]">
                  <div className="flex gap-2">
                    <button className="p-1.5 rounded-full hover:bg-[#101217] text-[#8A9099] hover:text-[#E8A93F] transition" aria-label="Add image"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></button>
                    <button className="p-1.5 rounded-full hover:bg-[#101217] text-[#8A9099] hover:text-[#E8A93F] transition" aria-label="Emoji"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></button>
                  </div>
                  <button className="px-5 py-2 rounded-full bg-gradient-to-r from-[#E8A93F] to-[#C2862B] text-[#08090D] text-sm font-bold shadow-[0_4px_20px_-4px_rgba(232,169,63,0.5)] hover:shadow-[0_6px_28px_-4px_rgba(232,169,63,0.7)] transition">Post</button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts */}
          {[
            { name: 'Jordan Lee', handle: '@jordanlee', time: '2h', avatar: 'https://i.pravatar.cc/150?img=33', content: 'Just launched a new build of our private design tool. The glassmorphism at dark is unreal. Dark mode is the real luxury.', likes: 42, replies: 7, reposts: 3 },
            { name: 'Sofia Reed', handle: '@sreed', time: '4h', avatar: 'https://i.pravatar.cc/150?img=47', content: 'Anyone else noticing the premium feel of the font pairing? Playfair + Inter is such a clean combo.', likes: 18, replies: 2, reposts: 1 },
            { name: 'Marcus Chen', handle: '@mchen', time: '6h', avatar: 'https://i.pravatar.cc/150?img=68', content: 'Built this site for friends only — private link, invite vibe, no algorithm forcing content. Much better than the open internet.', likes: 93, replies: 12, reposts: 8 },
          ].map((post, i) => (
            <article key={i} className="border-b border-[#242832]/60 py-5 last:border-b-0 hover:bg-[#101217]/30 -mx-3 px-3 rounded-xl transition">
              <div className="flex gap-3.5">
                <a href="/profile" className="shrink-0"><img src={post.avatar} alt={post.name} className="w-10 h-10 rounded-full ring-2 ring-[#242832] hover:ring-[#E8A93F]/40 transition object-cover" /></a>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <a href="/profile" className="font-semibold text-[#F0F2F5] text-[15px] hover:text-[#E8A93F] transition truncate">{post.name}</a>
                    <span className="text-[#8A9099] text-[13px] truncate">{post.handle}</span>
                    <span className="text-[#5a6068] text-[13px]">·</span>
                    <span className="text-[#5a6068] text-[13px]">{post.time}</span>
                  </div>
                  <p className="text-[#D1D5DB] text-[15px] leading-relaxed mb-3">{post.content}</p>
                  <div className="flex gap-6 text-[#8A9099] text-sm font-medium">
                    <button className="hover:text-[#E8A93F] transition flex items-center gap-1.5 group"><span className="group-hover:scale-110 transition-transform">♥</span> {post.likes}</button>
                    <button className="hover:text-[#3B82F6] transition flex items-center gap-1.5"><span>↩</span> {post.reposts}</button>
                    <button className="hover:text-[#10B981] transition flex items-center gap-1.5"><span>💬</span> {post.replies}</button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Right sidebar */}
      <aside className="hidden xl:block w-80 shrink-0 px-8 py-6 sticky top-0 h-screen overflow-y-auto">
        <div className="bg-[#101217] border border-[#242832] rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          <h3 className="font-display text-xl font-semibold text-[#F0F2F5] mb-4">Trending</h3>
          <div className="flex flex-col gap-3">
            {['#mFlick','#PrivateSocial','#DarkLuxury','#GlassUI'].map(tag => (
              <a key={tag} href="/search" className="group">
                <div className="text-[11px] text-[#8A9099]">Trending in mFlick</div>
                <div className="text-[#F0F2F5] font-medium group-hover:text-[#E8A93F] transition">{tag}</div>
                <div className="text-[11px] text-[#5a6068]">1.2k posts</div>
              </a>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
