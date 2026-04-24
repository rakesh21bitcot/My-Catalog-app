import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CatalogItem } from '../types';
import { ChevronRight, List } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  item: CatalogItem;
}

export default function ProductCard({ item }: ProductCardProps) {
  const [isHoveringProps, setIsHoveringProps] = useState(false);

  return (
    <Link to={`/item/${item.id}`} className="group block h-full relative">
      <div className="bg-white rounded-2xl border border-slate-200 group-hover:border-indigo-400 group-hover:shadow-2xl group-hover:shadow-indigo-200/40 group-hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full bg-linear-to-b from-white to-slate-50/30">
        <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden group-hover:bg-indigo-50 transition-colors duration-500">
          <span className="absolute top-3 left-3 px-2 py-1 bg-white/80 backdrop-blur-md rounded-md text-[9px] font-black uppercase text-slate-500 tracking-wider shadow-sm z-10 border border-white/50">
            {item.category}
          </span>
          <img
            src={item.image}
            alt={item.itemname}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/5 to-transparent pointer-events-none"></div>
        </div>
        
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-slate-800 text-base tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">
              {item.itemname}
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mb-4 line-clamp-1 italic">
             {item.itemprops[0]?.label || item.itemprops[0]?.name}: {item.itemprops[0]?.value}
          </p>
          
          <div className="mt-auto relative pt-4 border-t border-slate-100/80">
            <div 
              className="flex items-center justify-between"
              onMouseEnter={() => setIsHoveringProps(true)}
              onMouseLeave={() => setIsHoveringProps(false)}
            >
              <div className="flex items-center gap-2 cursor-help">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter transition-colors group-hover:text-indigo-500">Properties</span>
                <div className="flex -space-x-1">
                  {item.itemprops.slice(0, 3).map((_, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -2 }}
                      className="w-4 h-4 rounded-full border border-white bg-slate-200 text-[8px] flex items-center justify-center font-bold text-slate-500 shadow-sm"
                    >
                      {i === 2 && item.itemprops.length > 2 ? `+${item.itemprops.length - 2}` : ''}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-50 group-hover:bg-indigo-600 p-1.5 rounded-lg transition-colors">
                 <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
              </div>
            </div>

            {/* Quick-Look Tooltip */}
            <AnimatePresence>
              {isHoveringProps && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute bottom-full left-0 w-full mb-3 z-20 pointer-events-none"
                >
                  <div className="bg-indigo-950/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-indigo-500/30 text-white overflow-hidden">
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                      <List className="w-3 h-3 text-indigo-400" />
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-300">Technical Specs</span>
                    </div>
                    <div className="space-y-3">
                      {item.itemprops.map((prop, idx) => (
                        <div key={idx} className="flex flex-col gap-0.5">
                          <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400/80">
                            {prop.label || prop.name}
                          </span>
                          <span className="text-[11px] font-bold text-indigo-50/90 leading-tight">
                            {prop.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-indigo-500/10 rounded-full blur-2xl"></div>
                  </div>
                  {/* Tooltip Arrow */}
                  <div className="w-2 h-2 bg-indigo-950/95 rotate-45 mx-4 -mt-1 border-r border-b border-indigo-500/30"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Link>
  );
}
