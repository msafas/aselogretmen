// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import heroVideo from "../../../assets/video.mp4";

// // const StyledBox = styled('div')(({ theme }) => ({
// //     alignSelf: 'center',
// //     width: '100%',
// //     height: '100%',
// //     marginTop: theme.spacing(8),
// //     borderRadius: theme.shape.borderRadius,
// //     border: '1px solid',
// //     borderColor: theme.palette.grey[200],
// //     boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
// //     backgroundImage: `url(${background})`,
// //     backgroundRepeat: 'no-repeat',
// //     backgroundPosition: 'center',
// //     backgroundSize: 'cover',
// //     [theme.breakpoints.up('sm')]: {
// //         marginTop: theme.spacing(10),
// //         height: 700,
// //     },
// //     ...theme.applyStyles('dark', {
// //         boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
// //         borderColor: theme.palette.grey[700],
// //     }),
// // }));

// export default function Hero() {
//     return (
//         <Box
//             id="hero"
//             sx={(theme) => ({
//                 width: '100%',
//                 backgroundRepeat: 'no-repeat',
//                 backgroundImage:
//                     'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
//                 ...theme.applyStyles('dark', {
//                     backgroundImage:
//                         'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
//                 }),
//             })}
//         >
//             <Container
//                 sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     pt: { xs: 14, sm: 20 },
//                     pb: { xs: 8, sm: 12 },
//                 }}
//             >
//                 {/* <StyledBox id="image" /> */}
//                 <Box
//                     sx={{
//                         width: '100%',
//                         maxWidth: 1100,
//                         height: { xs: 220, sm: 400, md: 500 },
//                         borderRadius: 3,
//                         overflow: 'hidden',
//                         boxShadow: '0 0 24px 8px hsla(220, 25%, 80%, 0.2)',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         background: '#000',
//                     }}
//                 >
//                     <video
//                         src={heroVideo}
//                         style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                         autoPlay
//                         loop
//                         muted
//                         playsInline
//                     />
//                 </Box>
//             </Container>
//         </Box>
//     );
// }