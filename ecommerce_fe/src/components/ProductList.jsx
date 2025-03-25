import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid2 as Grid,
  Box,
  IconButton,
  TextField,
  ButtonGroup
} from '@mui/material'
import { addToCart } from '../reducers/cartReducer'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const ProductList = () => {
  const products = useSelector((state) => state.products)
  const user = useSelector((state) => state.loggedUser)
  const [quantities, setQuantities] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getQuantity = (productId) => quantities[productId] || 1

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 9999) {
      setQuantities({
        ...quantities,
        [id]: newQuantity
      })
    }
  }

  const addProductToCart = (event, product) => {
    event.stopPropagation()
    const quantity = getQuantity(product.id)
    dispatch(addToCart(product, quantity))
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
        Our Products
      </Typography>

      {user?.role === 'admin' && (
        <Button
          component={Link}
          to="/add-product"
          variant="contained"
          color="primary"
          sx={{ mb: 4 }}>
          <AddIcon /> Add New Product
        </Button>
      )}

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid size={4} key={product.id}>
            <Card
              onClick={() => navigate(`/products/${product.id}`)}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
                }
              }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image || 'https://picsum.photos/seed/picsum/800'}
                alt={product.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {product.provider}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                  {product.price} RON
                </Typography>
              </CardContent>

              <CardActions
                onClick={(e) => e.stopPropagation()}
                sx={{
                  p: 3,
                  pt: 0,
                  gap: 1,
                  justifyContent: 'space-between'
                }}>
                <ButtonGroup
                  size="small"
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1
                  }}>
                  <IconButton
                    onClick={() => handleQuantityChange(product.id, getQuantity(product.id) - 1)}
                    disabled={getQuantity(product.id) <= 1}>
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    value={getQuantity(product.id)}
                    onChange={(e) => {
                      const value = parseInt(e.target.value)
                      if (!isNaN(value)) {
                        handleQuantityChange(product.id, value)
                      }
                    }}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault()
                      }
                    }}
                    sx={{
                      width: '50px',
                      '& .MuiInputBase-input': {
                        textAlign: 'center',
                        p: '4px'
                      }
                    }}
                    inputProps={{
                      min: 1,
                      max: 9999,
                      style: { textAlign: 'center' }
                    }}
                  />
                  <IconButton
                    onClick={() => handleQuantityChange(product.id, getQuantity(product.id) + 1)}
                    disabled={getQuantity(product.id) >= 9999}>
                    <AddIcon />
                  </IconButton>
                </ButtonGroup>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => addProductToCart(e, product)}
                  sx={{
                    minWidth: '120px'
                  }}>
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ProductList
