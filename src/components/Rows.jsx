import { Clapperboard, Star, Play, Info } from 'lucide-react'

function Row({ title, items = [], onOpen, onEdit, onDelete }) {
  return (
    <section className="space-y-2">
      <h3 className="text-white text-lg font-semibold px-2">{title}</h3>
      <div className="no-scrollbar overflow-x-auto">
        <div className="flex gap-3 min-w-full px-2 py-2">
          {items.map((ep) => (
            <div key={ep.id} className="group relative w-[260px] shrink-0">
              <div className="aspect-[16/9] rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10 overflow-hidden">
                <div className="w-full h-full p-3 flex items-start justify-between">
                  <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-white/10 text-white/90 text-xs">
                    <Clapperboard size={14} /> Ep
                  </div>
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-amber-500/20 text-amber-300 text-xs">
                    <Star size={14} /> {ep.rating}
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              </div>

              <div className="mt-2 text-white">
                <div className="font-medium line-clamp-1">{ep.title}</div>
                <div className="text-xs text-white/60 line-clamp-2">{ep.plot_points?.[0] || 'No plot points yet'}</div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                <button onClick={()=> onOpen?.(ep)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white text-black text-sm font-semibold"><Play size={16}/> Play</button>
                <button onClick={()=> onEdit?.(ep)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/10 text-white text-sm"><Info size={16}/> Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Row
