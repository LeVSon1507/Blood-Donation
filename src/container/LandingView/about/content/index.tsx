import { Grid, Typography, IconButton, Card, CardContent } from '@mui/material';
// icons
import TopicIcon from '@mui/icons-material/Topic';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import SecurityIcon from '@mui/icons-material/Security';

// image
import itSupport from 'src/assets/images/undraw_doctors_p6aq.svg';

// components
import Paragraph from '../../Paragraph';
import Title from '../../Title';

const Content = () => {
   return (
      <Grid
         container
         spacing={0}
         sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            py: 10,
            px: 2,
         }}
      >
         <Grid item xs={12} sm={12} md={5} component='section'>
            <Title text={'Những gì chúng tôi cung cấp?'} textAlign={'start'} />

            <Typography
               variant='h6'
               component='h4'
               sx={{
                  fontWeight: '400',
                  paddingTop: 1,
               }}
            >
               Đặt lịch hiến máu dễ dàng và an toàn
            </Typography>

            <Paragraph
               text={`Với tính năng tìm kiếm địa điểm hiến máu, bạn có thể dễ dàng tìm ra các điểm hiến máu gần nơi bạn sống hoặc làm việc. Chỉ cần nhập địa chỉ của bạn và chúng tôi sẽ hiển thị các trạm hiến máu trong khu vực của bạn cùng với thông tin về giờ mở cửa và cách thức đăng ký.`}
               maxWidth={'75%'}
               mx={0}
               textAlign={'start'}
            />
         </Grid>

         <Grid item xs={12} sm={6} md={3}>
            <Card
               square={true}
               sx={{
                  minHeight: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: '1px solid #ccc',
               }}
            >
               <CardContent>
                  <IconButton>
                     <TopicIcon fontSize='large' color='secondary' />
                  </IconButton>
                  <Typography
                     variant='h5'
                     component='p'
                     sx={{
                        fontWeight: 700,
                        textTransform: 'capitalize',
                     }}
                  >
                     Cập nhật thông tin hiến máu ngay lập tức
                  </Typography>
               </CardContent>
            </Card>
         </Grid>

         <Grid item xs={12} sm={6} md={3}>
            <Card
               square={true}
               sx={{
                  minHeight: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: '1px solid #ccc',
               }}
            >
               <CardContent>
                  <IconButton>
                     <LocalShippingIcon fontSize='large' color='secondary' />
                  </IconButton>
                  <Typography
                     variant='h5'
                     component='p'
                     sx={{
                        fontWeight: 700,
                        textTransform: 'capitalize',
                     }}
                  >
                     An toàn cho user
                  </Typography>
               </CardContent>
            </Card>
         </Grid>

         <Grid
            item
            xs={12}
            sm={6}
            md={2}
            sx={{
               display: { xs: 'none', sm: 'block' },
            }}
         >
            <Card
               square={true}
               sx={{
                  boxShadow: 'none',
                  minHeight: 180,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
               }}
            >
               <CardContent>
                  <img src={itSupport} alt='functionsvg' width={250} height={250} />
               </CardContent>
            </Card>
         </Grid>

         <Grid item xs={12} sm={6} md={3}>
            <Card
               square={true}
               sx={{
                  minHeight: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: '1px solid #ccc',
               }}
            >
               <CardContent>
                  <IconButton>
                     <ConnectWithoutContactIcon fontSize='large' color='secondary' />
                  </IconButton>
                  <Typography
                     variant='h5'
                     component='p'
                     sx={{
                        fontWeight: 700,
                        textTransform: 'capitalize',
                     }}
                  >
                     Giao diện tiện lợi, dễ dàng sử dụng.
                  </Typography>
               </CardContent>
            </Card>
         </Grid>

         <Grid item xs={12} sm={6} md={3}>
            <Card
               square={true}
               sx={{
                  minHeight: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: '1px solid #ccc',
               }}
            >
               <CardContent>
                  <IconButton>
                     <AddReactionIcon fontSize='large' color='secondary' />
                  </IconButton>
                  <Typography
                     variant='h5'
                     component='p'
                     sx={{
                        fontWeight: 700,
                        textTransform: 'capitalize',
                     }}
                  >
                     Mang lòng tốt của bạn đến với xã hội
                  </Typography>
               </CardContent>
            </Card>
         </Grid>

         <Grid item xs={12} sm={6} md={3}>
            <Card
               square={true}
               sx={{
                  minHeight: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: '1px solid #ccc',
               }}
            >
               <CardContent>
                  <IconButton>
                     <SecurityIcon fontSize='large' color='secondary' />
                  </IconButton>
                  <Typography
                     variant='h5'
                     component='p'
                     sx={{
                        fontWeight: 700,
                        textTransform: 'capitalize',
                     }}
                  >
                     Thông tin bảo mật cao
                  </Typography>
               </CardContent>
            </Card>
         </Grid>
      </Grid>
   );
};

export default Content;
