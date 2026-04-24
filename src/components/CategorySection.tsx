import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { CatalogItem } from '../types';
import ProductCard from './ProductCard';

interface CategorySectionProps {
  category: string;
  items: CatalogItem[];
}

export default function CategorySection({ category, items }: CategorySectionProps) {
  return (
    <section className="mb-20">
      <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
          <h2 className="text-xl font-bold tracking-tight text-slate-800 uppercase">{category}</h2>
          <span className="text-[10px] font-black tracking-widest text-slate-400 bg-slate-100 px-2 py-1 rounded border border-slate-200 uppercase">
            {items.length} Units
          </span>
        </div>
        <button className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors text-left">
          View Batch <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
          >
            <ProductCard item={item} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
