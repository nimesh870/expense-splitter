import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

// ─── Navigation data ─────────────────────────────────────────────
const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Groups', path: '/groups' },
  { label: 'History', path: '/history' },
]

const authItems = [
  { label: 'Login', path: '/login' },
  { label: 'Sign up', path: '/signup' },
]

// ─── Shared style helpers ────────────────────────────────────────
function navLinkClass({ isActive }) {
  const base = 'px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200'
  if (isActive) return `${base} bg-white/10 text-[#F8FAFC]`
  return `${base} text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5`
}

function mobileNavLinkClass({ isActive }) {
  const base = 'px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200'
  if (isActive) return `${base} bg-white/10 text-[#F8FAFC]`
  return `${base} text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5`
}

// ─── Component ───────────────────────────────────────────────────
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="bg-[#0F172A] sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4">

        {/* ── Top bar: brand + desktop nav + auth + hamburger ── */}
        <nav className="flex items-center justify-between">

          {/* Brand logo */}
          <Link
            to="/"
            className="text-[#F8FAFC] text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            SplitEase
          </Link>

          {/* Desktop navigation links */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} className={navLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
            >
              Login
            </Link>
            <Button asChild>
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>

          {/* Mobile hamburger / close button */}
          <button
            className="md:hidden text-[#F8FAFC] p-1 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* ── Mobile dropdown menu ── */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 mt-4 pt-4 pb-2 flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={mobileNavLinkClass}
              >
                {item.label}
              </NavLink>
            ))}

            <div className="border-t border-white/10 mt-3 pt-3 flex flex-col gap-1">
              <Link
                to="/login"
                onClick={closeMenu}
                className="px-4 py-2 text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 rounded-xl transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={closeMenu}
                className="px-4 py-2 text-sm font-medium text-[#F8FAFC] hover:bg-white/10 rounded-xl transition-all"
              >
                Sign up
              </Link>
            </div>
          </div>
        )}

      </div>
    </header>
  )
}
