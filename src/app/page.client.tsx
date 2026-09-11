"use client";
import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import Sidebar from '@/components/Sidebar';

export default function HomeClient() {
  const [posts, setPosts] = useState<any[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const supabase = createClient();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { data: { user: u } } = await supabase.auth.getUser();
      setUser(u);
      if (u) {
        const { data: p } = await supabase.from('profiles').select('*').eq('id', u.id).single();
        setProfile(p);
      }
      await loadPosts();
      setLoading(false);
    }
    init();
  }, []);

  // Close menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    }
    if (openMenuId) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [openMenuId]);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/login';
    }
  }, [loading, user]);

  async function loadPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles:profiles(*)')
      .order('created_at', { ascending: false });
    if (!error && data) setPosts(data);
  }

  async function handlePost(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || !user || !profile) return;
    setSubmitting(true);
    const { error } = await supabase.from('posts').insert({ user_id: user.id, content: content.trim() });
    setSubmitting(false);
    if (!error) {
      setContent('');
      await loadPosts();
    } else {
      alert('Post failed: ' + error.message);
    }
  }

  async function handleDeletePost(id: string) {
    setDeletingId(id);
    const { error } = await supabase.from('posts').delete().eq('id', id);
    setDeletingId(null);
    setOpenMenuId(null);
    if (!error) {
      setPosts(posts.filter(p => p.id !== id));
    } else {
      alert('Delete failed: ' + error.message);
    }
  }

  async function handleEditPost(id: string) {
    if (!editContent.trim()) return;
    const { error } = await supabase.from('posts').update({ content: editContent.trim() }).eq('id', id);
    if (!error) {
      setPosts(posts.map(p => p.id === id ? { ...p, content: editContent.trim() } : p));
      setEditingPostId(null);
      setEditContent('');
    } else {
      alert('Edit failed: ' + error.message);
    }
  }

  const avatar = profile?.avatar_url || 'https://i.pravatar.cc/150?img=12';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-main text-[#8A9099] text-lg">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E8A93F] to-[#C2862B] animate-pulse" />
          <span>Loading mFlick...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-main text-[#F0F2F5]">
        <a href="/login" className="px-6 py-3 rounded-full bg-gradient-to-r from-[#E8A93F] to-[#C2862B] text-[#08090D] font-bold shadow-lg">Go to Login</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-bg-main">
      <Sidebar active="/" profile={profile || undefined} />
      <main className="flex-1 min-w-0 bg-bg-feed border-r border-[#242832]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
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

          {/* Post composer */}
          <div className="bg-[#08090D] border border-[#242832] rounded-2xl p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_8px_32px_rgba(0,0,0,0.3)] mb-8 transition hover:border-[#2d3140]">
            <form onSubmit={handlePost} className="flex gap-3">
              <img src={avatar} alt="You" className="w-10 h-10 rounded-full ring-2 ring-[#242832] shrink-0 object-cover" />
              <div className="flex-1">
                <textarea
                  placeholder="What is happening?"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="w-full bg-transparent text-[#F0F2F5] placeholder-[#5a6068] text-[15px] leading-relaxed resize-none outline-none min-h-[72px]"
                  rows={2}
                  disabled={submitting}
                />
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#1a1d23]">
                  <button type="button" className="p-1.5 rounded-full hover:bg-[#101217] text-[#8A9099] hover:text-[#E8A93F] transition" aria-label="Add image">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  </button>
                  <button type="submit" disabled={submitting || !content.trim()} className="px-5 py-2 rounded-full bg-gradient-to-r from-[#E8A93F] to-[#C2862B] text-[#08090D] text-sm font-bold shadow-[0_4px_20px_-4px_rgba(232,169,63,0.5)] hover:shadow-[0_6px_28px_-4px_rgba(232,169,63,0.7)] transition disabled:opacity-50">
                    {submitting ? 'Posting...' : 'Post'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Feed */}
          {posts.length === 0 ? (
            <div className="text-[#8A9099] text-sm">No posts yet. Be the first to share!</div>
          ) : (
            posts.map((post: any) => {
              const isOwner = user && post.user_id === user.id;
              const isEditing = editingPostId === post.id;
              const isDeleting = deletingId === post.id;

              return (
                <article key={post.id} className="border-b border-[#242832]/60 py-5 last:border-b-0 hover:bg-[#101217]/30 -mx-3 px-3 rounded-xl transition">
                  <div className="flex gap-3.5">
                    <a href="/profile" className="shrink-0">
                      <img src={post.profiles?.avatar_url || 'https://i.pravatar.cc/150?img=12'} alt={post.profiles?.full_name || 'User'} className="w-10 h-10 rounded-full ring-2 ring-[#242832] hover:ring-[#E8A93F]/40 transition object-cover" />
                    </a>
                    <div className="min-w-0 flex-1">
                      {/* Header row */}
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <a href="/profile" className="font-semibold text-[#F0F2F5] text-[15px] hover:text-[#E8A93F] transition truncate">{post.profiles?.full_name || 'User'}</a>
                          <span className="text-[#8A9099] text-[13px] truncate">@{post.profiles?.username || 'user'}</span>
                          <span className="text-[#5a6068] text-[13px]">·</span>
                          <span className="text-[#5a6068] text-[13px] shrink-0">{post.created_at ? new Date(post.created_at).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', timeZoneName: 'short' }) : 'now'}</span>
                        </div>

                        {/* Three-dot menu — owner only */}
                        {isOwner && (
                          <div className="relative shrink-0 ml-2" ref={openMenuId === post.id ? menuRef : undefined}>
                            <button
                              onClick={() => setOpenMenuId(openMenuId === post.id ? null : post.id)}
                              className="text-[#8A9099] hover:text-[#F0F2F5] p-1 rounded-full hover:bg-[#101217] transition"
                              aria-label="Post options"
                              disabled={isDeleting}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                            </button>
                            {openMenuId === post.id && (
                              <div className="absolute right-0 top-8 bg-[#101217] border border-[#242832] rounded-xl shadow-2xl z-30 w-36 py-1">
                                <button onClick={() => { setEditingPostId(post.id); setEditContent(post.content); setOpenMenuId(null); }} className="w-full text-left px-4 py-2.5 text-sm text-[#F0F2F5] hover:bg-[#151821] transition">Edit</button>
                                <button onClick={() => {
                                  if (window.confirm('Delete this post? This cannot be undone.')) handleDeletePost(post.id);
                                  else setOpenMenuId(null);
                                }} className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-[#151821] transition" disabled={isDeleting}>
                                  {isDeleting ? 'Deleting...' : 'Delete'}
                                </button>
                                <button onClick={() => setOpenMenuId(null)} className="w-full text-left px-4 py-2.5 text-sm text-[#8A9099] hover:bg-[#151821] transition">Cancel</button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Post content / edit mode */}
                      {isEditing ? (
                        <div className="mb-3">
                          <textarea
                            value={editContent}
                            onChange={e => setEditContent(e.target.value)}
                            rows={3}
                            autoFocus
                            className="w-full bg-[#08090D] border border-[#242832] rounded-xl p-3 text-[#F0F2F5] text-[15px] leading-relaxed outline-none focus:border-[#E8A93F]/60 resize-none"
                          />
                          <div className="flex gap-2 mt-2">
                            <button onClick={() => handleEditPost(post.id)} disabled={!editContent.trim()} className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#E8A93F] to-[#C2862B] text-[#08090D] text-xs font-bold shadow transition disabled:opacity-50">Save</button>
                            <button onClick={() => { setEditingPostId(null); setEditContent(''); }} className="px-4 py-1.5 rounded-full bg-[#101217] text-[#8A9099] text-xs hover:text-[#F0F2F5] transition">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-[#D1D5DB] text-[15px] leading-relaxed mb-3">{post.content}</p>
                      )}

                      {/* Action bar */}
                      <div className="flex gap-6 text-[#8A9099] text-sm font-medium">
                        <button className="hover:text-[#E8A93F] transition flex items-center gap-1.5 group"><span className="group-hover:scale-110 transition-transform">♥</span> 0</button>
                        <button className="hover:text-[#3B82F6] transition flex items-center gap-1.5"><span>↩</span> 0</button>
                        <button className="hover:text-[#10B981] transition flex items-center gap-1.5"><span>💬</span> 0</button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </main>
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
