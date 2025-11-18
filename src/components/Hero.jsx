import Spline from '@splinetool/react-spline'
import { Plus, Clapperboard, ChevronDown } from 'lucide-react'

function Hero({ seasons, activeSeasonId, onChangeSeason, onCreateSeason, onOpenEpisodeForm }) {
  const active = seasons.find(s => s.id === activeSeasonId) || seasons.find(s => s.is_active) || seasons[0]

  return (
    <section className="relative w-full h-[380px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-600/40 via-amber-500/30 to-orange-500/30">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/ESO6PnMadasO0hU3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60 pointer-events-none" />

      <div className="relative h-full p-6 sm:p-10 flex flex-col justify-end">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs mb-2">
              <Clapperboard size={16} />
              LifeStory
            </div>
            <h1 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
              {active ? active.title : 'Your First Season'}
            </h1>
            <p className="text-white/80 mt-2 max-w-2xl">
              {active?.description || 'Create a season to begin your cinematic journaling adventure.'}
            </p>
            {seasons.length > 0 && (
              <div className="mt-3 inline-flex items-center gap-2">
                <select
                  className="bg-white/20 text-white rounded-lg px-3 py-2 backdrop-blur-sm border border-white/20"
                  value={active?.id || ''}
                  onChange={e => onChangeSeason(e.target.value)}
                >
                  {seasons.map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
                <button onClick={onCreateSeason} className="text-white/80 hover:text-white text-sm underline">
                  + New Season
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {seasons.length === 0 && (
              <button onClick={onCreateSeason} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 text-white border border-white/30 hover:bg-white/30 transition">
                <Plus size={18} />
                Create First Season
              </button>
            )}
            <button onClick={onOpenEpisodeForm} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-black font-semibold hover:bg-amber-400 transition shadow">
              <Clapperboard size={18} />
              Create a New Episode
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
