import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Container,
    Paper,
    Grid,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    TextField,
    FormControl,
    FormLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/tr';

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ChildCareIcon from "@mui/icons-material/ChildCare";

const CalendarContainer = styled(Box)(({ theme }) => ({
    background: "linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 100%)",
    borderRadius: theme.spacing(3),
    boxShadow: "0 4px 20px rgba(124, 58, 237, 0.15)",
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    border: "1px solid #E9D5FF",
}));

const DayCell = styled(Paper)(({ theme, selected }: { theme?: any; selected?: boolean }) => ({
    minHeight: 100,
    padding: theme.spacing(1.5),
    background: selected ? "#F5F3FF" : "#FFFFFF",
    border: selected ? "2px solid #7C3AED" : "1px solid #E9D5FF",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
        border: "2px solid #7C3AED",
        background: "#F5F3FF",
        transform: "translateY(-2px)",
        boxShadow: "0 4px 15px rgba(124, 58, 237, 0.2)",
    },
}));

const TimeSlotButton = styled(Button)(({ theme, available }: { theme?: any; available?: boolean }) => ({
    margin: theme.spacing(0.5),
    background: available ? "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)" : "#E5E7EB",
    color: available ? "#FFFFFF" : "#9CA3AF",
    fontWeight: 700,
    borderRadius: 12,
    minWidth: 100,
    padding: "10px 16px",
    boxShadow: available ? "0 2px 10px rgba(124, 58, 237, 0.3)" : "none",
    "&:hover": {
        background: available ? "linear-gradient(135deg, #6D28D9 0%, #9333EA 100%)" : "#E5E7EB",
        transform: available ? "translateY(-2px)" : "none",
        boxShadow: available ? "0 4px 15px rgba(124, 58, 237, 0.4)" : "none",
    },
    transition: "all 0.3s ease",
}));

// 09:00 - 18:00 arası, 1 saat arayla slot üret
const generateSlots = () => {
    const slots = [];
    let start = dayjs().hour(9).minute(0).second(0);
    const end = dayjs().hour(18).minute(0).second(0);
    while (start.isBefore(end) || start.isSame(end)) {
        slots.push(start.format("HH:mm"));
        start = start.add(1, "hour");
    }
    return slots;
};
const timeSlots = generateSlots(); // ["09:00", "10:00", "11:00", ..., "18:00"]

function getMonthDays(year: number, month: number) {
    const firstDay = dayjs().year(year).month(month).startOf("month");
    const lastDay = dayjs().year(year).month(month).endOf("month");
    const days = [];
    for (let d = 0; d < lastDay.date(); d++) {
        days.push(firstDay.add(d, "day"));
    }
    return days;
}

interface AppointmentForm {
    parentName: string;
    parentSurname: string;
    phone: string;
    email: string;
    childAge: string;
    notes: string;
}

export default function Appointment() {
    const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
    const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});

    const [formData, setFormData] = useState<AppointmentForm>({
        parentName: "",
        parentSurname: "",
        phone: "",
        email: "",
        childAge: "",
        notes: "",
    });

    const days = getMonthDays(currentMonth.year(), currentMonth.month());

    const handlePrevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));
    const handleNextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

    const handleDayClick = (day: Dayjs) => {
        setSelectedDay(day);
        setSelectedSlot(null);
        setSuccess(null);
    };

    const handleSlotClick = (slot: string, available: boolean) => {
        if (!available) return;
        setSelectedSlot(slot);
        setDialogOpen(true);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSendRequest = async () => {
        // Form validation
        if (!formData.parentName || !formData.parentSurname || !formData.phone || !formData.email || !formData.childAge) {
            setSuccess("Lütfen tüm zorunlu alanları doldurun.");
            return;
        }

        setDialogOpen(false);

        if (!selectedDay || !selectedSlot) {
            setSuccess("Lütfen tarih ve saat seçin.");
            return;
        }

        try {
            // localStorage'a kaydet
            const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
            const newAppointment = {
                id: Date.now(),
                ...formData,
                date: selectedDay.format("YYYY-MM-DD"),
                time: selectedSlot,
                createdAt: new Date().toISOString(),
                status: "pending",
            };
            appointments.push(newAppointment);
            localStorage.setItem("appointments", JSON.stringify(appointments));

            // bookedSlots'u güncelle
            const dayStr = selectedDay.format("YYYY-MM-DD");
            setBookedSlots(prev => ({
                ...prev,
                [dayStr]: [...(prev[dayStr] || []), selectedSlot],
            }));

            setSuccess("Randevu talebiniz alınmıştır! En kısa sürede sizinle iletişime geçeceğiz.");

            // Formu temizle
            setFormData({
                parentName: "",
                parentSurname: "",
                phone: "",
                email: "",
                childAge: "",
                notes: "",
            });
            setSelectedSlot(null);
        } catch (err) {
            setSuccess("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
    };

    // localStorage'dan randevuları yükle
    useEffect(() => {
        const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
        const slots: Record<string, string[]> = {};
        appointments.forEach((apt: any) => {
            if (!slots[apt.date]) slots[apt.date] = [];
            slots[apt.date].push(apt.time);
        });
        setBookedSlots(slots);
    }, []);

    // Takvim başı boşlukları için
    const firstDayOfWeek = days[0].day() === 0 ? 6 : days[0].day() - 1; // Pazartesi başlasın
    const calendarRows: (Dayjs | null)[][] = [];
    let week: any[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) week.push(null);
    days.forEach((day, idx) => {
        week.push(day);
        if (week.length === 7 || idx === days.length - 1) {
            calendarRows.push(week);
            week = [];
        }
    });

    useEffect(() => {
        dayjs.locale('tr');
    }, []);

    const now = dayjs();
    const maxDate = now.add(1, "month").endOf("day");

    return (
        <Box sx={{ background: "linear-gradient(135deg, #FAF5FF 0%, #FFFFFF 100%)", minHeight: "100vh", py: 8 }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: "center", mb: 6 }}>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: "#7C3AED", mb: 2 }}>
                        📅 Randevu Sistemi
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#6B7280", mb: 4 }}>
                        Özel eğitim danışmanlığı için uygun tarih ve saati seçin
                    </Typography>
                    <Alert
                        severity="info"
                        sx={{
                            maxWidth: 800,
                            mx: "auto",
                            fontWeight: 500,
                            background: "linear-gradient(135deg, #DBEAFE 0%, #E0E7FF 100%)",
                            border: "1px solid #A78BFA",
                            color: "#6D28D9",
                        }}
                    >
                        ℹ️ Her saat diliminde maksimum 2 randevu alınabilir. Lütfen uygun saati seçin.
                    </Alert>
                </Box>

                <CalendarContainer>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                        <Button
                            onClick={handlePrevMonth}
                            variant="outlined"
                            sx={{
                                color: "#7C3AED",
                                borderColor: "#7C3AED",
                                "&:hover": {
                                    borderColor: "#6D28D9",
                                    bgcolor: "#F5F3FF"
                                }
                            }}
                        >
                            ‹ Önceki
                        </Button>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#7C3AED" }}>
                            {dayjs(currentMonth).locale('tr').format("MMMM YYYY").replace(/^\w/, c => c.toLocaleUpperCase("tr-TR"))}
                        </Typography>
                        <Button
                            onClick={handleNextMonth}
                            variant="outlined"
                            sx={{
                                color: "#7C3AED",
                                borderColor: "#7C3AED",
                                "&:hover": {
                                    borderColor: "#6D28D9",
                                    bgcolor: "#F5F3FF"
                                }
                            }}
                        >
                            Sonraki ›
                        </Button>
                    </Box>

                    <Grid container spacing={1} sx={{ mb: 2 }}>
                        {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((d) => (
                            <Grid item xs={12 / 7} key={d}>
                                <Typography sx={{ color: "#7C3AED", fontWeight: 700, textAlign: "center", py: 1 }}>
                                    {d}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>

                    {calendarRows.map((row, i) => (
                        <Grid container spacing={1} key={i} sx={{ mb: 1 }}>
                            {row.map((day: Dayjs | null, j: number) => {
                                if (!day) return <Grid item xs={12 / 7} key={j}></Grid>;
                                const dayStr = day.format("YYYY-MM-DD");
                                const isPast = day.isBefore(now, "day");
                                const isAfterMax = day.isAfter(maxDate, "day");
                                const isDisabled = isPast || isAfterMax;
                                const bookedCount = bookedSlots[dayStr]?.length || 0;

                                return (
                                    <Grid item xs={12 / 7} key={j}>
                                        <DayCell
                                            sx={{
                                                border: selectedDay && day.isSame(selectedDay, "day") ? "2px solid #7C3AED" : "1px solid #E9D5FF",
                                                backgroundColor: selectedDay && day.isSame(selectedDay, "day") ? "#F5F3FF" : "#FFFFFF",
                                            }}
                                            onClick={() => !isDisabled && handleDayClick(day)}
                                            elevation={selectedDay && day.isSame(selectedDay, "day") ? 4 : 1}
                                            style={isDisabled ? { opacity: 0.4, pointerEvents: "none" } : {}}
                                        >
                                            <Typography sx={{ fontWeight: 700, color: "#7C3AED", textAlign: "center", fontSize: 18 }}>
                                                {day.date()}
                                            </Typography>
                                            {bookedCount > 0 && (
                                                <Box sx={{ mt: 1, textAlign: "center" }}>
                                                    <Typography sx={{ fontSize: 12, color: "#A78BFA", fontWeight: 600 }}>
                                                        {bookedCount} randevu
                                                    </Typography>
                                                </Box>
                                            )}
                                        </DayCell>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    ))}

                    {selectedDay && (
                        <Box mt={5}>
                            <Typography variant="h5" sx={{ color: "#7C3AED", fontWeight: 700, mb: 3, textAlign: "center" }}>
                                📍 {selectedDay.format("DD MMMM YYYY")} - Uygun Saatler
                            </Typography>
                            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
                                {timeSlots.map((slot) => {
                                    const dayStr = selectedDay.format("YYYY-MM-DD");
                                    const booked = bookedSlots[dayStr]?.filter(s => s === slot).length || 0;
                                    const available = booked < 2;

                                    let slotDisabled = !available;
                                    if (selectedDay.isSame(now, "day")) {
                                        const slotTime = dayjs(`${dayStr} ${slot}`);
                                        if (slotTime.isBefore(now)) slotDisabled = true;
                                    }

                                    return (
                                        <TimeSlotButton
                                            key={slot}
                                            sx={{
                                                backgroundColor: !slotDisabled ? "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)" : "#E5E7EB",
                                                color: !slotDisabled ? "#FFFFFF" : "#9CA3AF"
                                            }}
                                            startIcon={!slotDisabled ? <CheckCircleIcon /> : undefined}
                                            onClick={() => handleSlotClick(slot, !slotDisabled)}
                                            disabled={slotDisabled}
                                        >
                                            {slot}
                                            {booked > 0 && available && (
                                                <span style={{ marginLeft: 6, fontSize: 12 }}>
                                                    ({booked}/2)
                                                </span>
                                            )}
                                        </TimeSlotButton>
                                    );
                                })}
                            </Box>

                            {success && (
                                <Alert
                                    severity="success"
                                    sx={{
                                        mt: 4,
                                        background: "linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)",
                                        color: "#065F46",
                                        fontWeight: 600,
                                    }}
                                >
                                    ✅ {success}
                                </Alert>
                            )}
                        </Box>
                    )}
                </CalendarContainer>

                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ bgcolor: "#F5F3FF", color: "#7C3AED", fontWeight: 700 }}>
                        📝 Randevu Bilgileri
                    </DialogTitle>
                    <DialogContent sx={{ pt: 3 }}>
                        <Typography variant="body1" sx={{ mb: 3, color: "#6B7280" }}>
                            <strong>{selectedDay?.format("DD MMMM YYYY")} - {selectedSlot}</strong> için randevu talep ediyorsunuz.
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <FormLabel sx={{ color: "#7C3AED", fontWeight: 600, mb: 1 }}>
                                        <PersonIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} />
                                        Veli Adı *
                                    </FormLabel>
                                    <TextField
                                        name="parentName"
                                        value={formData.parentName}
                                        onChange={handleFormChange}
                                        placeholder="Adınız"
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <FormLabel sx={{ color: "#7C3AED", fontWeight: 600, mb: 1 }}>
                                        <PersonIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} />
                                        Veli Soyadı *
                                    </FormLabel>
                                    <TextField
                                        name="parentSurname"
                                        value={formData.parentSurname}
                                        onChange={handleFormChange}
                                        placeholder="Soyadınız"
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <FormLabel sx={{ color: "#7C3AED", fontWeight: 600, mb: 1 }}>
                                        <PhoneIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} />
                                        Telefon *
                                    </FormLabel>
                                    <TextField
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleFormChange}
                                        placeholder="05XX XXX XX XX"
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <FormLabel sx={{ color: "#7C3AED", fontWeight: 600, mb: 1 }}>
                                        <EmailIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} />
                                        E-posta *
                                    </FormLabel>
                                    <TextField
                                        name="email"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                        placeholder="ornek@mail.com"
                                        variant="outlined"
                                        type="email"
                                        fullWidth
                                        required
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <FormLabel sx={{ color: "#7C3AED", fontWeight: 600, mb: 1 }}>
                                        <ChildCareIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} />
                                        Çocuğunuzun Yaşı *
                                    </FormLabel>
                                    <TextField
                                        name="childAge"
                                        value={formData.childAge}
                                        onChange={handleFormChange}
                                        placeholder="Yaş"
                                        variant="outlined"
                                        type="number"
                                        fullWidth
                                        required
                                        inputProps={{ min: 0, max: 18 }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <FormLabel sx={{ color: "#7C3AED", fontWeight: 600, mb: 1 }}>
                                        Ek Notlar
                                    </FormLabel>
                                    <TextField
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleFormChange}
                                        placeholder="Özel bir notunuz varsa buraya yazabilirsiniz..."
                                        variant="outlined"
                                        multiline
                                        rows={3}
                                        fullWidth
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, bgcolor: "#F5F3FF" }}>
                        <Button
                            onClick={() => setDialogOpen(false)}
                            sx={{ color: "#6B7280" }}
                        >
                            Vazgeç
                        </Button>
                        <Button
                            onClick={handleSendRequest}
                            variant="contained"
                            sx={{
                                bgcolor: "#7C3AED",
                                color: "#FFFFFF",
                                px: 4,
                                "&:hover": {
                                    bgcolor: "#6D28D9",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 4px 15px rgba(124, 58, 237, 0.4)",
                                },
                                transition: "all 0.3s ease",
                            }}
                        >
                            Randevu Talep Et
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
}
