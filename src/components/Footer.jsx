function Footer(){
  return (
    <footer className="mt-16 border-t border-white/10 bg-black/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm text-white/60">
        <div>
          <div className="text-white font-semibold mb-3">LifeStory</div>
          <p>Create seasons and episodes of your life. Journal with cinematic flair.</p>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">Browse</div>
          <ul className="space-y-2">
            <li>Home</li>
            <li>Seasons</li>
            <li>Explore</li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">Resources</div>
          <ul className="space-y-2">
            <li>Help Center</li>
            <li>Shortcuts</li>
            <li>Changelog</li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">Legal</div>
          <ul className="space-y-2">
            <li>Privacy</li>
            <li>Terms</li>
            <li>Cookies</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-white/40 text-xs pb-8">© {new Date().getFullYear()} LifeStory</div>
    </footer>
  )
}

export default Footer
