import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50
        bg-bg/60 backdrop-blur-xl
        border-b border-borderSoft
        shadow-glass
      "
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="ShutterStory" className="h-8" />
          <span className="font-display tracking-wide text-lg">
            ShutterStory
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase text-soft">
          <NavLink to="/" className="hover:text-accent transition">
            Home
          </NavLink>
          <NavLink to="/gallery" className="hover:text-accent transition">
            Gallery
          </NavLink>
          <a href="#contact" className="hover:text-accent transition">
            Contact
          </a>
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-accent text-2xl"
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-panel/90 backdrop-blur-xl border-t border-borderSoft">
          <div className="flex flex-col px-6 py-4 gap-4 text-soft uppercase tracking-widest text-sm">
            <NavLink onClick={() => setOpen(false)} to="/">
              Home
            </NavLink>
            <NavLink onClick={() => setOpen(false)} to="/gallery">
              Gallery
            </NavLink>
            <a onClick={() => setOpen(false)} href="#contact">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
