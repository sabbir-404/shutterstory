import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-bg/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-xl tracking-wide">
          ShutterStory
        </Link>

        <div className="flex gap-6 text-sm uppercase tracking-widest text-muted">
          <Link to="/gallery" className="hover:text-accent">Gallery</Link>
          <a href="#about" className="hover:text-accent">About</a>
          <a href="#contact" className="hover:text-accent">Contact</a>
        </div>
      </div>
    </nav>
  )
}
