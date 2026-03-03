import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Button,
  Alert,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/tr";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import NotesIcon from "@mui/icons-material/Notes";

dayjs.locale("tr");

interface Appointment {
  id: string;
  date: string;
  time: string;
  parentName: string;
  parentSurname: string;
  phone: string;
  email: string;
  childAge: string;
  notes: string;
  status: "pending" | "approved" | "rejected";
}

const CalendarContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #FAF5FF 0%, #F5F3FF 100%)",
  borderRadius: theme.spacing(3),
  boxShadow: "0 4px 24px rgba(124, 58, 237, 0.15)",
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const DayCell = styled(Paper)(({ theme, selected }: { theme?: any; selected?: boolean }) => ({
  minHeight: 100,
  padding: theme.spacing(1),
  background: selected ? "#F3E8FF" : "#fff",
  border: selected ? "2px solid #7C3AED" : "1px solid #E9D5FF",
  cursor: "pointer",
  transition: "all 0.3s",
  "&:hover": {
    border: "2px solid #7C3AED",
    background: "#F3E8FF",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(124, 58, 237, 0.2)",
  },
}));

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Takvim için
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
  const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null);

  // localStorage'dan randevuları yükle
  const loadAppointments = () => {
    const stored = localStorage.getItem("appointments");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAppointments(parsed);
      } catch (e) {
        console.error("Randevular yüklenemedi:", e);
        setAppointments([]);
      }
    } else {
      setAppointments([]);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // localStorage'a kaydet
  const saveAppointments = (updatedAppointments: Appointment[]) => {
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
  };

  // Bekleyen randevular
  const pendingAppointments = appointments.filter((a) => a.status === "pending");

  // Onaylı randevular
  const approvedAppointments = appointments.filter((a) => a.status === "approved");

  // Takvim günleri
  function getMonthDays(year: number, month: number) {
    const firstDay = dayjs().year(year).month(month).startOf("month");
    const lastDay = dayjs().year(year).month(month).endOf("month");
    const days = [];
    for (let d = 0; d < lastDay.date(); d++) {
      days.push(firstDay.add(d, "day"));
    }
    return days;
  }
  const days = getMonthDays(currentMonth.year(), currentMonth.month());

  // Takvim başı boşlukları için (Pazartesi = 0)
  const firstDayOfWeek = days[0].day() === 0 ? 6 : days[0].day() - 1;
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

  // Seçili günün onaylı randevuları
  const selectedDayAppointments = selectedDay
    ? approvedAppointments.filter((a) =>
        dayjs(a.date).isSame(selectedDay, "day")
      )
    : [];

  // Onayla
  const handleApprove = (id: string) => {
    setSuccess(null);
    setError(null);
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status: "approved" as const } : a
    );
    saveAppointments(updated);
    setSuccess("Randevu onaylandı!");
  };

  // Reddet
  const handleReject = (id: string) => {
    setSuccess(null);
    setError(null);
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status: "rejected" as const } : a
    );
    saveAppointments(updated);
    setSuccess("Randevu reddedildi.");
  };

  // Onaylı randevuyu iptal et
  const handleCancel = (id: string) => {
    setSuccess(null);
    setError(null);
    const updated = appointments.filter((a) => a.id !== id);
    saveAppointments(updated);
    setSuccess("Randevu iptal edildi.");
  };

  // Detay göster
  const handleShowDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setDialogOpen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          background: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 2,
          textAlign: "center",
        }}
      >
        Randevu Yönetimi
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ color: "#6B7280", textAlign: "center", mb: 4 }}
      >
        Gelen randevu taleplerini inceleyin ve yönetin
      </Typography>

      {/* Takvim */}
      <CalendarContainer>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Button
            onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
            variant="outlined"
            sx={{
              color: "#7C3AED",
              borderColor: "#7C3AED",
              "&:hover": {
                borderColor: "#6D28D9",
                background: "rgba(124, 58, 237, 0.05)",
              },
            }}
          >
            Önceki
          </Button>
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarMonthIcon sx={{ color: "#7C3AED" }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#6D28D9" }}>
              {dayjs(currentMonth)
                .format("MMMM YYYY")
                .replace(/^\w/, (c) => c.toLocaleUpperCase("tr-TR"))}
            </Typography>
          </Box>
          <Button
            onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
            variant="outlined"
            sx={{
              color: "#7C3AED",
              borderColor: "#7C3AED",
              "&:hover": {
                borderColor: "#6D28D9",
                background: "rgba(124, 58, 237, 0.05)",
              },
            }}
          >
            Sonraki
          </Button>
        </Box>
        <Grid container spacing={1} sx={{ mb: 2 }}>
          {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((d) => (
            <Grid item xs={12/7} key={d}>
              <Typography
                sx={{ color: "#7C3AED", fontWeight: 700, textAlign: "center" }}
              >
                {d}
              </Typography>
            </Grid>
          ))}
        </Grid>
        {calendarRows.map((row, i) => (
          <Grid container spacing={1} key={i} sx={{ mb: 1 }}>
            {row.map((day: Dayjs | null, j: number) =>
              day ? (
                <Grid item xs={12/7} key={j}>
                  <DayCell
                    sx={{
                      border:
                        selectedDay && day.isSame(selectedDay, "day")
                          ? "2px solid #7C3AED"
                          : "1px solid #E9D5FF",
                      background:
                        selectedDay && day.isSame(selectedDay, "day")
                          ? "#F3E8FF"
                          : "#fff",
                    }}
                    onClick={() => setSelectedDay(day)}
                    elevation={
                      selectedDay && day.isSame(selectedDay, "day") ? 6 : 1
                    }
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#6D28D9",
                        textAlign: "center",
                      }}
                    >
                      {day.date()}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#7C3AED",
                        textAlign: "center",
                      }}
                    >
                      {
                        approvedAppointments.filter((a) =>
                          dayjs(a.date).isSame(day, "day")
                        ).length
                      }{" "}
                      randevu
                    </Typography>
                  </DayCell>
                </Grid>
              ) : (
                <Grid item xs={12/7} key={j}></Grid>
              )
            )}
          </Grid>
        ))}
        {/* Seçili günün randevuları */}
        {selectedDay && (
          <Box mt={3}>
            <Typography
              variant="subtitle1"
              sx={{ color: "#7C3AED", fontWeight: 700 }}
            >
              {selectedDay.format("DD MMMM YYYY")} - Onaylı Randevular
            </Typography>
            {selectedDayAppointments.length === 0 ? (
              <Typography sx={{ color: "#888", mt: 1 }}>
                Bu gün için onaylı randevu yok.
              </Typography>
            ) : (
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {selectedDayAppointments.map((a) => (
                  <Grid item xs={12} key={a.id}>
                    <Paper
                      elevation={2}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { sm: "center" },
                        gap: 2,
                        borderLeft: "5px solid #7C3AED",
                        background: "#FAF5FF",
                      }}
                    >
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                          <PersonIcon sx={{ color: "#7C3AED" }} />
                          <Typography fontWeight={700} sx={{ color: "#6D28D9" }}>
                            {a.parentName} {a.parentSurname}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                          <EmailIcon sx={{ color: "#7C3AED" }} fontSize="small" />
                          <Typography sx={{ color: "#444", fontSize: 15 }}>
                            {a.email}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                          <PhoneIcon sx={{ color: "#7C3AED" }} fontSize="small" />
                          <Typography sx={{ color: "#444", fontSize: 15 }}>
                            {a.phone}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={2} mt={1}>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <AccessTimeIcon
                              sx={{ color: "#6D28D9" }}
                              fontSize="small"
                            />
                            <Typography sx={{ color: "#6D28D9", fontWeight: 600 }}>
                              {a.time}
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <ChildCareIcon
                              sx={{ color: "#6D28D9" }}
                              fontSize="small"
                            />
                            <Typography sx={{ color: "#6D28D9", fontWeight: 600 }}>
                              {a.childAge} yaş
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          minWidth: 120,
                        }}
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            color: "#7C3AED",
                            borderColor: "#7C3AED",
                            "&:hover": {
                              borderColor: "#6D28D9",
                              background: "rgba(124, 58, 237, 0.05)",
                            },
                          }}
                          onClick={() => handleShowDetails(a)}
                        >
                          Detay
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<CancelIcon />}
                          size="small"
                          sx={{
                            bgcolor: "#DC2626",
                            "&:hover": { bgcolor: "#B91C1C" },
                          }}
                          onClick={() => handleCancel(a.id)}
                        >
                          İptal
                        </Button>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}
      </CalendarContainer>

      {/* Bekleyen randevu teklifleri */}
      <Box mt={6} mb={4}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Typography
            variant="h5"
            sx={{ color: "#6D28D9", fontWeight: 700 }}
          >
            Bekleyen Randevu Talepleri
          </Typography>
          <Chip
            label={`${pendingAppointments.length} Talep`}
            sx={{
              background: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
              color: "#fff",
              fontWeight: 700,
            }}
          />
        </Box>
        {pendingAppointments.length === 0 ? (
          <Alert
            severity="info"
            sx={{
              borderRadius: 2,
              background: "#F3E8FF",
              color: "#6D28D9",
              "& .MuiAlert-icon": { color: "#7C3AED" },
            }}
          >
            Bekleyen randevu talebi yok.
          </Alert>
        ) : (
          <Grid container spacing={2}>
            {pendingAppointments.map((a) => (
              <Grid item xs={12} key={a.id}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { sm: "center" },
                    justifyContent: "space-between",
                    gap: 2,
                    borderLeft: "6px solid #7C3AED",
                    background: "#FAF5FF",
                    transition: "all 0.3s",
                    "&:hover": {
                      boxShadow: "0 8px 24px rgba(124, 58, 237, 0.2)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <PersonIcon sx={{ color: "#7C3AED" }} />
                      <Typography fontWeight={700} sx={{ color: "#6D28D9" }}>
                        {a.parentName} {a.parentSurname}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                      <EmailIcon sx={{ color: "#A78BFA" }} fontSize="small" />
                      <Typography sx={{ color: "#444", fontSize: 15 }}>
                        {a.email}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                      <PhoneIcon sx={{ color: "#A78BFA" }} fontSize="small" />
                      <Typography sx={{ color: "#444", fontSize: 15 }}>
                        {a.phone}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      flexWrap="wrap"
                      gap={2}
                      mt={1}
                    >
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <EventIcon sx={{ color: "#6D28D9" }} fontSize="small" />
                        <Typography sx={{ color: "#6D28D9", fontWeight: 600 }}>
                          {dayjs(a.date).format("DD.MM.YYYY")}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <AccessTimeIcon
                          sx={{ color: "#6D28D9" }}
                          fontSize="small"
                        />
                        <Typography sx={{ color: "#6D28D9", fontWeight: 600 }}>
                          {a.time}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <ChildCareIcon
                          sx={{ color: "#6D28D9" }}
                          fontSize="small"
                        />
                        <Typography sx={{ color: "#6D28D9", fontWeight: 600 }}>
                          {a.childAge} yaş
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "row", sm: "column" },
                      gap: 1,
                      minWidth: { xs: "100%", sm: 160 },
                    }}
                  >
                    <Button
                      variant="outlined"
                      fullWidth
                      size="small"
                      sx={{
                        color: "#7C3AED",
                        borderColor: "#7C3AED",
                        "&:hover": {
                          borderColor: "#6D28D9",
                          background: "rgba(124, 58, 237, 0.05)",
                        },
                      }}
                      onClick={() => handleShowDetails(a)}
                    >
                      Detay
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CheckCircleIcon />}
                      fullWidth
                      sx={{
                        bgcolor: "#10B981",
                        fontWeight: 700,
                        "&:hover": { bgcolor: "#059669" },
                      }}
                      onClick={() => handleApprove(a.id)}
                    >
                      Onayla
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<CancelIcon />}
                      fullWidth
                      sx={{
                        bgcolor: "#DC2626",
                        fontWeight: 700,
                        "&:hover": { bgcolor: "#B91C1C" },
                      }}
                      onClick={() => handleReject(a.id)}
                    >
                      Reddet
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
        {success && (
          <Alert
            severity="success"
            sx={{ mt: 2, borderRadius: 2 }}
            onClose={() => setSuccess(null)}
          >
            {success}
          </Alert>
        )}
        {error && (
          <Alert
            severity="error"
            sx={{ mt: 2, borderRadius: 2 }}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}
      </Box>

      {/* Detay Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: "linear-gradient(135deg, #FAF5FF 0%, #F5F3FF 100%)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          Randevu Detayları
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {selectedAppointment && (
            <Box>
              <Box mb={2}>
                <Typography
                  variant="caption"
                  sx={{ color: "#6B7280", fontWeight: 600 }}
                >
                  VELİ BİLGİLERİ
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <PersonIcon sx={{ color: "#7C3AED" }} />
                  <Typography>
                    {selectedAppointment.parentName}{" "}
                    {selectedAppointment.parentSurname}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <EmailIcon sx={{ color: "#7C3AED" }} />
                  <Typography>{selectedAppointment.email}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <PhoneIcon sx={{ color: "#7C3AED" }} />
                  <Typography>{selectedAppointment.phone}</Typography>
                </Box>
              </Box>

              <Box mb={2}>
                <Typography
                  variant="caption"
                  sx={{ color: "#6B7280", fontWeight: 600 }}
                >
                  RANDEVU BİLGİLERİ
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <EventIcon sx={{ color: "#7C3AED" }} />
                  <Typography>
                    {dayjs(selectedAppointment.date).format("DD MMMM YYYY")}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <AccessTimeIcon sx={{ color: "#7C3AED" }} />
                  <Typography>{selectedAppointment.time}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <ChildCareIcon sx={{ color: "#7C3AED" }} />
                  <Typography>Çocuk Yaşı: {selectedAppointment.childAge}</Typography>
                </Box>
              </Box>

              {selectedAppointment.notes && (
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "#6B7280", fontWeight: 600 }}
                  >
                    NOTLAR
                  </Typography>
                  <Box display="flex" gap={1} mt={1}>
                    <NotesIcon sx={{ color: "#7C3AED" }} />
                    <Typography sx={{ color: "#374151" }}>
                      {selectedAppointment.notes}
                    </Typography>
                  </Box>
                </Box>
              )}

              <Box mt={2}>
                <Chip
                  label={
                    selectedAppointment.status === "pending"
                      ? "Bekliyor"
                      : selectedAppointment.status === "approved"
                      ? "Onaylandı"
                      : "Reddedildi"
                  }
                  sx={{
                    background:
                      selectedAppointment.status === "pending"
                        ? "linear-gradient(135deg, #F59E0B 0%, #FDE68A 100%)"
                        : selectedAppointment.status === "approved"
                        ? "linear-gradient(135deg, #10B981 0%, #6EE7B7 100%)"
                        : "linear-gradient(135deg, #DC2626 0%, #FCA5A5 100%)",
                    color: "#fff",
                    fontWeight: 700,
                  }}
                />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setDialogOpen(false)}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
              color: "#fff",
              "&:hover": {
                background: "linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)",
              },
            }}
          >
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
