import { Link } from 'react-router-dom'

// component
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0F172A] text-[#94A3B8] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* top row: brand description + link columns*/}
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* brand section */}
          <div className="flex flex-col gap-3 max-w-xs">
            <Link to="/" className="text-[#F8FAFC] text-xl font-bold tracking-tight">
              SplitEase
            </Link>
            <p className="text-sm leading-relaxed">
              Split expenses with friends, roommates, and travel groups — fair and simple.
            </p>
          </div>

        </div>

        {/* bottom bar  */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs">&copy; {currentYear} SplitEase.</p>
          <p className="text-xs">Made for friends who pay each other back.</p>
        </div>

      </div>
    </footer>
  )
}
