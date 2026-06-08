import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LogoutBtn from './Logout'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Container from '../container/Container'

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

// Component
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const navigate = useNavigate()
  const authStatus = useSelector(state => state.auth.status)

  const navItems = [
    { name : 'Home' , path : '/home' , active : true },
    { name : 'Groups' , path : '/group' , active : authStatus },
    { name : 'History' , path :'/history' , active : authStatus },
    { name : 'login' , path : '/login' , active : !authStatus },
    { name : 'signup' , path : '/signup' , active : !authStatus },
  ]

  return (
    <header className="bg-[#0F172A] sticky top-0 z-50 border-b border-white/10">
      <Container>
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
            {navItems.map((item) => item.active ? (
              <li key={item.path}>
                <NavLink to={item.path} className={navLinkClass}>
                  {item.name}
                </NavLink>
              </li>
            ) : null 
            )}
          </ul>
          {
            authStatus && (
              <div className='ml-2'> <LogoutBtn /> </div>
            )
          }


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
            {navItems.map((item) => item.active ? (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={mobileNavLinkClass}
              >
                {item.name}
              </NavLink>
            ) : null
          )}
            {
              authStatus && (
                <div className='ml-2'> <LogoutBtn /> </div>
              )
            }
          </div>
          )}

        </div>
      </Container>
    </header>
  )
}
