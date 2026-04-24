import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { motion } from 'motion/react';
import { ArrowLeft, Box, Info, Command } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = useSelector((state: RootState) => 
    state.catalog.items.find(i => i.id === id)
  );

  if (!item) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Unit Signature Not Found</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold text-sm tracking-widest uppercase shadow-xl shadow-indigo-100"
        >
          Return to Registry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <Link to="/" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-600 transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" />
        Roll Back
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 xl:gap-20">
        {/* Left: Detailed Visualization */}
        <div className="flex-1 space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-900/10 aspect-video lg:aspect-auto h-[400px] lg:h-[600px] bg-slate-100"
          >
            <img 
              src={item.image} 
              alt={item.itemname}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 flex items-center gap-3">
               <div className="bg-white/20 backdrop-blur-xl border border-white/30 p-3 rounded-2xl">
                  <Box className="w-6 h-6 text-white" />
               </div>
               <div className="text-white">
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none opacity-60">Authentication Tag</p>
                  <p className="text-sm font-bold tracking-tight">Verified Engineering Unit</p>
               </div>
            </div>
            <div className="absolute top-8 left-8">
               <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase text-indigo-600 shadow-xl border border-white">
                 {item.category}
               </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white p-6 rounded-3xl border border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Batch</p>
                <p className="font-bold text-slate-800">PRE-PRODUCTION-A2</p>
             </div>
             <div className="bg-white p-6 rounded-3xl border border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Region</p>
                <p className="font-bold text-slate-800">GLOBAL REGISTRY</p>
             </div>
          </div>
        </div>

        {/* Right: Technical Panel */}
        <motion.aside
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2, duration: 0.5 }}
           className="w-full lg:w-96 flex flex-col"
        >
          <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 flex-1 flex flex-col sticky top-28">
            <div className="flex items-center justify-between mb-10 text-[10px] font-black tracking-[0.2em] text-slate-300">
              <span>SELECTED UNIT</span>
              <span className="text-indigo-600">ID: {item.id.toUpperCase()}</span>
            </div>

            <div className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                 <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded uppercase tracking-wider">REGISTRY.CORE</span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight mb-3 uppercase italic">
                {item.itemname}
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed font-medium italic">
                A high-fidelity representation of the {item.category.toLowerCase()} category, showcasing cutting-edge technical design and functional excellence.
              </p>
            </div>

            <div className="space-y-8 flex-1">
              <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-3">
                Technical Props
                <div className="flex-1 h-px bg-slate-100"></div>
              </h4>
              
              <div className="space-y-6">
                {item.itemprops.map((prop, idx) => (
                  <div key={idx} className="group flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">
                      {prop.label || prop.name}
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-slate-800 tracking-tight">
                        {prop.value}
                      </span>
                      <Command className="w-3.5 h-3.5 text-slate-200 group-hover:text-indigo-300 transform group-hover:rotate-12 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                   <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Pricing Index</p>
                   <p className="text-2xl font-black text-slate-900 tracking-tighter">PREMIUM</p>
                </div>
                <div className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300">
                   <Info className="w-5 h-5" />
                </div>
              </div>
              <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold tracking-[0.2em] text-xs uppercase hover:bg-indigo-600 transition-all hover:scale-[1.02] shadow-xl shadow-slate-200">
                PROCURMENT UNIT
              </button>
            </div>
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
