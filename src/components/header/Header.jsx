import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from '../container/Container'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Groups', path: '/groups' },
    { name: 'History', path: '/history' },
  ]

  const authItems = [
    { name: 'Login', path: '/login' },
    { name: 'Signup', path: '/signup' },
  ]

  return (
    <header className='bg-[#0F172A] sticky top-0 z-50 border-b border-white/10'>
      <div className='max-w-6xl mx-auto px-6 py-4'>
        <nav className='flex items-center justify-between'>

          {/* Brand */}
          <Link
            to='/'
            className='text-[#F8FAFC] text-xl font-bold tracking-tight hover:opacity-80 transition-opacity duration-200'
          >
            💸 SplitEase
          </Link>

          {/* Desktop Nav */}
          <ul className='hidden md:flex items-center gap-1'>
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200
                    ${isActive
                      ? 'bg-white/10 text-[#F8FAFC]'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop Auth */}
          <div className='hidden md:flex items-center gap-2'>
            <Link
              to='/login'
              className='px-4 py-2 text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-200'
            >
              Login
            </Link>
            <Link
              to='/signup'
              className='px-4 py-2 text-sm font-medium bg-white text-[#0F172A] rounded-xl hover:bg-[#F1F5F9] transition-colors duration-200'
            >
              Sign up
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className='md:hidden text-[#F8FAFC] text-xl p-1'
            onClick={() => setIsOpen(!isOpen)}
            aria-label='Toggle menu'
          >
            {isOpen ? '✕' : '☰'}
          </button>

        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className='md:hidden border-t border-white/10 mt-4 pt-4 pb-2 flex flex-col gap-1'>
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200
                  ${isActive
                    ? 'bg-white/10 text-[#F8FAFC]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <div className='border-t border-white/10 mt-3 pt-3 flex flex-col gap-1'>
              {authItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className='px-4 py-2 text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 rounded-xl transition-all duration-200'
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </header>
  )
}

export default Header