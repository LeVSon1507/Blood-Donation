import React from 'react';
import { Box, Button, styled, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
//img
import blood from 'src/assets/images/undraw_doctor_kw-5-l.svg';
import { getCurrentUser, Role } from 'src/utils';

const Header = () => {
   const currentUser = getCurrentUser();
   const navigate = useNavigate();
   const CustomBox = styled(Box)(({ theme }) => ({
      minHeight: '80vh',
      display: 'flex',
      justifyContent: 'center',
      gap: theme.spacing(2),
      paddingTop: theme.spacing(10),
      backgroundColor: '#f7f3f0',
      [theme.breakpoints.down('md')]: {
         flexDirection: 'column',
         alignItems: 'center',
         textAlign: 'center',
      },
   }));

   const BoxText = styled(Box)(({ theme }) => ({
      flex: '1',
      paddingLeft: theme.spacing(8),
      [theme.breakpoints.down('md')]: {
         flex: '2',
         textAlign: 'center',
         paddingLeft: theme.spacing(2),
         paddingRight: theme.spacing(2),
      },
   }));

   return (
      <CustomBox component='header'>
         {/*  Box text  */}
         <BoxText component='section'>
            <Typography
               variant='h2'
               component='h1'
               sx={{
                  fontWeight: 700,
                  color: 'black',
                  fontFamily: 'Open Sans,Arial,sans-serif',
               }}
            >
               Hiến máu - Hành động nhỏ, ý nghĩa lớn!
            </Typography>

            <Typography
               variant='body1'
               component='p'
               sx={{
                  py: 3,
                  lineHeight: 1.6,
                  color: 'black',
                  fontFamily: 'Open Sans,Arial,sans-serif',
               }}
            >
               Mỗi giọt máu là một cơ hội để cứu một mạng.
            </Typography>

            <Box>
               <Button
                  variant='contained'
                  sx={{
                     mr: 2,
                     px: 4,
                     py: 1,
                     fontSize: '0.9rem',
                     textTransform: 'capitalize',
                     borderRadius: 0,
                     borderColor: '#14192d',
                     color: '#fff',
                     backgroundColor: '#14192d',
                     '&&:hover': {
                        backgroundColor: '#343a55',
                     },
                     '&&:focus': {
                        backgroundColor: '#343a55',
                     },
                  }}
                  onClick={
                     !currentUser?.userId ? () => navigate('/login') : () => navigate('/home')
                  }
               >
                  {currentUser?.role === Role.Admin
                     ? 'Hi Admin'
                     : currentUser?.role === Role.Hospital
                     ? 'Hi Bệnh Viện'
                     : currentUser?.role === Role.BloodBank
                     ? 'Hi Kho Máu'
                     : 'Hi Tình Nguyện Viên'}
                  {!currentUser?.userId && 'Đến với chúng tôi'}
               </Button>
               <Button
                  component={Link}
                  to={'/about-us'}
                  variant='outlined'
                  sx={{
                     px: 4,
                     py: 1,
                     fontSize: '0.9rem',
                     textTransform: 'capitalize',
                     borderRadius: 0,
                     color: 'black',
                     backgroundColor: 'transparent',
                     borderColor: '#343a55',
                     '&&:hover': {
                        color: '#343a55',
                        borderColor: 'black',
                     },
                     '&&:focus': {
                        color: '#343a55',
                        borderColor: 'black',
                     },
                  }}
               >
                  Biết thêm về chúng tôi
               </Button>
            </Box>
         </BoxText>

         <Box
            sx={theme => ({
               [theme.breakpoints.down('md')]: {
                  flex: '1',
                  paddingTop: '30px',
                  alignSelf: 'center',
               },
               [theme.breakpoints.up('md')]: {
                  flex: '2',
                  alignSelf: 'flex-end',
               },
            })}
         >
            <img
               src={blood}
               alt='headerImg'
               style={{
                  width: '80%',
                  marginBottom: -15,
               }}
            />
         </Box>
      </CustomBox>
   );
};

export default Header;
