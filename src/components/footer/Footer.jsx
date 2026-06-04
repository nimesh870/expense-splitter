import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const links = {
    product: [
      { name: 'Home', path: '/' },
      { name: 'Groups', path: '/groups' },
      { name: 'History', path: '/history' },
    ],
    account: [
      { name: 'Login', path: '/login' },
      { name: 'Signup', path: '/signup' },
    ],
  }

  return (
    <footer className='bg-[#0F172A] text-[#94A3B8] mt-auto'>
      <div className='max-w-6xl mx-auto px-6 py-10'>

        {/* Top section */}
        <div className='flex flex-col md:flex-row justify-between gap-10'>

          {/* Brand */}
          <div className='flex flex-col gap-3 max-w-xs'>
            <Link to='/' className='text-[#F8FAFC] text-xl font-bold tracking-tight'>
              💸 SplitEase
            </Link>
            <p className='text-sm leading-relaxed'>
              Split expenses with friends, roommates, and travel groups — fair and simple.
            </p>
          </div>

          {/* Links */}
          <div className='flex flex-row gap-16'>

            <div className='flex flex-col gap-3'>
              <h4 className='text-[#F8FAFC] text-sm font-semibold uppercase tracking-widest'>
                Product
              </h4>
              <ul className='flex flex-col gap-2'>
                {links.product.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className='text-sm hover:text-[#F8FAFC] transition-colors duration-200'
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className='flex flex-col gap-3'>
              <h4 className='text-[#F8FAFC] text-sm font-semibold uppercase tracking-widest'>
                Account
              </h4>
              <ul className='flex flex-col gap-2'>
                {links.account.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className='text-sm hover:text-[#F8FAFC] transition-colors duration-200'
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3'>
          <p className='text-xs'>
            © {currentYear} SplitEase. Built with React.
          </p>
          <p className='text-xs'>
            Made for friends who pay each other back 🤝
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer