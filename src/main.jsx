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

const router = createBrowserRouter([
  {
    path : '/',
    element : <App />,
    children : [
      {index : true , element : <Home />},
      {path : 'login' , element : <Login />},
      {path : 'signup' , element : <Signup />},
      {path : 'groups' , element : <GroupDetails />},
      {path : 'add-expense' , element : <AddExpense />},
      {path : 'history' , element : <History />}
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