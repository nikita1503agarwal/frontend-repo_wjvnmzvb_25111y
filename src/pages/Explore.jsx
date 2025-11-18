import { useEffect, useMemo, useState } from 'react'
import Row from '../components/Rows'

function Explore({ onOpen, onEdit }){
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [episodes, setEpisodes] = useState([])

  useEffect(()=>{
    fetch(`${baseUrl}/api/episodes`).then(r=>r.json()).then(setEpisodes)
  },[])

  const topRated = useMemo(()=> [...episodes].sort((a,b)=> (b.rating||0)-(a.rating||0)).slice(0,15), [episodes])
  const recent = useMemo(()=> [...episodes].sort((a,b)=> new Date(b.date)-new Date(a.date)).slice(0,15), [episodes])
  const cozy = useMemo(()=> episodes.filter(e=> (e.plot_points||[]).some(p=> /cozy|calm|coffee|home|read/i.test(p))).slice(0,15), [episodes])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      <Row title="Top Rated" items={topRated} onOpen={onOpen} onEdit={onEdit} />
      <Row title="Recently Added" items={recent} onOpen={onOpen} onEdit={onEdit} />
      <Row title="Cozy Nights" items={cozy} onOpen={onOpen} onEdit={onEdit} />
    </div>
  )
}

export default Explore
