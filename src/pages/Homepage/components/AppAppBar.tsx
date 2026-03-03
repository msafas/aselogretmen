import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../../hooks/useTranslation';
import otocepLogo from '../../../assets/otoceplogo.png';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 12px)`,
  backdropFilter: 'blur(32px)',
  // border: '1.5px solid',
  borderColor: theme.palette.primary.main,
  boxShadow: '0 4px 24px 0 rgba(255,136,0,0.08)',
  padding: '12px 20px',
  background: 'rgba(255, 255, 255, 0.85)',
  ...theme.applyStyles('dark', {
    background: 'rgba(30, 30, 30, 0.85)',
    borderColor: theme.palette.primary.dark,
  }),
}));

export default function AppAppBar() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
        border: 'none',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img
                src={otocepLogo}
                alt="OtoCep Logo"
                style={{ height: 40, width: 'auto', objectFit: 'contain', borderRadius: 8 }}
                onError={e => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/120x40?text=OtoCep";
                }}
              />

            </Box>
            {/* <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 3, gap: 1 }}>
              <Button
                variant="text"
                color="primary"
                size="small"
                sx={{
                  fontWeight: 600,
                  color: 'primary.main',
                  '&:hover': { color: 'primary.dark', background: 'rgba(255,136,0,0.08)' },
                }}
              >
                {t('HOMEPAGE_FEATURES')}
              </Button>
              <Button
                variant="text"
                color="primary"
                size="small"
                sx={{
                  fontWeight: 600,
                  color: 'primary.main',
                  '&:hover': { color: 'primary.dark', background: 'rgba(255,136,0,0.08)' },
                }}
              >
                {t('HOMEPAGE_TESTIMONIALS')}
              </Button>
              <Button
                variant="text"
                color="primary"
                size="small"
                sx={{
                  fontWeight: 600,
                  color: 'primary.main',
                  '&:hover': { color: 'primary.dark', background: 'rgba(255,136,0,0.08)' },
                }}
              >
                {t('HOMEPAGE_HIGHLIGHTS')}
              </Button>
              <Button
                variant="text"
                color="primary"
                size="small"
                sx={{
                  fontWeight: 600,
                  color: 'primary.main',
                  '&:hover': { color: 'primary.dark', background: 'rgba(255,136,0,0.08)' },
                }}
              >
                {t('HOMEPAGE_PRICING')}
              </Button>
              <Button
                variant="text"
                color="primary"
                size="small"
                sx={{
                  fontWeight: 600,
                  minWidth: 0,
                  color: 'primary.main',
                  '&:hover': { color: 'primary.dark', background: 'rgba(255,136,0,0.08)' },
                }}
              >
                {t('HOMEPAGE_FAQ')}
              </Button>
              <Button
                variant="text"
                color="primary"
                size="small"
                sx={{
                  fontWeight: 600,
                  minWidth: 0,
                  color: 'primary.main',
                  '&:hover': { color: 'primary.dark', background: 'rgba(255,136,0,0.08)' },
                }}
              >
                {t('HOMEPAGE_BLOG')}
              </Button>
            </Box> */}
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1.5,
              alignItems: 'center',
            }}
          >
            <Button
              component={Link}
              to="/randevu"
              color="primary"
              variant="contained"
              size="small"
              sx={{
                fontWeight: 600,
                borderRadius: 2,
                px: 2.5,
                background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                color: '#fff',
                boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)',
                },
              }}
            >
              Randevu Al
            </Button>
            <Button
              component={Link}
              to="/login"
              color="primary"
              variant="outlined"
              size="small"
              sx={{
                fontWeight: 600,
                borderRadius: 2,
                px: 2.5,
                borderWidth: 2,
                borderColor: '#7C3AED',
                color: '#7C3AED',
                '&:hover': {
                  background: 'rgba(124, 58, 237, 0.05)',
                  borderColor: '#6D28D9',
                },
              }}
            >
              {t('HOMEPAGE_CUSTOMER_SIGN_IN')}
            </Button>
            <Button
              component={Link}
              to="/signup"
              color="primary"
              variant="outlined"
              size="small"
              sx={{
                fontWeight: 600,
                borderRadius: 2,
                px: 2.5,
                borderWidth: 2,
                borderColor: '#7C3AED',
                color: '#7C3AED',
                '&:hover': {
                  background: 'rgba(124, 58, 237, 0.05)',
                  borderColor: '#6D28D9',
                },
              }}
            >
              {t('HOMEPAGE_COMPANY_SIGN_IN')}
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ color: 'primary.main' }} />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                  background: 'rgba(255,255,255,0.97)',
                  ...((theme) => theme.applyStyles?.('dark', {
                    background: 'rgba(30,30,30,0.97)',
                  })),
                  borderTop: '2px solid #ff8800',
                },
              }}
            >
              <Box sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon sx={{ color: 'primary.main' }} />
                  </IconButton>
                </Box>
                <MenuItem>
                  <Button variant="text" color="primary" fullWidth sx={{ fontWeight: 500 }}>
                    {t('HOMEPAGE_FEATURES')}
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button variant="text" color="primary" fullWidth sx={{ fontWeight: 500 }}>
                    {t('HOMEPAGE_TESTIMONIALS')}
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button variant="text" color="primary" fullWidth sx={{ fontWeight: 500 }}>
                    {t('HOMEPAGE_HIGHLIGHTS')}
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button variant="text" color="primary" fullWidth sx={{ fontWeight: 500 }}>
                    {t('HOMEPAGE_PRICING')}
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button variant="text" color="primary" fullWidth sx={{ fontWeight: 500 }}>
                    {t('HOMEPAGE_FAQ')}
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button variant="text" color="primary" fullWidth sx={{ fontWeight: 500 }}>
                    {t('HOMEPAGE_BLOG')}
                  </Button>
                </MenuItem>
                <Divider sx={{ my: 3, borderColor: 'primary.main', opacity: 0.2 }} />
                <MenuItem>
                  <Button
                    component={Link}
                    to="/randevu"
                    color="primary"
                    variant="contained"
                    fullWidth
                    sx={{
                      fontWeight: 600,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                      color: '#fff',
                      boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)',
                      },
                    }}
                  >
                    Randevu Al
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    component={Link}
                    to="/signup"
                    color="primary"
                    variant="outlined"
                    fullWidth
                    sx={{
                      fontWeight: 600,
                      borderRadius: 2,
                      borderWidth: 2,
                      borderColor: '#7C3AED',
                      color: '#7C3AED',
                      '&:hover': {
                        background: 'rgba(124, 58, 237, 0.05)',
                        borderColor: '#6D28D9',
                      },
                    }}
                  >
                    {t('HOMEPAGE_SIGN_UP')}
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    component={Link}
                    to="/login"
                    color="primary"
                    variant="outlined"
                    fullWidth
                    sx={{
                      fontWeight: 600,
                      borderRadius: 2,
                      borderWidth: 2,
                      borderColor: '#7C3AED',
                      color: '#7C3AED',
                      '&:hover': {
                        background: 'rgba(124, 58, 237, 0.05)',
                        borderColor: '#6D28D9',
                      },
                    }}
                  >
                    {t('HOMEPAGE_SIGN_IN')}
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
