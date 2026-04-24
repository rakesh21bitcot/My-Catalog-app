import { motion } from 'motion/react';
import { Search, Bell, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setSearchQuery } from '../store/catalogSlice';
import { useMemo } from 'react';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items, searchQuery } = useSelector((state: RootState) => state.catalog);

  const categories = useMemo(() => {
    const counts = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(counts).sort();
  }, [items]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Main Header Row */}
          <div className="flex items-center justify-between h-20 gap-8">
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-800">NexusCatalog</h1>
            </Link>

            {/* Mid Section: Search bar */}
            <div className="hidden md:flex flex-1 max-w-md items-center bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 group focus-within:border-indigo-300 focus-within:bg-white transition-all relative">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-500" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => {
                  dispatch(setSearchQuery(e.target.value));
                  if (pathname !== '/') navigate('/');
                }}
                placeholder="Find catalog entries..." 
                className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm ml-3 w-full text-slate-600 placeholder-slate-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => dispatch(setSearchQuery(''))}
                  className="p-1 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X className="w-3 h-3 text-slate-400" />
                </button>
              )}
            </div>

            {/* Right Section: Actions */}
            <div className="flex items-center gap-4 shrink-0">
              <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-indigo-600 rounded-full border border-white"></span>
              </button>
              <div className="w-9 h-9 rounded-full border border-slate-200 overflow-hidden bg-slate-200 cursor-pointer hover:ring-2 hover:ring-indigo-300 transition-all">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" 
                  alt="User" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Secondary Header Row: Categories Navigation */}
          <nav className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth">
            <Link 
              to="/" 
              className={`text-[10px] font-black uppercase tracking-[0.2em] shrink-0 px-4 py-2 rounded-lg transition-all ${pathname === '/' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              All Units
            </Link>
            <div className="w-px h-4 bg-slate-200 shrink-0 mx-2"></div>
            {categories.map(([cat, count]) => (
              <button 
                key={cat}
                onClick={() => {
                  if (pathname !== '/') {
                    window.location.href = '/';
                    return;
                  }
                  const element = document.getElementById(`category-${cat}`);
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-widest shrink-0 transition-all flex items-center gap-2 group px-3 py-2 rounded-lg hover:bg-indigo-50/50 border border-transparent hover:border-indigo-100"
              >
                {cat}
                <span className="text-[8px] bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white px-1.5 py-0.5 rounded-md transition-all font-black">{count}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="w-full border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto p-8 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Nexus System © 2026</p>
           <div className="flex items-center gap-6">
              <span className="text-[10px] font-bold text-slate-300 uppercase italic">Pro Grade Registry</span>
              <span className="text-[10px] font-bold text-slate-300 uppercase">Latency: 24ms</span>
              <span className="text-[10px] font-bold text-slate-300 uppercase">Status: Live</span>
           </div>
        </div>
      </footer>
    </div>
  );
}
