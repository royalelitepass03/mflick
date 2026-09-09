# mFlick — How to Update

Folder structure (simplified):
- src/app/page.tsx          → Home / Feed (main page)
- src/app/login/page.tsx     → Login
- src/app/signup/page.tsx    → Sign up (email → birthdate/name/username)
- src/app/settings/page.tsx  → Settings
- src/components/Sidebar.tsx → Left sidebar navigation
- src/lib/supabase.ts        → Database connection (update URLs when live)
- src/app/globals.css        → Colors (#08090D, #101217, #151821, #242832, #E8A93F)

To go live:
1. Create free Supabase project at supabase.com
2. Replace supabaseUrl / anonKey in src/lib/supabase.ts
3. Push to GitHub → Connect to Vercel → Deploy
4. The site is private by obscurity (no public list); share link only with friends
