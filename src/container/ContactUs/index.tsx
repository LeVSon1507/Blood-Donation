import { useState } from 'react';
import {
   Container,
   Typography,
   TextField,
   Button,
   Grid,
   MenuItem,
   Paper,
   Tooltip,
   Box,
} from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import { RE_CAPTCHA_SITE_KEY, checkEmptyValueReturnArray } from 'src/utils';
import contactusSVG from 'src/assets/images/undraw_doctor_kw-5-l.svg';
import './styles.scss';
import FAQSection from './QAsection';
import LazyShow from '../LandingView/Animated/LazyShow';
import { ToastInfo } from 'src/utils/toastOptions';

const ContactUs = () => {
   const [isShowBtnSend, setIsShowBtnSend] = useState(false);
   const [questionAbout, setQuestionAbout] = useState('');
   const [message, setMessage] = useState('');
   const [selectedImage, setSelectedImage] = useState('');
   // TODO: implement later
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [selfQA, setSelfQA] = useState([]);

   const handleSubmit = () => {
      ToastInfo('Chức năng này đang trong quá trình phát triển, xin lỗi vì sự bất tiện này!');
   };

   const onSuccessReCaptcha = () => {
      setIsShowBtnSend(true);
   };

   const handleChangeMessage = e => {
      setMessage(e.target.value);
   };

   const QAList = checkEmptyValueReturnArray(selfQA);

   return (
      <Container maxWidth='md' className='contactUs-container'>
         <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
               <img
                  src={contactusSVG}
                  alt='Maggie_Aboutme02'
                  style={{ width: '100%', height: 500 }}
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <div>
                  <Typography className='text' variant='body1'>
                     Xin Chào!
                  </Typography>
                  <Typography className='text' variant='h4'>
                     Cảm ơn bạn đã liên hệ với tôi! Chúng tôi mong chờ tin từ bạn!
                  </Typography>
                  <form>
                     <TextField
                        select
                        label='I have a problems about'
                        fullWidth
                        margin='normal'
                        value={questionAbout}
                        onChange={e => setQuestionAbout(e.target.value)}
                     >
                        <MenuItem value='Đăng kí hiến máu'>Đăng kí hiến máu</MenuItem>
                        <MenuItem value='Tìm kiếm buổi hiến máu'>Tìm kiếm buổi hiến máu</MenuItem>
                        <MenuItem value='Tìm kiếm danh sách hoạt động ở địa phương tôi'>
                           Tìm kiếm danh sách hoạt động ở địa phương tôi
                        </MenuItem>
                        <MenuItem value='Các vấn đề khác (miêu tả cụ thể bên dưới)'>
                           Các vấn đề khác (miêu tả cụ thể bên dưới)
                        </MenuItem>
                        <MenuItem value='Vấn đề bảo mật'>Vấn đề bảo mật</MenuItem>
                        <MenuItem value='Vấn đề tài khoản'>Vấn đề tài khoản</MenuItem>
                     </TextField>
                     <TextField
                        value={message}
                        onChange={handleChangeMessage}
                        label='Message'
                        multiline
                        rows={4}
                        fullWidth
                        margin='normal'
                     />

                     {selectedImage && (
                        <Box className='boxEVD'>
                           <Tooltip title='Click to edit image' placement={'left'} arrow>
                              <Paper variant='elevation' className='paperEVD' onClick={() => {}}>
                                 <img
                                    className='paperEVD__imgEVD'
                                    src={selectedImage}
                                    alt='imageQA'
                                 />
                              </Paper>
                           </Tooltip>
                           <Button
                              onClick={() => setSelectedImage('')}
                              className='btnEVD'
                              variant='outlined'
                           >
                              Remove Image
                           </Button>
                        </Box>
                     )}
                     {message && questionAbout && (
                        <Grid item xs={12} className='grid-recaptcha'>
                           <ReCAPTCHA sitekey={RE_CAPTCHA_SITE_KEY} onChange={onSuccessReCaptcha} />
                        </Grid>
                     )}
                     {isShowBtnSend && (
                        <Grid item xs={12} className='btn-wrap' sx={{ mt: 1 }}>
                           <Button
                              className='button-Send'
                              variant='contained'
                              color='primary'
                              type='button'
                              onClick={handleSubmit}
                           >
                              Send Message
                           </Button>
                        </Grid>
                     )}
                  </form>
               </div>
            </Grid>
         </Grid>
         <LazyShow>{QAList?.length > 0 && <FAQSection selfQA={QAList} />}</LazyShow>
      </Container>
   );
};

export default ContactUs;
