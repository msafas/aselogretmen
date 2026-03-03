import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/system';
import { Grid } from '@mui/material';

const userTestimonials = [
    {
        avatar: <Avatar alt="Müşteri" src="/images/customer1.png" />,
        name: 'Ayşe Yılmaz',
        occupation: 'Müşteri',
        testimonial:
            "Aracımı tertemiz yıkadılar! Hizmet gerçekten çok hızlı ve kolaydı. Personelin ilgisi için teşekkür ederim.",
    },
    {
        avatar: <Avatar alt="Müşteri" src="/images/customer2.png" />,
        name: 'Mehmet Karasu',
        occupation: 'Müşteri',
        testimonial:
            "Çok profesyonel bir yıkama deneyimiydi. Personel nazik ve yardımseverdi. Çok memnun kaldım.",
    },
    {
        avatar: <Avatar alt="Müşteri" src="/images/customer3.png" />,
        name: 'Zeynep Akın',
        occupation: 'Müşteri',
        testimonial:
            "Hızlı ve özenli bir yıkama. Aracımı pırıl pırıl teslim aldım. Artık daimi müşterinizim!",
    },
    {
        avatar: <Avatar alt="Müşteri" src="/images/customer4.png" />,
        name: 'Ali Çelik',
        occupation: 'Müşteri',
        testimonial:
            "İç ve dış yıkama harikaydı. Aracım ilk günkü gibi oldu. Kesinlikle tavsiye ederim.",
    },
    {
        avatar: <Avatar alt="Müşteri" src="/images/customer5.png" />,
        name: 'Elif Demir',
        occupation: 'Müşteri',
        testimonial:
            "Hızlı, kolay ve uygun fiyatlı bir hizmet. Aracımı yeni gibi teslim aldım. Tekrar geleceğim.",
    },
];

const whiteLogos = [
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg',
];

const darkLogos = [
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg',
    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg',
];

const logoStyle = {
    width: '64px',
    opacity: 0.3,
};

export default function Testimonials() {
    const theme = useTheme();
    const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;

    return (
        <Container
            id="testimonials"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
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
                <Typography
                    component="h2"
                    variant="h4"
                    gutterBottom
                    sx={{ color: 'text.primary' }}
                >
                    Müşteri Yorumları
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Müşterilerimizin hizmetlerimiz hakkındaki düşüncelerini görün. Kalite, hız ve müşteri memnuniyetine verdiğimiz önemi keşfedin.
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {userTestimonials.map((testimonial, index) => (
                    <Grid item xs={12} md={4} sm={6} key={index} sx={{ display: 'flex' }}>
                        <Card
                            variant="outlined"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                flexGrow: 1,
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="body1"
                                    gutterBottom
                                    sx={{ color: 'text.secondary' }}
                                >
                                    {testimonial.testimonial}
                                </Typography>
                            </CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    p: 2,
                                }}
                            >
                                <CardHeader
                                    avatar={testimonial.avatar}
                                    title={testimonial.name}
                                    subheader={testimonial.occupation}
                                    sx={{ p: 0 }}
                                />
                                <img
                                    src={logos[index % logos.length]}
                                    alt={`Logo ${index + 1}`}
                                    style={logoStyle}
                                />
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}