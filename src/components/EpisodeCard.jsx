import { Clapperboard, Star, Trash2, Edit3 } from 'lucide-react'

function EpisodeCard({ episode, onOpen, onEdit, onDelete }) {
  const preview = episode.plot_points?.[0] || 'No plot points yet'
  return (
    <div className="group bg-white/70 backdrop-blur border border-black/10 rounded-2xl p-5 hover:shadow-lg transition cursor-pointer" onClick={() => onOpen(episode)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-amber-400 text-black flex items-center justify-center shadow">
            <Clapperboard size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{episode.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{preview}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="inline-flex items-center gap-1 text-amber-600 bg-amber-100/60 px-2 py-1 rounded-full text-xs">
            <Star size={14} /> {episode.rating}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(episode) }}
            className="opacity-0 group-hover:opacity-100 transition p-2 rounded-lg hover:bg-black/5"
            aria-label="Edit"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(episode) }}
            className="opacity-0 group-hover:opacity-100 transition p-2 rounded-lg hover:bg-black/5 text-red-600"
            aria-label="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-500">{new Date(episode.date).toLocaleDateString()}</div>
    </div>
  )
}

export default EpisodeCard
