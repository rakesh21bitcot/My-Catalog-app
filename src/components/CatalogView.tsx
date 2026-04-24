import { useSelector } from 'react-redux';
import { RootState } from '../store';
import CategorySection from './CategorySection';
import { useMemo } from 'react';
import { Search } from 'lucide-react';

export default function CatalogView() {
  const { items, searchQuery } = useSelector((state: RootState) => state.catalog);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(item => 
      item.itemname.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query) ||
      item.itemprops.some(p => p.value.toLowerCase().includes(query))
    );
  }, [items, searchQuery]);

  const groupedItems = useMemo(() => {
    return filteredItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, typeof items>);
  }, [filteredItems]);

  const categories = Object.keys(groupedItems).sort();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
             <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">
               {searchQuery ? 'Search Results' : 'Active Inventory'}
             </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 uppercase">
            {searchQuery ? 'Query' : 'Product'} <span className="text-slate-300">{searchQuery ? 'MATCHES' : 'Archive'}</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3 overflow-hidden">
            {filteredItems.slice(0, 4).map((item, i) => (
              <img 
                key={i} 
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white grayscale hover:grayscale-0 transition-all font-bold" 
                src={item.image} 
                alt="" 
                loading="lazy"
              />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-400">
            {filteredItems.length} {filteredItems.length === 1 ? 'Match' : 'Matches'} Found
          </span>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="py-20 text-center">
          <div className="mb-4 inline-flex p-4 bg-slate-100 rounded-full">
            <Search className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No matches found for "{searchQuery}"</h3>
          <p className="text-sm text-slate-500">Try adjusting your search query or category filters.</p>
        </div>
      ) : (
        <>
          

          <div className="space-y-12 mx-auto">
            {categories.map((category) => (
              <div key={category} id={`category-${category}`} className="scroll-mt-24">
                <CategorySection 
                  category={category} 
                  items={groupedItems[category]} 
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
