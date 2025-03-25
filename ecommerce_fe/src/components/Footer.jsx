import { Box, Typography, Container, Link } from '@mui/material'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100]
      }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Coris SRL
          {' • '}
          <Link color="inherit" href="#">
            Privacy
          </Link>
          {' • '}
          <Link color="inherit" href="#">
            Terms
          </Link>
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
