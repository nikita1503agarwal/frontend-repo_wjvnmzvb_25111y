import { X, Star, CalendarDays, ListChecks } from 'lucide-react'

function EpisodeDetails({ episode, onClose }) {
  if (!episode) return null
  const cover = `https://source.unsplash.com/1200x700/?cinema,night,neon,${encodeURIComponent(episode.title)}`

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
        <button onClick={onClose} className="absolute top-3 right-3 z-10 p-2 rounded bg-white/10 text-white hover:bg-white/20"><X size={18} /></button>
        <div className="relative h-56 sm:h-72">
          <img src={cover} alt="cover" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
        </div>
        <div className="p-5 text-white space-y-3">
          <h3 className="text-2xl font-bold">{episode.title}</h3>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <div className="inline-flex items-center gap-1"><CalendarDays size={16} /> {new Date(episode.date).toLocaleDateString()}</div>
            <div className="inline-flex items-center gap-1"><Star size={16} className="text-amber-400" /> {episode.rating}</div>
          </div>
          {episode.plot_points?.length > 0 && (
            <div className="mt-2">
              <div className="text-white/80 font-medium mb-2 inline-flex items-center gap-2"><ListChecks size={18}/> Plot points</div>
              <ul className="list-disc list-inside space-y-1 text-white/80">
                {episode.plot_points.map((p, i)=> <li key={i}>{p}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EpisodeDetails
