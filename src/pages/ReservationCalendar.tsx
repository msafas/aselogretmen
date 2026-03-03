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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/tr';

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { sendAppointmentRequest, fetchAllCompanyAppointmentsByMonth } from "../api/ApiCollection";

const CalendarContainer = styled(Box)(({ theme }) => ({
  background: "#fafdff",
  borderRadius: theme.spacing(3),
  boxShadow: "0 2px 16px 0 #0099ff22",
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const DayCell = styled(Paper)(({ theme, selected }: { theme?: any; selected?: boolean }) => ({
  minHeight: 120,
  padding: theme.spacing(1),
  background: selected ? "#e0f7fa" : "#fff",
  border: selected ? "2px solid #0099ff" : "1px solid #e0e0e0",
  cursor: "pointer",
  transition: "all 0.2s",
  "&:hover": {
    border: "2px solid #0099ff",
    background: "#e0f7fa",
  },
}));

const TimeSlotButton = styled(Button)(({ theme, available }: { theme?: any; available?: boolean }) => ({
  margin: theme.spacing(0.5),
  background: available ? "#0099ff" : "#e0e0e0",
  color: available ? "#fff" : "#888",
  fontWeight: 700,
  borderRadius: 8,
  minWidth: 90,
  "&:hover": {
    background: available ? "#01579b" : "#e0e0e0",
  },
}));

// 08:00 - 21:00 arası, 40 dakika arayla slot üret
const generateSlots = () => {
  const slots = [];
  let start = dayjs().hour(8).minute(0).second(0);
  const end = dayjs().hour(21).minute(0).second(0);
  while (start.isBefore(end)) {
    slots.push(start.format("HH:mm"));
    start = start.add(40, "minute");
  }
  return slots;
};
const timeSlots = generateSlots();

function getMonthDays(year: number, month: number) {
  const firstDay = dayjs().year(year).month(month).startOf("month");
  const lastDay = dayjs().year(year).month(month).endOf("month");
  const days = [];
  for (let d = 0; d < lastDay.date(); d++) {
    days.push(firstDay.add(d, "day"));
  }
  return days;
}

export default function ReservationCalendar() {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
  const [busySlots, setBusySlots] = useState<Record<string, Record<string, number>>>({});
  const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const days = getMonthDays(currentMonth.year(), currentMonth.month());

  const handlePrevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const handleNextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

  // Gün seçildiğinde saatleri göster
  const handleDayClick = (day: Dayjs) => {
    setSelectedDay(day);
    setSelectedSlot(null);
    setSuccess(null);
  };

  // Saat seçimi
  const handleSlotClick = (slot: string, available: boolean) => {
    if (!available) return;
    setSelectedSlot(slot);
    setDialogOpen(true);
  };

  // Randevu talebi gönder
  const handleSendRequest = async () => {
    setDialogOpen(false);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("accessToken") || "";

    if (!user?.id || !selectedDay || !selectedSlot || !token) {
      setSuccess("Bir hata oluştu. Lütfen tekrar deneyin.");
      return;
    }

    try {
      const result = await sendAppointmentRequest({
        user_id: user.id,
        randevu_tarihi: selectedDay.format("YYYY-MM-DD"),
        randevu_saati: selectedSlot,
        token,
      });
      if (result.success) {
        setSuccess("Teklifiniz başarıyla iletildi! Onay için bilgilendirileceksiniz.");
      } else {
        setSuccess("Bir hata oluştu: " + ("message" in result ? result.message : "Randevu talebi gönderilemedi."));
      }
    } catch (err) {
      setSuccess("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  // Ay değiştikçe randevuları çek ve busySlots'u oluştur
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const company_id = user?.company_id || 1;
        const year = currentMonth.year();
        const month = currentMonth.month() + 1;
        const res = await fetchAllCompanyAppointmentsByMonth({ year, month, company_id });

        // Eğer response doğrudan busySlots formatında ise:
        if (res && typeof res === "object" && !Array.isArray(res)) {
          setBusySlots(res);
        } else if (res?.data && typeof res.data === "object" && !Array.isArray(res.data)) {
          setBusySlots(res.data);
        } else {
          setBusySlots({});
        }
      } catch (err) {
        setBusySlots({});
      }
    };
    fetchCounts();
  }, [currentMonth]);

  // Takvim başı boşlukları için
  const firstDayOfWeek = days[0].day();
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

  // Takvimde ay adlarını Türkçe göstermek için dayjs global locale ayarı
  useEffect(() => {
    dayjs.locale('tr');
  }, []);

  const now = dayjs();
  const maxDate = now.add(1, "month").endOf("day");

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 900, color: "#0099ff", mb: 2, textAlign: "center" }}>
        Özel Eğitim Randevu Takvimi
      </Typography>
      {/* Takvimin üstünde bilgi notu */}
      <Alert severity="info" sx={{ mb: 3, fontWeight: 500, color: "#01579b", background: "#e0f7fa" }}>
        Gönderilen tekliften sonra ödemenin gönderilmesi gerekmektedir.
      </Alert>
      <Typography variant="body1" sx={{ color: "#01579b", mb: 4, textAlign: "center" }}>
        Aylık takvimde her günün randevu saatlerini görebilirsiniz.
      </Typography>
      <CalendarContainer>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Button onClick={handlePrevMonth} variant="outlined" sx={{ color: "#0099ff", borderColor: "#0099ff" }}>
            Önceki
          </Button>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#01579b" }}>
            {/* Ay adını ve yılı Türkçe ve ilk harfi büyük olacak şekilde göster */}
            {dayjs(currentMonth).locale('tr').format("MMMM YYYY").replace(/^\w/, c => c.toLocaleUpperCase("tr-TR"))}
          </Typography>
          <Button onClick={handleNextMonth} variant="outlined" sx={{ color: "#0099ff", borderColor: "#0099ff" }}>
            Sonraki
          </Button>
        </Box>
        <Grid container spacing={1} sx={{ mb: 2 }}>
          {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((d) => (
            <Grid item xs={1.71} key={d}>
              <Typography sx={{ color: "#0099ff", fontWeight: 700, textAlign: "center" }}>{d}</Typography>
            </Grid>
          ))}
        </Grid>
        {calendarRows.map((row, i) => (
          <Grid container spacing={1} key={i} sx={{ mb: 1 }}>
            {row.map((day: Dayjs | null, j: number) => {
              if (!day) return <Grid item xs={1.71} key={j}></Grid>;
              const dayStr = day.format("YYYY-MM-DD");
              // Sadece bugünden önceki günler ve 1 ay sonrasından ileri günler disable olsun
              const isPast = day.isBefore(now, "day");
              const isAfterMax = day.isAfter(maxDate, "day");
              const isDisabled = isPast || isAfterMax;
              return (
                <Grid item xs={1.71} key={j}>
                  <DayCell
                    sx={{
                      border: selectedDay && day.isSame(selectedDay, "day") ? "2px solid #0099ff" : "1px solid #e0e0e0",
                      backgroundColor: selectedDay && day.isSame(selectedDay, "day") ? "#e0f7fa" : "#fff",
                    }}
                    onClick={() => !isDisabled && handleDayClick(day)}
                    elevation={selectedDay && day.isSame(selectedDay, "day") ? 6 : 1}
                    style={isDisabled ? { opacity: 0.5, pointerEvents: "none" } : {}}
                  >
                    <Typography sx={{ fontWeight: 700, color: "#01579b", textAlign: "center" }}>
                      {day.date()}
                    </Typography>
                    {/* O günün randevu saatlerini yaz */}
                    <Box sx={{ mt: 1 }}>
                      {Object.keys(busySlots[dayStr] || {}).length === 0 ? (
                        <Typography sx={{ fontSize: 12, color: "#aaa", textAlign: "center" }}>
                          Randevu yok
                        </Typography>
                      ) : (
                        Object.keys(busySlots[dayStr])
                          .sort()
                          .map((slot) => (
                            <Typography key={slot} sx={{ fontSize: 13, color: "#0099ff", textAlign: "center" }}>
                              {slot}
                            </Typography>
                          ))
                      )}
                    </Box>
                  </DayCell>
                </Grid>
              );
            })}
          </Grid>
        ))}
        {/* Saat seçim ekranı */}
        {selectedDay && (
          <Box mt={4}>
            <Typography variant="h6" sx={{ color: "#0099ff", fontWeight: 700, mb: 2 }}>
              {selectedDay.format("DD MMMM YYYY")} için Randevu Saatleri
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {timeSlots.map((slot) => {
                const dayStr = selectedDay.format("YYYY-MM-DD");
                const count = busySlots[dayStr]?.[slot] || 0;
                const busy = count >= 2;
                // Seçili gün bugünün aynısıysa, geçmiş saatler ve şu anki saat de disabled
                let slotDisabled = busy;
                if (selectedDay.isSame(now, "day")) {
                  const slotTime = dayjs(`${dayStr} ${slot}`);
                  if (slotTime.isBefore(now)) slotDisabled = true;
                }
                return (
                  <TimeSlotButton
                    key={slot}
                    sx={{ backgroundColor: !slotDisabled ? "#0099ff" : "#e0e0e0", color: !slotDisabled ? "#fff" : "#888" }}
                    startIcon={slotDisabled ? <HourglassEmptyIcon /> : <CheckCircleIcon />}
                    onClick={() => handleSlotClick(slot, !slotDisabled)}
                    disabled={slotDisabled}
                  >
                    {slot}
                    {count > 0 && (
                      <span style={{ marginLeft: 6, fontSize: 13, color: "#fff" }}>
                        ({count}/2)
                      </span>
                    )}
                  </TimeSlotButton>
                );
              })}
            </Box>
            {success && (
              <Alert severity="success" sx={{ mt: 3 }}>
                {success}
              </Alert>
            )}
          </Box>
        )}
      </CalendarContainer>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Randevu Talebi</DialogTitle>
        <DialogContent>
          <Typography>
            {selectedDay?.format("DD MMMM YYYY")} - {selectedSlot} saatine randevu talebi göndermek istiyor musunuz?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="inherit">
            Vazgeç
          </Button>
          <Button onClick={handleSendRequest} variant="contained" sx={{ bgcolor: "#0099ff", color: "#fff", "&:hover": { bgcolor: "#01579b" } }}>
            Talep Gönder
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
