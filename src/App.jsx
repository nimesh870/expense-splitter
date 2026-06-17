import Header from './components/Header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'
import { useEffect , useState } from 'react'
import { useDispatch } from 'react-redux'
import { onAuthStateChange } from './Supabase_Services/Authentication'
import { login , logout } from './features/authSlice'
import { useSelector } from 'react-redux'
import Toast from './Toast'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  const toast = useSelector(state => state.toast)
  
  useEffect( () => {
    const { data : { subscription } } = onAuthStateChange( (session)  => {
      if (session) {
        dispatch(login({
          userData : session.user,
          token : session.access_token
        }))
      } else {
        dispatch(logout())
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return !loading ? (
    <>
      {toast.visibility && (<Toast message={toast.message}/>) }
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className='flex-1'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  ) : (null)
}

export default App