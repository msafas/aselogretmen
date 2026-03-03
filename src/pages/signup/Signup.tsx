import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import { SignUpApi } from "../../api/ApiCollection";
import { useState, useEffect } from "react";
import { Box, Grid, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CustomSnackbar from "../../components/CustomSnackbar";
import useSnackbar from "../../hooks/useSnackbar";

const BackgroundContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 50%, #C4B5FD 100%)",
  padding: theme.spacing(2),
}));

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignUp() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  // Eksik olan state'ler eklendi:
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { open, message, severity, showSnackbar, hideSnackbar } = useSnackbar();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const validateInputs = async () => {
    if (!termsAccepted) {
      showSnackbar("Lütfen şartları kabul edin.", "error");
      return;
    }
    // Basit validasyon
    if (!name || !lastName || !studentName || !email || !phone || !password || !confirmPassword) {
      showSnackbar("Lütfen tüm alanları doldurun.", "error");
      return;
    }
    if (password !== confirmPassword) {
      showSnackbar("Şifreler eşleşmiyor.", "error");
      return;
    }

    // Öğrenci adını ve soyadını ayır
    const [student_first_name, ...student_last_name_arr] = studentName.trim().split(" ");
    const student_last_name = student_last_name_arr.join(" ");

    if (!student_first_name || !student_last_name) {
      showSnackbar("Lütfen öğrenci adını ve soyadını girin.", "error");
      return;
    }

    try {
      const response = await SignUpApi(
        name,
        lastName,
        student_first_name,
        student_last_name,
        email,
        phone,
        password
      );
      if (response) {
        showSnackbar("Kayıt başarılı! Giriş ekranına yönlendiriliyorsunuz...", "success");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        showSnackbar("Kayıt başarısız: API'den yanıt yok", "error");
      }
    } catch (error) {
      showSnackbar("Kayıt başarısız. Lütfen tekrar deneyin.", "error");
    }
  };

  // Form validasyonu: tüm alanlar dolu ve şifreler eşleşiyor mu?
  const isFormValid =
    name.trim() &&
    lastName.trim() &&
    studentName.trim() &&
    email.trim() &&
    phone.trim() &&
    password &&
    confirmPassword &&
    password === confirmPassword &&
    termsAccepted;

  return (
    <BackgroundContainer>
      <Card variant="outlined">
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#7C3AED", mb: 2, textAlign: "center" }}>
          Asel Öğretmen Kayıt
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel htmlFor="name" sx={{ color: "#7C3AED", fontWeight: 600 }}>Ad</FormLabel>
              <TextField
                id="name"
                name="name"
                placeholder="Adınız"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ background: "#FAF5FF", borderRadius: 2 }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel htmlFor="lastName" sx={{ color: "#7C3AED", fontWeight: 600 }}>Soyad</FormLabel>
              <TextField
                id="lastName"
                name="lastName"
                placeholder="Soyadınız"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                sx={{ background: "#FAF5FF", borderRadius: 2 }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel htmlFor="studentName" sx={{ color: "#7C3AED", fontWeight: 600 }}>Öğrenci Adı Soyadı</FormLabel>
              <TextField
                id="studentName"
                name="studentName"
                placeholder="Öğrenci Adı Soyadı"
                variant="outlined"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                sx={{ background: "#FAF5FF", borderRadius: 2 }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel htmlFor="email" sx={{ color: "#7C3AED", fontWeight: 600 }}>Mail</FormLabel>
              <TextField
                id="email"
                name="email"
                placeholder="E-posta adresiniz"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ background: "#FAF5FF", borderRadius: 2 }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel htmlFor="phone" sx={{ color: "#7C3AED", fontWeight: 600 }}>Telefon</FormLabel>
              <TextField
                id="phone"
                name="phone"
                placeholder="Telefon Numaranız"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ background: "#FAF5FF", borderRadius: 2 }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel htmlFor="password" sx={{ color: "#7C3AED", fontWeight: 600 }}>Şifre</FormLabel>
              <TextField
                id="password"
                name="password"
                placeholder="Şifre"
                fullWidth
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                }}
                sx={{ background: "#FAF5FF", borderRadius: 2 }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel htmlFor="confirmPassword" sx={{ color: "#7C3AED", fontWeight: 600 }}>Şifre Tekrar</FormLabel>
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Şifre Tekrar"
                fullWidth
                variant="outlined"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                }}
                sx={{ background: "#FAF5FF", borderRadius: 2 }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  value="terms"
                  color="primary"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  sx={{
                    color: "#7C3AED",
                    '&.Mui-checked': { color: "#7C3AED" }
                  }}
                />
              }
              label={
                <span>
                  Kayıt olarak{" "}
                  <span
                    style={{ color: "#7C3AED", textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => setTermsModalOpen(true)}
                  >
                    gizlilik ve kullanım şartlarını
                  </span>{" "}
                  kabul ediyorum.
                </span>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={validateInputs}
              disabled={!isFormValid}
              sx={{
                fontWeight: 700,
                borderRadius: 2,
                background: "#7C3AED",
                color: "#fff",
                boxShadow: "0 2px 8px rgba(124, 58, 237, 0.2)",
                textTransform: "none",
                '&:hover': {
                  background: "#6D28D9",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(124, 58, 237, 0.3)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Kayıt Ol
            </Button>
          </Grid>
        </Grid>
        <Typography sx={{ textAlign: "center", mt: 2 }}>
          Zaten hesabınız var mı? <Link to="/login" style={{ color: "#7C3AED", fontWeight: 600 }}>Giriş Yap</Link>
        </Typography>
      </Card>
      {/* Gizlilik ve Kullanım Şartları Modalı */}
      <Dialog open={termsModalOpen} onClose={() => setTermsModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Gizlilik ve Kullanım Şartları</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" sx={{ mb: 2 }}>
            <b>Asel Öğretmen Platformu Kullanım ve Gizlilik Şartları</b>
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Bu platforma kayıt olarak aşağıdaki şartları kabul etmiş olursunuz:
          </Typography>
          <ul style={{ paddingLeft: 20 }}>
            <li>
              Kişisel bilgileriniz (ad, soyad, e-posta, telefon vb.) yalnızca kayıt ve iletişim amacıyla kullanılacaktır.
            </li>
            <li>
              Bilgileriniz üçüncü şahıslarla paylaşılmaz, yalnızca yasal zorunluluklar halinde resmi mercilerle paylaşılabilir.
            </li>
            <li>
              Hesabınızın güvenliği için şifrenizi kimseyle paylaşmayınız. Şifrenizin güvenliğinden siz sorumlusunuz.
            </li>
            <li>
              Platformda oluşturulan randevular, yalnızca ilgili eğitmen ve yönetici tarafından görüntülenebilir.
            </li>
            <li>
              Platformun kötüye kullanılması, yanıltıcı bilgi verilmesi veya uygunsuz davranışlar hesabınızın askıya alınmasına neden olabilir.
            </li>
            <li>
              Platformun geliştirilmesi ve hizmet kalitesinin artırılması amacıyla anonim kullanım verileri analiz edilebilir.
            </li>
            <li>
              Gizlilik ve kullanım şartları zaman zaman güncellenebilir. Güncellemeler platform üzerinden duyurulur.
            </li>
          </ul>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Detaylı bilgi ve sorularınız için <b>info@aselogretmen.com</b> adresine ulaşabilirsiniz.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTermsModalOpen(false)} color="primary">
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
      <CustomSnackbar
        open={open}
        message={message}
        severity={severity}
        onClose={hideSnackbar}
      />
    </BackgroundContainer>
  );
}
