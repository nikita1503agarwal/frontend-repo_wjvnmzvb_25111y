import { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero'
import EpisodeCard from './components/EpisodeCard'
import EpisodeForm from './components/EpisodeForm'
import SeasonModal from './components/SeasonModal'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [seasons, setSeasons] = useState([])
  const [episodes, setEpisodes] = useState([])
  const [activeSeasonId, setActiveSeasonId] = useState('')
  const [showEpisodeModal, setShowEpisodeModal] = useState(false)
  const [editingEpisode, setEditingEpisode] = useState(null)
  const [showSeasonModal, setShowSeasonModal] = useState(false)

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

  const unsortedEpisodes = useMemo(() => {
    return []
  }, [episodes])

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

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_10%,#a78bfa33_0%,transparent_30%),radial-gradient(circle_at_80%_0%,#f59e0b33_0%,transparent_25%)] from-amber-50 to-white">
      <div className="max-w-5xl mx-auto p-4 sm:p-8 space-y-6">
        <Hero
          seasons={seasons}
          activeSeasonId={activeSeasonId}
          onChangeSeason={setActiveSeasonId}
          onCreateSeason={() => setShowSeasonModal(true)}
          onOpenEpisodeForm={() => openEpisodeForm(null)}
        />

        {/* Episodes grid */}
        <div className="mt-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-gray-800">Episodes</h2>
            <button onClick={() => openEpisodeForm(null)} className="text-sm text-amber-700 hover:underline">+ New Episode</button>
          </div>
          {episodes.length === 0 ? (
            <div className="text-gray-600 bg-white/60 border border-black/10 rounded-2xl p-6">No episodes yet. Start by creating one!</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {episodes.map(ep => (
                <EpisodeCard key={ep.id} episode={ep} onOpen={() => {}} onEdit={openEpisodeForm} onDelete={deleteEpisode} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Episode Modal */}
      {showEpisodeModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{editingEpisode ? 'Edit Episode' : 'New Episode'}</h3>
              <button onClick={() => setShowEpisodeModal(false)} className="text-sm text-gray-500 hover:underline">Close</button>
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

      {/* Season Modal */}
      {showSeasonModal && (
        <SeasonModal onClose={() => setShowSeasonModal(false)} onCreate={createSeason} />
      )}
    </div>
  )
}

export default App
