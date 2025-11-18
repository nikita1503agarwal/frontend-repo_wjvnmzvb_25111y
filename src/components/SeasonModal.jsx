import { useState } from 'react'

function SeasonModal({ onClose, onCreate }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    onCreate({ title, description, is_active: isActive })
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h3 className="text-xl font-semibold">Create New Season</h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="text-sm text-gray-700">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} required className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="e.g., Summer of Serendipity" />
          </div>
          <div>
            <label className="text-sm text-gray-700">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="What is this season about?" />
          </div>
          <div className="flex items-center gap-2">
            <input id="active" type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
            <label htmlFor="active" className="text-sm text-gray-700">Set as active season</label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-amber-500 text-black font-semibold hover:bg-amber-400">Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SeasonModal
