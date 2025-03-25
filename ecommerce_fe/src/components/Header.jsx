import { AppBar, Button, Toolbar, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonIcon from '@mui/icons-material/Person'

const Header = ({ user, cart, handleLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              fontSize: '1.1rem',
              fontWeight: 500
            }}>
            Products
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/cart"
                startIcon={<ShoppingCartIcon />}
                sx={{ borderRadius: 2 }}>
                Cart ({cart.length})
              </Button>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: '4px 12px',
                  borderRadius: 2
                }}>
                <PersonIcon />
                <Typography variant="body2">{user.username}</Typography>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  size="small"
                  sx={{
                    ml: 1,
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)'
                    }
                  }}>
                  Logout
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
