import React from 'react';
import errorImg from 'src/assets/images/err.svg';
import { Box, Button, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ message = 'Opps!!!', isCheckLogin = false }) => {
   const navigate = useNavigate();
   const CustomBox = styled(Box)(({ theme }) => ({
      minHeight: '80vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
               {message}
            </Typography>

            {!isCheckLogin && (
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
                  Có gì đó không ổn, hãy thử lại nhé!
               </Typography>
            )}

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
                  onClick={isCheckLogin ? () => navigate('/login') : () => navigate('/')}
               >
                  {isCheckLogin ? 'Đăng nhập' : 'Thử lại!'}
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
               src={errorImg}
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

export default ErrorPage;
