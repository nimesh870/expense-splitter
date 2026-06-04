import Header from './components/Header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'


function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className='flex-1'>
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default App