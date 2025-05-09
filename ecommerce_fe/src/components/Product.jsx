import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid2 as Grid,
  Box,
  Chip
} from '@mui/material'
import { notify } from '../reducers/notificationReducer'
import { deleteProduct } from '../reducers/productReducer'
import QuantityField from './QuantityField'

const Product = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const product = useSelector((state) => state.products.find((p) => p.id === id))
  const user = useSelector((state) => state.loggedUser)

  if (!product) {
    return null
  }

  const removeProduct = (event) => {
    event.preventDefault()

    try {
      dispatch(deleteProduct(id))
      dispatch(notify('Product deleted successfully', 'success', 5000))
      navigate('/')
    } catch (err) {
      console.error('Failed to delete the product', err.message)
      dispatch(notify('Failed to delete the product', 'err', 5000))
    }
  }

  return (
    <Container maxWidth="md">
      <Button onClick={() => navigate('/')} sx={{ mt: 2, mb: 2 }}>
        ← Back to products
      </Button>

      <Card>
        <CardContent>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h4" gutterBottom>
                {product.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Provider: {product.provider}
              </Typography>
              {product.category && (
                <Box sx={{ mb: 2 }}>
                  <Chip label={product.category} variant="outlined" size="small" />
                </Box>
              )}
              <Box
                sx={{
                  mt: 2,
                  position: 'relative',
                  width: '80%',
                  maxWidth: '300px',
                  height: 0,
                  paddingTop: '45%',
                  borderRadius: 1,
                  overflow: 'hidden',
                  boxShadow: 3
                }}>
                <Box
                  component="img"
                  src={product.imageUrl || 'https://picsum.photos/seed/picsum/800'}
                  alt={product.title}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </Box>
              <Typography variant="body1" component={'div'} sx={{ mt: 2 }}>
                {product.description}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  p: 4,
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    mb: 2,
                    width: '100%'
                  }}>
                  Price: {product.price} RON
                </Typography>
                <Typography
                  color={product.stock > 0 ? 'success.main' : 'error.main'}
                  gutterBottom
                  sx={{ width: '100%' }}>
                  {' '}
                  {user?.role === 'admin' && `In Stock (${product.stock})`}
                </Typography>
                {user?.role !== 'admin' && product.stock > 0 && (
                  <Box sx={{ width: '100%' }}>
                    {' '}
                    <QuantityField product={product} vertical={true} />
                  </Box>
                )}
                {user?.role === 'admin' && (
                  <>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      sx={{ mt: 1 }}
                      onClick={() => navigate(`/edit-product/${product.id}`)}>
                      Edit Product
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      fullWidth
                      sx={{ mt: 1 }}
                      onClick={removeProduct}>
                      Delete Product
                    </Button>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Product
