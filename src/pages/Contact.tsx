import React, { useState } from "react";
import {
    Typography,
    TextField,
    Button,
    Box,
    MenuItem,
    Paper,
    Grid,
    FormControl,
    FormLabel,
    Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import MessageIcon from "@mui/icons-material/Message";
import useSnackbar from "../hooks/useSnackbar";
import CustomSnackbar from "../components/CustomSnackbar";

const BackgroundContainer = styled(Box)({
    minHeight: "100vh",
    background: "linear-gradient(135deg, #FAF5FF 0%, #F5F3FF 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
});

const FormCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: theme.spacing(3),
    boxShadow: "0 8px 32px rgba(124, 58, 237, 0.15)",
    background: "#fff",
    border: "1px solid #E9D5FF",
    maxWidth: 800,
    width: "100%",
}));

const specialtyAreas = [
    "Otizm Spektrum Bozukluğu",
    "Disleksi",
    "Davranış Bozukluğu",
    "Floortime Eğitimi",
    "Akıcı Okuma",
    "Readkid Akıcı Okuma Programı",
    "O-HAP Okula Hazırlık Programı",
    "Eteçom Ebeveynin Etkileşim Temelli Çocuklukta Erken Müdahale Programı",
    "Moxo ADHL (Dikkat Testi)",
    "Cogent Erken Çocuklukta Bilişsel Müdahale Programı",
    "Türkçe Prep Programı",
    "DEHB",
    "Diğer",
];

export default function Contact() {
    const navigate = useNavigate();
    const { open, message, severity, showSnackbar, hideSnackbar } = useSnackbar();

    const [formData, setFormData] = useState({
        parentName: "",
        parentSurname: "",
        phone: "",
        email: "",
        childAge: "",
        specialtyArea: "",
        notes: "",
    });

    const [errors, setErrors] = useState<any>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev: any) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors: any = {};

        if (!formData.parentName.trim()) {
            newErrors.parentName = "Ad zorunludur";
        }
        if (!formData.parentSurname.trim()) {
            newErrors.parentSurname = "Soyad zorunludur";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Telefon numarası zorunludur";
        } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
            newErrors.phone = "Geçerli bir telefon numarası giriniz";
        }
        if (!formData.email.trim()) {
            newErrors.email = "E-posta zorunludur";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Geçerli bir e-posta adresi giriniz";
        }
        if (!formData.childAge) {
            newErrors.childAge = "Çocuğun yaşı zorunludur";
        }
        if (!formData.specialtyArea) {
            newErrors.specialtyArea = "İlgili alan seçiniz";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            showSnackbar("Lütfen tüm zorunlu alanları doldurun", "error");
            return;
        }

        try {
            // Burada API çağrısı yapılacak
            // Şimdilik localStorage'a kaydet
            const consultations = JSON.parse(localStorage.getItem("consultations") || "[]");
            const newConsultation = {
                id: Date.now(),
                ...formData,
                createdAt: new Date().toISOString(),
                status: "pending",
            };
            consultations.push(newConsultation);
            localStorage.setItem("consultations", JSON.stringify(consultations));

            showSnackbar(
                "Ön görüşme talebiniz alınmıştır! En kısa sürede sizinle iletişime geçeceğiz.",
                "success"
            );

            // Form temizle
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            showSnackbar("Bir hata oluştu. Lütfen tekrar deneyin.", "error");
        }
    };

    return (
        <BackgroundContainer>
            <FormCard>
                <Box sx={{ textAlign: "center", mb: 4 }}>
                    <CalendarMonthIcon sx={{ fontSize: 60, color: "#7C3AED", mb: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "#7C3AED", mb: 1 }}>
                        Ön Görüşme Randevusu
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#6D28D9" }}>
                        Çocuğunuzun ihtiyaçlarını değerlendirmek için  ön görüşme talebinde bulunun
                    </Typography>
                </Box>

                <Alert severity="info" sx={{ mb: 3 }}>
                    Formu doldurduktan sonra en kısa sürede sizinle iletişime geçeceğiz.
                </Alert>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Veli Adı */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth error={!!errors.parentName}>
                                <FormLabel sx={{ color: "#7C3AED", fontWeight: 600, mb: 1 }}>
                                    <PersonIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} />
                                    Veli Adı *
                                </FormLabel>
                                <TextField
                                    name="parentName"
                                    value={formData.parentName}
                                    onChange={handleChange}
                                    placeholder="Adınız"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.parentName}
                                    helperText={errors.parentName}
                                />
                            </FormControl>
                        </Grid>

                        {/* Veli Soyadı */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth error={!!errors.parentSurname}>
                                <FormLabel sx={{ color: "#7C3AED", fontWeight: 600, mb: 1 }}>
                                    <PersonIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} />
                                    Veli Soyadı *
                                </FormLabel>
                                <TextField
                                    name="parentSurname"
                                    value={formData.parentSurname}
                                    onChange={handleChange}
                                    placeholder="Soyadınız"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.parentSurname}
                                    helperText={errors.parentSurname}
                                />
                            </FormControl>
                        </Grid>

                        {/* Telefon */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth error={!!errors.phone}>
                                <FormLabel sx={{ color: "#7C3AED", fontWeight: 600, mb: 1 }}>
                                    <PhoneIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} />
                                    Telefon *
                                </FormLabel>
                                <TextField
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="05XX XXX XX XX"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                />
                            </FormControl>
                        </Grid>

                        {/* E-posta */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth error={!!errors.email}>
                                <FormLabel sx={{ color: "#7C3AED", fontWeight: 600, mb: 1 }}>
                                    <EmailIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} />
                                    E-posta *
                                </FormLabel>
                                <TextField
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="ornek@mail.com"
                                    variant="outlined"
                                    type="email"
                                    fullWidth
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                            </FormControl>
                        </Grid>

                        {/* Çocuğun Yaşı */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth error={!!errors.childAge}>
                                <FormLabel sx={{ color: "#7C3AED", fontWeight: 600, mb: 1 }}>
                                    <ChildCareIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} />
                                    Çocuğunuzun Yaşı *
                                </FormLabel>
                                <TextField
                                    name="childAge"
                                    value={formData.childAge}
                                    onChange={handleChange}
                                    placeholder="Yaş"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    error={!!errors.childAge}
                                    helperText={errors.childAge}
                                    inputProps={{ min: 0, max: 18 }}
                                />
                            </FormControl>
                        </Grid>

                        {/* İlgili Alan */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth error={!!errors.specialtyArea}>
                                <FormLabel sx={{ color: "#7C3AED", fontWeight: 600, mb: 1 }}>
                                    İlgili Alan *
                                </FormLabel>
                                <TextField
                                    name="specialtyArea"
                                    value={formData.specialtyArea}
                                    onChange={handleChange}
                                    select
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.specialtyArea}
                                    helperText={errors.specialtyArea}
                                >
                                    <MenuItem value="">Seçiniz</MenuItem>
                                    {specialtyAreas.map((area) => (
                                        <MenuItem key={area} value={area}>
                                            {area}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        </Grid>

                        {/* Notlar */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ color: "#7C3AED", fontWeight: 600, mb: 1 }}>
                                    <MessageIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} />
                                    Ek Notlar / Mesajınız
                                </FormLabel>
                                <TextField
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    placeholder="Çocuğunuzun durumu hakkında bilgi vermek isterseniz buraya yazabilirsiniz..."
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    fullWidth
                                />
                            </FormControl>
                        </Grid>

                        {/* Butonlar */}
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}>
                                <Button
                                    type="button"
                                    variant="outlined"
                                    size="large"
                                    onClick={() => navigate("/")}
                                    sx={{
                                        px: 4,
                                        borderColor: "#7C3AED",
                                        color: "#7C3AED",
                                        "&:hover": { borderColor: "#6D28D9", color: "#6D28D9", bgcolor: "#F5F3FF" },
                                    }}
                                >
                                    İptal
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        px: 6,
                                        bgcolor: "#7C3AED",
                                        "&:hover": { bgcolor: "#6D28D9", transform: "translateY(-2px)", boxShadow: "0 6px 20px rgba(124, 58, 237, 0.3)" },
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    Randevu Talebi Gönder
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </FormCard>

            <CustomSnackbar
                open={open}
                message={message}
                severity={severity}
                onClose={hideSnackbar}
            />
        </BackgroundContainer>
    );
}
