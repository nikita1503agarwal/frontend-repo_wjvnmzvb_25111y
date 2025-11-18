import { useEffect, useState } from 'react'

function EpisodeForm({ initial, seasons, defaultSeasonId, onCancel, onSave }) {
  const [title, setTitle] = useState(initial?.title || '')
  const [date, setDate] = useState(initial?.date ? initial.date.slice(0,10) : new Date().toISOString().slice(0,10))
  const [rating, setRating] = useState(initial?.rating || 5)
  const [plotPoints, setPlotPoints] = useState(initial?.plot_points || [''])
  const [seasonId, setSeasonId] = useState(initial?.season_id ?? defaultSeasonId ?? '')

  useEffect(() => {
    if (!plotPoints.length) setPlotPoints([''])
  }, [])

  const handlePointChange = (idx, value) => {
    const next = [...plotPoints]
    next[idx] = value
    setPlotPoints(next)
  }

  const addPoint = () => setPlotPoints([...plotPoints, ''])
  const removePoint = (idx) => setPlotPoints(plotPoints.filter((_, i) => i !== idx))

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      title,
      date,
      rating: Number(rating),
      plot_points: plotPoints.filter(p => p && p.trim().length > 0),
      season_id: seasonId || null,
    }
    onSave(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-700">Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} required className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="Episode title" />
        </div>
        <div>
          <label className="text-sm text-gray-700">Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400" />
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-700">Day Rating: {rating}</label>
        <input type="range" min="1" max="10" value={rating} onChange={e => setRating(e.target.value)} className="w-full" />
      </div>

      <div>
        <label className="text-sm text-gray-700">Season</label>
        <select value={seasonId || ''} onChange={e => setSeasonId(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400">
          <option value="">Unsorted</option>
          {seasons.map(s => (
            <option key={s.id} value={s.id}>{s.title}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm text-gray-700">Plot Points</label>
        <div className="space-y-2 mt-1">
          {plotPoints.map((p, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input value={p} onChange={e => handlePointChange(idx, e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder={`Plot point ${idx+1}`} />
              <button type="button" onClick={() => removePoint(idx)} className="text-xs text-red-600 hover:underline">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addPoint} className="text-sm text-amber-600 hover:underline">+ Add plot point</button>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300">Cancel</button>
        <button type="submit" className="px-4 py-2 rounded-lg bg-amber-500 text-black font-semibold hover:bg-amber-400">Save Episode</button>
      </div>
    </form>
  )
}

export default EpisodeForm
