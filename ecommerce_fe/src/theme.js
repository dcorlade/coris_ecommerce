import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4A5859', // Muted teal
      light: '#6B7F7F',
      dark: '#2F3B3C'
    },
    secondary: {
      main: '#E8B4B8', // Soft pink
      light: '#F2D2D5',
      dark: '#C88E93'
    },
    background: {
      default: '#F9F7F7',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#2C3639',
      secondary: '#5C6B73'
    }
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.02em'
    },
    h6: {
      fontWeight: 500
    },
    button: {
      textTransform: 'none',
      fontWeight: 500
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '8px 16px'
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }
        }
      }
    }
  }
})
