import { useEffect, useMemo, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import NetflixHero from './components/NetflixHero'
import Row from './components/Rows'
import EpisodeForm from './components/EpisodeForm'
import EpisodeDetails from './components/EpisodeDetails'
import SeasonModal from './components/SeasonModal'
import Explore from './pages/Explore'
import SeasonsPage from './pages/Seasons'

function Home({ seasons, episodes, onOpen, onEdit, onDelete }){
  const spotlight = episodes[0]
  return (
    <div>
      <NetflixHero spotlight={spotlight} onPlay={onOpen} onInfo={onEdit} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
        <Row title="Continue Watching" items={episodes.slice(0,12)} onOpen={onOpen} onEdit={onEdit} onDelete={onDelete} />
        <Row title="From your active season" items={episodes.slice(12,24)} onOpen={onOpen} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  )
}

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [seasons, setSeasons] = useState([])
  const [episodes, setEpisodes] = useState([])
  const [activeSeasonId, setActiveSeasonId] = useState('')
  const [showEpisodeModal, setShowEpisodeModal] = useState(false)
  const [editingEpisode, setEditingEpisode] = useState(null)
  const [showSeasonModal, setShowSeasonModal] = useState(false)
  const [showDetails, setShowDetails] = useState(null)
  const navigate = useNavigate()

  // Fetch seasons and episodes
  useEffect(() => {
    fetch(`${baseUrl}/api/seasons`).then(r => r.json()).then((data) => {
      setSeasons(data)
      const active = data.find(s => s.is_active) || data[0]
      if (active) setActiveSeasonId(active.id)
    })
  }, [])

  useEffect(() => {
    const q = activeSeasonId ? `?season_id=${activeSeasonId}` : ''
    fetch(`${baseUrl}/api/episodes${q}`).then(r => r.json()).then(setEpisodes)
  }, [activeSeasonId])

  const openEpisodeForm = (ep = null) => {
    setEditingEpisode(ep)
    setShowEpisodeModal(true)
  }

  const createSeason = async (payload) => {
    const res = await fetch(`${baseUrl}/api/seasons`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const created = await res.json()
    setSeasons(prev => [created, ...prev])
    setActiveSeasonId(created.id)
    setShowSeasonModal(false)
  }

  const saveEpisode = async (payload) => {
    if (editingEpisode) {
      const res = await fetch(`${baseUrl}/api/episodes/${editingEpisode.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const updated = await res.json()
      setEpisodes(prev => prev.map(e => e.id === updated.id ? updated : e))
    } else {
      const res = await fetch(`${baseUrl}/api/episodes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const created = await res.json()
      setEpisodes(prev => [created, ...prev])
    }
    setShowEpisodeModal(false)
    setEditingEpisode(null)
  }

  const deleteEpisode = async (ep) => {
    await fetch(`${baseUrl}/api/episodes/${ep.id}`, { method: 'DELETE' })
    setEpisodes(prev => prev.filter(e => e.id !== ep.id))
  }

  const openDetails = (ep) => setShowDetails(ep)

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar
        seasons={seasons}
        activeSeasonId={activeSeasonId}
        onChangeSeason={setActiveSeasonId}
        onCreateSeason={() => setShowSeasonModal(true)}
        onCreateEpisode={() => openEpisodeForm(null)}
      />

      <Routes>
        <Route path="/" element={<Home seasons={seasons} episodes={episodes} onOpen={openDetails} onEdit={openEpisodeForm} onDelete={deleteEpisode} />} />
        <Route path="/explore" element={<Explore onOpen={openDetails} onEdit={openEpisodeForm} />} />
        <Route path="/seasons" element={<SeasonsPage seasons={seasons} onCreateSeason={()=> setShowSeasonModal(true)} onSelect={(id)=> setActiveSeasonId(id)} />} />
      </Routes>

      {showEpisodeModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-950 rounded-2xl border border-white/10 w-full max-w-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{editingEpisode ? 'Edit Episode' : 'New Episode'}</h3>
              <button onClick={() => setShowEpisodeModal(false)} className="text-sm text-white/70 hover:text-white">Close</button>
            </div>
            <EpisodeForm
              initial={editingEpisode}
              seasons={seasons}
              defaultSeasonId={activeSeasonId}
              onCancel={() => setShowEpisodeModal(false)}
              onSave={saveEpisode}
            />
          </div>
        </div>
      )}

      {showSeasonModal && (
        <SeasonModal onClose={() => setShowSeasonModal(false)} onCreate={createSeason} />
      )}

      {showDetails && (
        <EpisodeDetails episode={showDetails} onClose={()=> setShowDetails(null)} />
      )}
    </div>
  )
}

export default App
