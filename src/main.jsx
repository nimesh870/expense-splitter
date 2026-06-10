import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import AddExpense from './pages/AddExpense.jsx'
import GroupDetails from './pages/GroupDetails.jsx'
import History from './pages/History.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { store } from './store/store.js'
import AuthLayout from './components/AuthLayout.jsx'
import { Link } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path : '/',
    element : <App />,
     errorElement: (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[#F8FAFC] text-4xl font-bold mb-4">404</h1>
          <p className="text-[#94A3B8] mb-6">Page not found</p>
          <Link to="/" className="text-[#F8FAFC] underline">Go home</Link>
        </div>
      </div>
     ),

    children : [
      {path : '/' , element : <Home />},

      {path : 'login' , element : ( 
        <AuthLayout authentication = {false}>
          <Login />
        </AuthLayout>
       )},

      {path : 'signup' , element : (
        <AuthLayout authentication = {false}>
          <Signup />
        </AuthLayout>
      )},

      {path : '/groups/:id' , element : (
        <AuthLayout authentication>
          <GroupDetails />
        </AuthLayout>
      )},

      {path : 'add-expense' , element : (
        <AuthLayout authentication>
          <AddExpense />
        </AuthLayout>
      )},

      {path : 'history' , element : (
        <AuthLayout authentication>
          <History />
        </AuthLayout>
      )}
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)