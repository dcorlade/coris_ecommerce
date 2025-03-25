import { useState, useEffect } from 'react'
import productService from './services/products'
import Notification from './components/Notification'
import AuthForm from './components/AuthForm'
import { notify } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeLoggedUser, loginUser, logoutUser } from './reducers/loggedUserReducer'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
import { Box } from '@mui/material'
import ProductList from './components/ProductList'
import { initializeProducts } from './reducers/productReducer'
import Product from './components/Product'
import AddProductForm from './components/AddProductForm'
import EditProductForm from './components/EditProductForm'
import Cart from './components/Cart'
import Footer from './components/Footer'
import Header from './components/Header'

const App = () => {
  const user = useSelector(({ loggedUser }) => loggedUser)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const cart = useSelector((state) => state.cart)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(initializeProducts())
      await dispatch(initializeLoggedUser())
      await dispatch(initializeUsers())
    }
    fetchData()
  }, [dispatch])

  useEffect(() => {
    if (user) {
      productService.setToken(user.token)
    }
  }, [user])

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'Username') setUsername(value)
    if (name === 'Password') setPassword(value)
  }

  const loginForm = () => (
    <div>
      <AuthForm
        handleSubmit={handleLogin}
        handleChange={handleChange}
        values={{ username, password }}
      />
    </div>
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await dispatch(loginUser(username, password))
      setUsername('')
      setPassword('')
      dispatch(notify('Logged in successfully', 'success', 5000))
    } catch (err) {
      console.error('Logged in unsuccessfully', err.message)
      dispatch(notify('Failed to login: incorrect username or password', 'err', 5000))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      dispatch(logoutUser())
      setUsername('')
      setPassword('')
      dispatch(notify('Logged out successfully', 'success', 5000))
    } catch (err) {
      console.error('Log out unsuccessful', err.message)
      dispatch(notify('Failed to logout', 'err', 5000))
    }
  }

  return (
    <Router>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}>
        <Header user={user} cart={cart} handleLogout={handleLogout} />

        <Box sx={{ flex: 1, py: 3 }}>
          <Notification />

          <Routes>
            <Route path="/" element={user ? <ProductList /> : loginForm()} />
            <Route
              path="add-product"
              element={user?.role === 'admin' ? <AddProductForm /> : <Navigate to="/" />}
            />
            <Route
              path="edit-product/:id"
              element={user?.role === 'admin' ? <EditProductForm /> : <Navigate to="/" />}
            />
            <Route path="/cart" element={user ? <Cart /> : <Navigate to="/" />} />
            <Route path="/products/:id" element={<Product />} />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </Router>
  )
}

export default App
