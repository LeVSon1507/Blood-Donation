import { Box, Stack, styled } from '@mui/material';
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import FooterLink from './FooterLink';
import FooterTitle from './FooterTitle';
import logo1 from 'src/assets/images/undraw_doctors_p6aq.svg';

const Footer = () => {
   const StackColumn = styled(Stack)(() => ({
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flex: 1,
      gap: 8,
      textAlign: 'center',
   }));

   const BoxRow = styled(Box)(({ theme }) => ({
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#f7f3f0',
      flex: 1,
      [theme.breakpoints.down('sm')]: {
         flexDirection: 'column',
         gap: 30,
      },
   }));

   return (
      <BoxRow
         component='footer'
         sx={{
            py: 4,
            px: 2,
         }}
      >
         <StackColumn>
            <img
               src={logo1}
               alt='logoT'
               width={40}
               height={40}
               style={{ backgroundColor: 'white', padding: 8, marginRight: 12 }}
            />
            <FooterTitle text={'Giọt máu hồng'} />
            <Stack direction='row' width='70px' maxWidth='100%' justifyContent='space-between'>
               <Link
                  href='#'
                  variant='body2'
                  sx={{
                     color: '#414141',
                     '&:hover': {
                        color: '#1c2859',
                     },
                  }}
               >
                  <InstagramIcon />
               </Link>
               <Link
                  href='#'
                  variant='body2'
                  sx={{
                     color: '#414141',
                     '&:hover': {
                        color: '#1c2859',
                     },
                  }}
               >
                  <FacebookIcon />
               </Link>
            </Stack>
         </StackColumn>
         <StackColumn>
            <FooterTitle text={'Địa chỉ'} />
            <FooterLink text={'fpt university'} />
            <FooterLink text={'0982123456'} />
            <FooterLink text={'demo@gmail.com'} />
         </StackColumn>

         <StackColumn>
            <FooterTitle text={'Chức năng của chúng tôi'} />
            <FooterLink text={'Đăng ký hiến máu.'} />
            <FooterLink text={'Đăng ký tổ chức hiến máu.'} />
            <FooterLink text={'Xem các nhóm máu.'} />
            <FooterLink text={'Các tổ chức hiến máu hiện có.'} />
         </StackColumn>
      </BoxRow>
   );
};

export default Footer;
