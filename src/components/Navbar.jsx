import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/white-logo.png'

export default function Navbar() {
  return (
    <nav className="
      fixed top-0 left-0 w-full z-50
      bg-bg/60 backdrop-blur-xl
      border-b border-borderSoft
      shadow-glass
    ">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="ShutterStory" className="h-8" />
          {/* <span className="font-display tracking-wide text-lg">
            ShutterStory
          </span> */}
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase text-soft">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition hover:text-accent ${
                isActive ? 'text-accent' : ''
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/gallery"
            className="transition hover:text-accent"
          >
            Gallery
          </NavLink>

          <a
            href="#contact"
            className="transition hover:text-accent"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}
