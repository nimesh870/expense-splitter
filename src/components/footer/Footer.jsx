import { Link } from 'react-router-dom'

// ─── Link data ───────────────────────────────────────────────────
const productLinks = [
  { label: 'Home', path: '/' },
  { label: 'Groups', path: '/groups' },
  { label: 'History', path: '/history' },
]

const accountLinks = [
  { label: 'Login', path: '/login' },
  { label: 'Sign up', path: '/signup' },
]

// ─── Reusable link column ────────────────────────────────────────
function LinkColumn({ title, links }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-[#F8FAFC] text-sm font-semibold uppercase tracking-widest">
        {title}
      </h4>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className="text-sm hover:text-[#F8FAFC] transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Component ───────────────────────────────────────────────────
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0F172A] text-[#94A3B8] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* ── Top row: brand description + link columns ── */}
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* Brand section */}
          <div className="flex flex-col gap-3 max-w-xs">
            <Link to="/" className="text-[#F8FAFC] text-xl font-bold tracking-tight">
              SplitEase
            </Link>
            <p className="text-sm leading-relaxed">
              Split expenses with friends, roommates, and travel groups — fair and simple.
            </p>
          </div>

          {/* Link columns */}
          <div className="flex flex-row gap-16">
            <LinkColumn title="Product" links={productLinks} />
            <LinkColumn title="Account" links={accountLinks} />
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs">&copy; {currentYear} SplitEase. Built with React.</p>
          <p className="text-xs">Made for friends who pay each other back.</p>
        </div>

      </div>
    </footer>
  )
}
