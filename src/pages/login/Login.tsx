import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import { useNavigate } from "react-router-dom";
import ChangeThemes from "../../components/ChangesThemes";
import { useState } from "react";
import useSnackbar from "../../hooks/useSnackbar";
import CustomSnackbar from "../../components/CustomSnackbar";
import SchoolIcon from "@mui/icons-material/School";

const BackgroundContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 50%, #C4B5FD 100%)",
  padding: theme.spacing(2),
}));

const Card = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(5),
  gap: theme.spacing(3),
  margin: "auto",
  borderRadius: 18,
  background: "rgba(255,255,255,0.97)",
  boxShadow:
    "0 8px 32px 0 rgba(0,153,255,0.18), 0 1.5px 4px 0 rgba(0,153,255,0.08)",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "420px",
  },
  position: "relative",
}));

// props kullanılmıyor, kaldırıldı
export default function LogIn() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { open: snackbarOpen, message, severity, showSnackbar, hideSnackbar } = useSnackbar();

  // useEffect kaldırıldı - direkt giriş için gerek yok

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateInputs = async () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    // Basit validasyon - boş kontrolü
    if (!email.value) {
      setEmailError(true);
      setEmailErrorMessage("E-posta zorunludur.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value) {
      setPasswordError(true);
      setPasswordErrorMessage("Şifre zorunludur.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (isValid) {
      setLoading(true);

      // API bağlantısı kapalı - direkt giriş
      showSnackbar("Giriş başarılı! Yönlendiriliyorsunuz...", "success");

      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard/reservation");
      }, 500);
    }
  };

  return (
    <BackgroundContainer>
      <div className="absolute top-5 right-5 z-[99]">
        <ChangeThemes />
      </div>
      <Card elevation={6}>
        <div className="flex flex-col items-center gap-2 mb-2">
          <Box sx={{
            background: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
            borderRadius: "50%",
            p: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(124, 58, 237, 0.3)"
          }}>
            <SchoolIcon sx={{ fontSize: 48, color: "#FFFFFF" }} />
          </Box>
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontWeight: 700, color: "#7C3AED", letterSpacing: 1, mt: 2 }}
          >
            Asel Öğretmen Giriş
          </Typography>
          <Typography variant="body2" sx={{ color: "#6D28D9", mb: 1 }}>
            Lütfen hesabınıza giriş yapın
          </Typography>
        </div>
        {/* Login type selector kaldırıldı */}
        <form
          onSubmit={e => {
            e.preventDefault();
            validateInputs();
          }}
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          <FormControl>
            <FormLabel htmlFor="email" sx={{ color: "#7C3AED", fontWeight: 600 }}>E-posta</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              // type="email"
              name="email"
              placeholder="ornek@mail.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? "error" : "primary"}
              sx={{
                borderRadius: 2,
                background: "#FAF5FF",
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#7C3AED',
                    boxShadow: '0 0 0 2px rgba(124, 58, 237, 0.1)',
                  },
                },
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password" sx={{ color: "#7C3AED", fontWeight: 600 }}>Şifre</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
              sx={{
                borderRadius: 2,
                background: "#FAF5FF",
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#7C3AED',
                    boxShadow: '0 0 0 2px rgba(124, 58, 237, 0.1)',
                  },
                },
              }}
            />
          </FormControl>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
            <FormControlLabel
              control={<Checkbox value="remember" sx={{
                color: "#7C3AED",
                '&.Mui-checked': { color: "#7C3AED" }
              }} />}
              label="Beni Hatırla"
              sx={{ ml: -1 }}
            />
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ fontSize: 14, color: "#7C3AED", fontWeight: 600 }}
            >
              Şifremi Unuttum?
            </Link>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              fontWeight: 700,
              borderRadius: 2,
              background: "#7C3AED",
              color: "#fff",
              boxShadow: "0 2px 8px rgba(124, 58, 237, 0.2)",
              mt: 1,
              mb: 1,
              textTransform: "none",
              '&:hover': {
                background: "#6D28D9",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 12px rgba(124, 58, 237, 0.3)",
              },
              transition: "all 0.3s ease",
            }}
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </Button>
        </form>
        <Divider sx={{ my: 2, borderColor: "rgba(124, 58, 237, 0.1)" }} />
        {/* <Box display="flex" flexDirection="column" gap={1}>
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            fullWidth
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
            disabled
          >
            Google ile Giriş Yap (Yakında)
          </Button>
          <Button
            variant="outlined"
            startIcon={<FacebookIcon />}
            fullWidth
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
            disabled
          >
            Facebook ile Giriş Yap (Yakında)
          </Button>
        </Box> */}
        <ForgotPassword open={open} handleClose={handleClose} />
      </Card>
      <CustomSnackbar
        open={snackbarOpen}
        message={message}
        severity={severity}
        onClose={hideSnackbar}
      />
    </BackgroundContainer>
  );
}
