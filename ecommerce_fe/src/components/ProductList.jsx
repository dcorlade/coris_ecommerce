import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardMedia, Button, Typography, Grid2 as Grid, Box } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import QuantityField from './QuantityField'

const ProductList = () => {
  const products = useSelector((state) => state.products)
  const user = useSelector((state) => state.loggedUser)
  const navigate = useNavigate()

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
                image={product.imageUrl || 'https://picsum.photos/seed/picsum/800'}
                alt={product.title}
                sx={{ objectFit: 'contain' }}
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
              <QuantityField product={product} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ProductList
