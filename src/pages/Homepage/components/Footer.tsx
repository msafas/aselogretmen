import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import { useTranslation } from '../../../hooks/useTranslation';

function Copyright() {
  const { t } = useTranslation();
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {t('FOOTER_COPYRIGHT')}
      <Link color="text.secondary" href="https://mui.com/">
        OtoCep
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  const { t } = useTranslation();
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      {/* <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: { xs: '100%', sm: '60%' },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
            <SitemarkIcon />
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
              {t('FOOTER_NEWSLETTER_TITLE')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              {t('FOOTER_NEWSLETTER_SUBTITLE')}
            </Typography>
            <InputLabel htmlFor="email-newsletter">{t('FOOTER_EMAIL')}</InputLabel>
            <Stack direction="row" spacing={1} useFlexGap>
              <TextField
                id="email-newsletter"
                hiddenLabel
                size="small"
                variant="outlined"
                fullWidth
                aria-label={t('FOOTER_EMAIL_PLACEHOLDER')}
                placeholder={t('FOOTER_EMAIL_PLACEHOLDER')}
                sx={{ width: '250px' }}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ flexShrink: 0 }}
              >
                {t('FOOTER_SUBSCRIBE')}
              </Button>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {t('FOOTER_PRODUCT')}
          </Typography>
          <Link color="text.secondary" variant="body2" href="#">
            {t('HOMEPAGE_FEATURES')}
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            {t('HOMEPAGE_TESTIMONIALS')}
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            {t('HOMEPAGE_HIGHLIGHTS')}
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            {t('HOMEPAGE_PRICING')}
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            {t('HOMEPAGE_FAQ')}
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {t('FOOTER_COMPANY')}
          </Typography>
          <Link color="text.secondary" variant="body2" href="#">
            {t('FOOTER_ABOUT_US')}
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            {t('FOOTER_CAREERS')}
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            {t('FOOTER_PRESS')}
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {t('FOOTER_LEGAL')}
          </Typography>
          <Link color="text.secondary" variant="body2" href="#">
            {t('FOOTER_TERMS')}
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            {t('FOOTER_PRIVACY')}
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            {t('FOOTER_CONTACT')}
          </Link>
        </Box>
      </Box> */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <div>
          <Link color="text.secondary" variant="body2" href="#">
            {t('FOOTER_PRIVACY_POLICY')}
          </Link>
          <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" variant="body2" href="#">
            {t('FOOTER_TERMS_OF_SERVICE')}
          </Link>
          <Copyright />
        </div>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ justifyContent: 'left', color: 'text.secondary' }}
        >
          <IconButton
            color="inherit"
            size="small"
            href="https://github.com/mui"
            aria-label="GitHub"
            sx={{ alignSelf: 'center' }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="https://x.com/MaterialUI"
            aria-label="X"
            sx={{ alignSelf: 'center' }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="https://www.linkedin.com/company/mui/"
            aria-label="LinkedIn"
            sx={{ alignSelf: 'center' }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
