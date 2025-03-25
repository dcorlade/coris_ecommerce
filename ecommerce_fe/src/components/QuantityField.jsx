import { Button, ButtonGroup, CardActions, IconButton, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { addToCart } from '../reducers/cartReducer'

const QuantityField = ({ product, vertical = false }) => {
  const [quantities, setQuantities] = useState({})
  const dispatch = useDispatch()

  const getQuantity = (productId) => quantities[productId] || 1

  const handleQuantityChange = (id, newQuantity) => {
    setQuantities({
      ...quantities,
      [id]: newQuantity
    })
  }

  const addProductToCart = (event, product) => {
    event.stopPropagation()
    const quantity = getQuantity(product.id)
    dispatch(addToCart(product, quantity))
  }

  return (
    <CardActions
      onClick={(e) => e.stopPropagation()}
      sx={{
        p: 3,
        pt: 0,
        gap: 1,
        flexDirection: vertical ? 'column' : 'row',
        justifyContent: 'space-between'
      }}>
      <ButtonGroup size="small">
        <IconButton
          onClick={() => handleQuantityChange(product.id, getQuantity(product.id) - 1)}
          disabled={getQuantity(product.id) <= 1}>
          <RemoveIcon />
        </IconButton>
        <TextField
          value={getQuantity(product.id)}
          onChange={(e) => {
            handleQuantityChange(product.id, parseInt(e.target.value))
          }}
          sx={{
            width: '50px',
            '& .MuiInputBase-input': {
              textAlign: 'center',
              p: '4px'
            },
            justifyContent: 'center'
          }}
          slotProps={{
            htmlInput: {
              maxLength: 4,
              style: { textAlign: 'center' }
            }
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
  )
}

export default QuantityField
