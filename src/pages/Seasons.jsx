import { useEffect, useState } from 'react'

function Seasons({ seasons, onCreateSeason, onSelect }){
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {seasons.map(s=> (
        <div key={s.id} className="group rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-800 to-zinc-900 text-white">
          <div className="h-36 relative">
            <img src={`https://source.unsplash.com/800x400/?season,${encodeURIComponent(s.title)}`} className="absolute inset-0 w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
          <div className="p-4 space-y-2">
            <div className="text-sm text-white/70">Season</div>
            <div className="text-xl font-bold">{s.title}</div>
            {s.description && <p className="text-white/70 line-clamp-2">{s.description}</p>}
            <div className="pt-2 flex items-center gap-2">
              <button onClick={()=> onSelect?.(s.id)} className="px-3 py-1.5 rounded bg-white text-black text-sm font-semibold">Open</button>
            </div>
          </div>
        </div>
      ))}

      <button onClick={onCreateSeason} className="rounded-xl border-2 border-dashed border-white/20 text-white/60 hover:text-white hover:border-white/40 p-6 h-36 flex items-center justify-center">+ Create new season</button>
    </div>
  )
}

export default Seasons
