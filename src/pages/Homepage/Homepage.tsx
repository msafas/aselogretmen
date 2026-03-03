import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Stack,
  Paper,
  AppBar,
  Toolbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SchoolIcon from "@mui/icons-material/School";
import PsychologyIcon from "@mui/icons-material/Psychology";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";


const HeroSection = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: 480,
  background: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 50%, #C4B5FD 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(8, 0),
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 20px rgba(124, 58, 237, 0.15)",
  background: "linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 100%)",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: "1px solid #E9D5FF",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 30px rgba(124, 58, 237, 0.25)",
  },
}));

const StepCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: "0 2px 12px rgba(124, 58, 237, 0.1)",
  background: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  minHeight: 80,
  marginBottom: theme.spacing(2),
  border: "1px solid #E9D5FF",
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: "#A78BFA",
    boxShadow: "0 4px 16px rgba(124, 58, 237, 0.2)",
  },
}));

const TimelineDot = styled(Box)(({ theme }) => ({
  width: 36,
  height: 36,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 22,
  boxShadow: "0 4px 12px rgba(124, 58, 237, 0.3)",
}));

const TimelineConnector = styled(Box)(({ theme }) => ({
  width: 4,
  height: 32,
  background: "linear-gradient(180deg, #A78BFA 0%, #C4B5FD 100%)",
  margin: "0 auto",
  borderRadius: 2,
}));

const features = [
  {
    icon: <PsychologyIcon sx={{ fontSize: 40, color: "#7C3AED" }} />,
    title: "Otizm Spektrum Bozukluğu",
    desc: "Otizmli çocuklar için özel eğitim ve gelişim programları.",
  },
  {
    icon: <AutoStoriesIcon sx={{ fontSize: 40, color: "#7C3AED" }} />,
    title: "Disleksi Desteği",
    desc: "Disleksi ve okuma güçlüğü yaşayan öğrenciler için özel programlar.",
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 40, color: "#7C3AED" }} />,
    title: "Öğrenme Güçlüğü",
    desc: "Bireysel ihtiyaçlara göre özelleştirilmiş öğrenme stratejileri.",
  },
  {
    icon: <FavoriteIcon sx={{ fontSize: 40, color: "#EC4899" }} />,
    title: "Floortime Eğitimi",
    desc: "Çocuğunuzun gelişimini destekleyen etkileşimli oyun temelli terapi.",
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 40, color: "#F59E0B" }} />,
    title: "Akıcı Okuma",
    desc: "Okuma hızı ve anlama becerilerini geliştirmeye yönelik özel programlar.",
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 40, color: "#10B981" }} />,
    title: "Davranış Desteği",
    desc: "Davranış bozukluklarında uzman eğitmen eşliğinde profesyonel destek.",
  },
];

const steps = [
  {
    icon: <PersonIcon />,
    title: "İlk Görüşme",
    desc: "Çocuğunuzun ihtiyaçlarını değerlendirmek için ücretsiz ön görüşme yapın.",
  },
  {
    icon: <PsychologyIcon />,
    title: "Bireysel Değerlendirme",
    desc: "Öğrenciniz için özel eğitim planı hazırlıyoruz.",
  },
  {
    icon: <SchoolIcon />,
    title: "Eğitim Başlasın",
    desc: "Uzman eğitmenle bireysel veya grup derslerine başlayın.",
  },
  {
    icon: <StarIcon />,
    title: "İlerleme Takibi",
    desc: "Düzenli raporlarla çocuğunuzun gelişimini takip edin.",
  },
];

// const coaches = [
//   {
//     name: "Ayşe Yılmaz",
//     title: "Baş Eğitmen",
//     img: "path/to/coach1.jpg", // Replace with actual image path
//     desc: "20+ yıllık deneyimiyle çocuk ve yetişkinlere özel yüzme eğitimi.",
//   },
//   {
//     name: "Mehmet Demir",
//     title: "Yüzme Antrenörü",
//     img: "path/to/coach2.jpg", // Replace with actual image path
//     desc: "Milli sporcu geçmişiyle teknik ve motivasyon odaklı eğitim.",
//   },
//   {
//     name: "Elif Kaya",
//     title: "Çocuk Yüzme Uzmanı",
//     img: "path/to/coach3.jpg", // Replace with actual image path
//     desc: "Çocuklara özel eğlenceli ve güvenli yüzme dersleri.",
//   },
// ];

const testimonials = [
  {
    name: "Ayşe Y.",
    occupation: "Veli - Otizmli Çocuk Ailesi",
    testimonial: "Oğlumun sosyal becerileri ve iletişimi büyük gelişme gösterdi. Asel öğretmene çok teşekkür ederiz.",
  },
  {
    name: "Mehmet D.",
    occupation: "Veli - Disleksi",
    testimonial: "Kızım artık okumayı seviyor ve kendine güveni arttı. Floortime yaklaşımı gerçekten etkili oldu.",
  },
  {
    name: "Elif K.",
    occupation: "Veli - Öğrenme Güçlüğü",
    testimonial: "Oğlum okul başarısında çok ilerleme kaydetti. Bireysel eğitim programı harika çalışıyor.",
  },
];

const faqs = [
  {
    q: "Hangi özel eğitim alanlarında hizmet veriyorsunuz?",
    a: "Otizm spektrum bozukluğu, disleksi, öğrenme güçlüğü, davranış bozuklukları, floortime eğitimi ve akıcı okuma programları sunuyoruz.",
  },
  {
    q: "Ön görüşme ücretsiz mi?",
    a: "Evet, ilk ön görüşme tamamen ücretsizdir. Bu görüşmede çocuğunuzun ihtiyaçlarını değerlendirir ve size en uygun eğitim planını öneriyoruz.",
  },
  {
    q: "Eğitim süresi ne kadardır?",
    a: "Bireysel eğitim planına göre değişir. Genellikle seanslar 45-60 dakika sürer ve haftada 2-3 gün önerilir.",
  },
  {
    q: "Online eğitim imkanı var mı?",
    a: "Evet, uzaktan eğitim seçeneğimiz de bulunmaktadır. Ancak ilk değerlendirme yüz yüze yapılmalıdır.",
  },
  {
    q: "Nasıl randevu alabilirim?",
    a: "Ana sayfadaki 'Ücretsiz Ön Görüşme' butonuna tıklayarak formu doldurabilirsiniz. En kısa sürede sizinle iletişime geçeceğiz.",
  },
];

export default function Homepage() {
  return (
    <Box sx={{ bgcolor: "#FAF5FF" }}>
      {/* HEADER */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 2 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ color: "#7C3AED", fontWeight: 900 }}>
            Asel Öğretmen
          </Typography>
          <Box>
            <Button
              component={Link}
              to="/randevu"
              variant="contained"
              color="primary"
              sx={{
                fontWeight: 700,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(124, 58, 237, 0.25)",
                mr: 2,
                bgcolor: "#7C3AED",
                "&:hover": {
                  bgcolor: "#6D28D9",
                  boxShadow: "0 6px 16px rgba(124, 58, 237, 0.35)",
                }
              }}
            >
              Ön Görüşme Randevusu
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              color="primary"
              sx={{
                fontWeight: 700,
                borderRadius: 2,
                bgcolor: "#fff",
                color: "#7C3AED",
                borderColor: "#7C3AED",
                borderWidth: 2,
                "&:hover": {
                  bgcolor: "#F5F3FF",
                  borderColor: "#6D28D9",
                  borderWidth: 2,
                  color: "#6D28D9"
                }
              }}
            >
              Yönetici Girişi
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {/* HERO */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  color: "#FFFFFF",
                  mb: 3,
                  fontSize: { xs: "2.2rem", md: "3.2rem" },
                  lineHeight: 1.1,
                  textShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                Özel Eğitim ve Gelişim <span style={{ color: "#FDE68A" }}>Uzmanı Asel Öğretmen</span>
              </Typography>
              <Typography variant="h6" sx={{ color: "#FFFFFF", mb: 4, textShadow: "0 1px 5px rgba(0,0,0,0.1)" }}>
                Otizm, disleksi, öğrenme güçlüğü ve davranış bozuklukları için birebir özel eğitim. Floortime ve akıcı okuma programlarıyla çocuğunuzun potansiyelini ortaya çıkarın!
              </Typography>
              <Typography variant="body1" sx={{ color: "#FDE68A", fontWeight: 700, mb: 2, fontSize: "1.1rem" }}>
                Ücretsiz ön görüşme için hemen randevu alın.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  component={Link}
                  to="/randevu"
                  variant="contained"
                  size="large"
                  sx={{
                    px: 5,
                    py: 1.5,
                    fontWeight: 700,
                    borderRadius: 3,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    bgcolor: "#FFFFFF",
                    color: "#7C3AED",
                    "&:hover": {
                      bgcolor: "#FDE68A",
                      color: "#6D28D9",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 25px rgba(0,0,0,0.25)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Ücretsiz Ön Görüşme
                </Button>

              </Stack>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  width: { xs: "100%", md: 400 },
                  height: { xs: 280, md: 480 },
                  borderRadius: 6,
                  boxShadow: "0 8px 40px rgba(124, 58, 237, 0.4)",
                  background: "linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 100%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "4px solid #FFFFFF",
                  gap: 3,
                  p: 4,
                }}
              >
                <Box sx={{ display: "flex", gap: 3, alignItems: "center", justifyContent: "center" }}>
                  <Box sx={{
                    background: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
                    borderRadius: "50%",
                    p: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 20px rgba(124, 58, 237, 0.3)",
                    animation: "float 3s ease-in-out infinite"
                  }}>
                    <PsychologyIcon sx={{ fontSize: 56, color: "#FFFFFF" }} />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 3, alignItems: "center", justifyContent: "center" }}>
                  <Box sx={{
                    background: "linear-gradient(135deg, #EC4899 0%, #F472B6 100%)",
                    borderRadius: "50%",
                    p: 2.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 20px rgba(236, 72, 153, 0.3)",
                    animation: "float 3s ease-in-out infinite 0.5s"
                  }}>
                    <AutoStoriesIcon sx={{ fontSize: 48, color: "#FFFFFF" }} />
                  </Box>
                  <Box sx={{
                    background: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
                    borderRadius: "50%",
                    p: 2.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 20px rgba(16, 185, 129, 0.3)",
                    animation: "float 3s ease-in-out infinite 1s"
                  }}>
                    <FavoriteIcon sx={{ fontSize: 48, color: "#FFFFFF" }} />
                  </Box>
                </Box>
                <Typography variant="h6" sx={{ color: "#7C3AED", fontWeight: 700, textAlign: "center", mt: 2 }}>
                  Bireysel Eğitim Programları
                </Typography>
                <Typography variant="body2" sx={{ color: "#6B7280", textAlign: "center" }}>
                  Otizm • Disleksi • Öğrenme Güçlüğü
                </Typography>
                <style>
                  {`
                    @keyframes float {
                      0%, 100% { transform: translateY(0px); }
                      50% { transform: translateY(-10px); }
                    }
                  `}
                </style>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* AVANTAJLAR */}
      <Box sx={{ bgcolor: "#FFFFFF", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#7C3AED", mb: 2, textAlign: "center" }}>
            Uzmanlık Alanlarımız
          </Typography>
          <Typography variant="body1" sx={{ color: "#6B7280", mb: 6, textAlign: "center", maxWidth: 700, mx: "auto" }}>
            Çocuğunuzun benzersiz ihtiyaçlarına yönelik profesyonel destek ve bireysel eğitim programları
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <FeatureCard>
                  {feature.icon}
                  <Typography variant="h6" sx={{ fontWeight: 700, mt: 2, mb: 1, color: "#1F2937" }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center" }}>
                    {feature.desc}
                  </Typography>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* EĞİTİM SÜRECİ */}
      <Box sx={{ bgcolor: "#FAF5FF", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#7C3AED", mb: 2, textAlign: "center" }}>
            Eğitim Süreci
          </Typography>
          <Typography variant="body1" sx={{ color: "#6B7280", mb: 6, textAlign: "center", maxWidth: 700, mx: "auto" }}>
            Profesyonel değerlendirmeden bireysel eğitime, adım adım takip ettiğimiz süreç
          </Typography>
          <Grid container spacing={8} justifyContent="center">
            <Grid item xs={12} md={8}>
              {steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <StepCard>
                    <TimelineDot>{step.icon}</TimelineDot>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{step.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{step.desc}</Typography>
                    </Box>
                  </StepCard>
                  {idx < steps.length - 1 && <TimelineConnector />}
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* EĞİTMENLER */}
      {/* <Box sx={{ bgcolor: "#fafdff", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#0099ff", mb: 6, textAlign: "center" }}>
            Eğitmenlerimiz
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {coaches.map((coach, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card sx={{ p: 3, borderRadius: 4, textAlign: "center", boxShadow: "0 2px 16px 0 #0099ff22" }}>
                  <Avatar
                    src={coach.img}
                    alt={coach.name}
                    sx={{ width: 80, height: 80, mx: "auto", mb: 2, boxShadow: "0 2px 8px #0099ff22" }}
                  />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>{coach.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{coach.title}</Typography>
                  <Typography variant="body2" sx={{ color: "text.primary" }}>{coach.desc}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box> */}

      {/* VELİ YORUMLARI */}
      <Box sx={{ bgcolor: "#FFFFFF", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#7C3AED", mb: 2, textAlign: "center" }}>
            Velilerimiz Ne Diyor?
          </Typography>
          <Typography variant="body1" sx={{ color: "#6B7280", mb: 6, textAlign: "center", maxWidth: 700, mx: "auto" }}>
            Ailelerimizin deneyimlerinden ilham alın
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {testimonials.map((item, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    textAlign: "center",
                    background: "linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 100%)",
                    border: "2px solid #E9D5FF",
                    boxShadow: "0 4px 20px rgba(124, 58, 237, 0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 30px rgba(124, 58, 237, 0.2)",
                      borderColor: "#A78BFA",
                    },
                  }}
                >
                  <StarIcon sx={{ color: "#F59E0B", fontSize: 40, mb: 1 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{item.occupation}</Typography>
                  <Typography variant="body1" sx={{ color: "text.primary" }}>"{item.testimonial}"</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* SIKÇA SORULAN SORULAR */}
      <Box sx={{ bgcolor: "#FAF5FF", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#7C3AED", mb: 2, textAlign: "center" }}>
            Sıkça Sorulan Sorular
          </Typography>
          <Typography variant="body1" sx={{ color: "#6B7280", mb: 6, textAlign: "center" }}>
            Merak ettiğiniz her şey hakkında
          </Typography>
          <Stack spacing={3}>
            {faqs.map((faq, idx) => (
              <Paper
                key={idx}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: "#FFFFFF",
                  border: "1px solid #E9D5FF",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#A78BFA",
                    boxShadow: "0 4px 16px rgba(124, 58, 237, 0.15)",
                  },
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#7C3AED", mb: 1 }}>{faq.q}</Typography>
                <Typography variant="body2" color="text.secondary">{faq.a}</Typography>
              </Paper>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* CALL TO ACTION */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
          py: { xs: 8, md: 12 }
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: 900, color: "#FFFFFF", mb: 2, textShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
            🎓 Çocuğunuzun gelişimi için ilk adımı atın!
          </Typography>
          <Typography variant="h6" sx={{ color: "#FFFFFF", mb: 4, textShadow: "0 1px 5px rgba(0,0,0,0.1)" }}>
            Ücretsiz ön görüşme için hemen başvurun, uzman özel eğitim öğretmeniyle çocuğunuzun potansiyelini keşfedin!
          </Typography>
          <Button
            component={Link}
            to="/randevu"
            variant="contained"
            size="large"
            sx={{
              px: 8,
              py: 1.5,
              fontWeight: 700,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              bgcolor: "#FFFFFF",
              color: "#7C3AED",
              "&:hover": {
                bgcolor: "#FDE68A",
                color: "#6D28D9",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 25px rgba(0,0,0,0.25)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Ücretsiz Randevu Al
          </Button>
        </Container>
      </Box>
      {/* Footer iletişim bilgileri - profesyonel tasarım */}
      <Box
        sx={{
          bgcolor: "#FAF5FF",
          py: 5,
          borderTop: "2px solid #E9D5FF",
          mt: 0,
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "center", md: "flex-start" },
                  gap: 1,
                }}
              >
                <Typography variant="subtitle2" sx={{ color: "#7C3AED", fontWeight: 700, mb: 0.5 }}>
                  İletişim Bilgileri
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <svg width="20" height="20" fill="#7C3AED" viewBox="0 0 24 24">
                    <path d="M20 4H4C2.897 4 2 4.897 2 6v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.333-8-5.333V6h16zM4 20v-9.489l7.445 4.963a1 1 0 0 0 1.11 0L20 10.511V20H4z" />
                  </svg>
                  <a href="mailto:info@aselogretmen.com" style={{ color: "#7C3AED", fontWeight: 600, textDecoration: "none" }}>
                    info@aselogretmen.com
                  </a>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <svg width="20" height="20" fill="#7C3AED" viewBox="0 0 24 24">
                    <path d="M17.707 12.293l-3-3A.997.997 0 0 0 14 9h-4a.997.997 0 0 0-.707.293l-3 3A.999.999 0 0 0 6 13v5c0 1.103.897 2 2 2h8c1.103 0 2-.897 2-2v-5a.999.999 0 0 0-.293-.707zM12 4c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0 2c-.551 0-1 .449-1 1s.449 1 1 1 1-.449 1-1-.449-1-1-1z" />
                  </svg>
                  <a href="tel:+905331407746" style={{ color: "#7C3AED", fontWeight: 600, textDecoration: "none" }}>
                    +90 533 140 77 46
                  </a>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2" sx={{ color: "#7C3AED", fontWeight: 700, mb: 0.5 }}>
                Sosyal Medya
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#7C3AED", display: "inline-flex", alignItems: "center", textDecoration: "none", fontWeight: 600 }}
                >
                  <svg width="22" height="22" fill="#7C3AED" viewBox="0 0 24 24" style={{ marginRight: 6 }}>
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                  Instagram
                </a>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: "center", md: "right" } }}>
              <Typography variant="subtitle2" sx={{ color: "#7C3AED", fontWeight: 700, mb: 0.5 }}>
                Adres
              </Typography>
              <Typography variant="body2" sx={{ color: "#7C3AED", fontWeight: 600 }}>
                Kahramanmaraş, Türkiye
              </Typography>
              <Typography variant="caption" sx={{ color: "#888" }}>
                © {new Date().getFullYear()} Asel Öğretmen. Tüm hakları saklıdır.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
