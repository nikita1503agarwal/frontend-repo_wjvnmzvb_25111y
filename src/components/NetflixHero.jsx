import { useMemo } from 'react'
import { Play, Info } from 'lucide-react'

function NetflixHero({ spotlight, onPlay, onInfo }) {
  const cover = useMemo(()=>{
    if(!spotlight) return null
    const seed = encodeURIComponent(spotlight.title || 'LifeStory')
    // Unsplash random based on title
    return `https://source.unsplash.com/1600x900/?cinema,night,neon,${seed}`
  }, [spotlight])

  if(!spotlight) return null

  return (
    <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
      <img src={cover} alt="cover" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-10">
        <div className="max-w-xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow">{spotlight.title}</h1>
          <p className="mt-3 text-white/80 line-clamp-3">{spotlight.plot_points?.[0] || 'A slice-of-life episode in your personal series.'}</p>
          <div className="mt-5 flex items-center gap-3">
            <button onClick={()=> onPlay?.(spotlight)} className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white text-black font-semibold">
              <Play size={18}/> Play
            </button>
            <button onClick={()=> onInfo?.(spotlight)} className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white/20 text-white hover:bg-white/30">
              <Info size={18}/> More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NetflixHero
