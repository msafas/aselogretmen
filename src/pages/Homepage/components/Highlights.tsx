import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SpeedIcon from '@mui/icons-material/Speed'; // Hız simgesi
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'; // Temizlik simgesi
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'; // Güvenilirlik simgesi
import PriceCheckIcon from '@mui/icons-material/PriceCheck'; // Fiyat kontrol simgesi
import SupportAgentIcon from '@mui/icons-material/SupportAgent'; // Destek simgesi
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; // Teklifler simgesi

const items = [
  {
    icon: <SpeedIcon />,
    title: 'Hızlı ve Kolay Rezervasyon',
    description:
      'İhtiyacınıza uygun yıkama hizmetini hızlıca bulun ve kolayca rezervasyonunuzu oluşturun.',
  },
  {
    icon: <CleaningServicesIcon />,
    title: 'Profesyonel Yıkama',
    description: 'Deneyimli yıkamacılarımız aracınızı en iyi şekilde temizler.',
  },
  {
    icon: <VerifiedUserIcon />,
    title: 'Güvenilir Hizmet',
    description:
      'Tüm yıkamacılarımız doğrulanmıştır ve güvenli bir hizmet sunar.',
  },
    {
    icon: <PriceCheckIcon />,
    title: 'Şeffaf Fiyatlandırma',
    description:
      'Hizmetlerimiz için net ve rekabetçi fiyatlar sunuyoruz. Sürprizlerle karşılaşmazsınız.',
  },
  {
    icon: <SupportAgentIcon />,
    title: '7/24 Müşteri Desteği',
    description: 'Sorularınız veya yardıma ihtiyacınız olduğunda her zaman yanınızdayız.',
  },
  {
    icon: <LocalOfferIcon />,
    title: 'Özel Teklifler ve Kampanyalar',
    description: 'Düzenli olarak sunduğumuz özel tekliflerden ve kampanyalardan yararlanın.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: 'grey.900',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4" gutterBottom>
            Öne Çıkan Özellikler
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Araç yıkama hizmetimizin öne çıkan yönlerini keşfedin: hızlı rezervasyon, profesyonel yıkama, güvenilirlik, şeffaf fiyatlandırma, 7/24 destek ve özel teklifler.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid item xs={12} md={4} sm={6} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  color: 'inherit',
                  p: 3,
                  height: '100%',
                  borderColor: 'hsla(220, 25%, 25%, 0.3)',
                  backgroundColor: 'grey.800',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}