import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Film, Clapperboard, Plus, Search, MountainSnow, Sparkles } from 'lucide-react'

function Navbar({ onCreateSeason, onCreateEpisode, seasons, activeSeasonId, onChangeSeason }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 shrink-0 text-white">
          <Film size={22} className="text-red-500" />
          <span className="font-semibold tracking-tight">LifeStory</span>
        </button>

        <nav className="ml-6 hidden sm:flex items-center gap-4 text-sm">
          <NavLink to="/" end className={({isActive})=>`px-2 py-1 rounded ${isActive?'text-white':'text-white/70 hover:text-white'}`}>Home</NavLink>
          <NavLink to="/explore" className={({isActive})=>`px-2 py-1 rounded ${isActive?'text-white':'text-white/70 hover:text-white'}`}>Explore</NavLink>
          <NavLink to="/seasons" className={({isActive})=>`px-2 py-1 rounded ${isActive?'text-white':'text-white/70 hover:text-white'}`}>Seasons</NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {seasons?.length > 0 && (
            <select
              value={activeSeasonId || ''}
              onChange={(e)=> onChangeSeason(e.target.value)}
              className="hidden sm:block bg-white/5 text-white/90 px-3 py-1.5 rounded border border-white/10"
            >
              {seasons.map(s=> <option key={s.id} value={s.id}>{s.title}</option>)}
            </select>
          )}
          <button onClick={onCreateEpisode} className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-red-500 text-white hover:bg-red-400 transition text-sm">
            <Clapperboard size={16} /> New Episode
          </button>
          <button onClick={onCreateSeason} className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/10 text-white hover:bg-white/20 transition text-sm">
            <Plus size={16} /> New Season
          </button>
          <button onClick={()=> navigate('/explore')} className="p-2 rounded bg-white/5 text-white hover:bg-white/10"><Search size={18} /></button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
