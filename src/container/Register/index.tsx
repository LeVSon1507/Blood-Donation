import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { schema } from './helpers';
import { RE_CAPTCHA_SITE_KEY, http, isEmpty } from 'src/utils';
import {
   FormControl,
   Grid,
   InputLabel,
   MenuItem,
   Select,
   TextField,
   Typography,
} from '@mui/material';
import logo1 from 'src/assets/images/undraw_doctors_p6aq.svg';
import Button from 'src/components/Button';
import ReCAPTCHA from 'react-google-recaptcha';
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LoadingCommon from 'src/components/LoadingCircle';

const RegisterPage = () => {
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = React.useState(false);

   const {
      handleSubmit,
      setValue,
      watch,
      register,
      formState: { errors },
   } = useForm<any>({
      resolver: yupResolver(schema),
      mode: 'onSubmit',
      defaultValues: {
         email: '',
         password: '',
         confirmPassword: '',
         phoneNumber: '',
         cccd: '',
         fullname: '',
         user: '',
         birthdate: '',
         gender: 0,
      },
   });

   const onSubmit = data => {
      setIsLoading(true);
      http
         .post('user/register', data)
         .then(res => {
            navigate('/login');
            setIsLoading(false);

            toast.success('Register Successfully');
         })
         .catch(err => {
            console.log(err);
            setIsLoading(false);
            toast.error(err?.data?.errorDetails);
         });
   };

   const [isDisable, setIsDisable] = useState(true);

   const onSuccessReCaptcha = () => {
      setIsDisable(false);
   };

   return isLoading ? (
      <LoadingCommon additionalClass='h-[100vh]' />
   ) : (
      <div className='minH-[100vh] h-[100vh] w-[100%]  pt-10'>
         <div className='max-w-[1000px] mx-auto px-5'>
            <div className='flex flex-col justify-center items-center'>
               <div className='flex justify-center items-center cursor-pointer'>
                  <img
                     src={logo1}
                     alt='logoT'
                     width={160}
                     height={160}
                     className='bg-white p-2 rounded-full'
                  />
               </div>
               <Typography variant='h4' component='h2'>
                  Giọt Máu Hồng
               </Typography>
            </div>

            <form className='mx-auto max-w-[600px]' onSubmit={handleSubmit(onSubmit)}>
               <Grid xs={12} mb={2} gap={1}>
                  <TextField
                     fullWidth
                     variant='standard'
                     type='text'
                     label='Email'
                     name='email'
                     placeholder='Enter your email'
                     {...register('email')}
                  />
                  {errors.email && (
                     <p className='text-sm text-red-500 color-red'>
                        {errors?.email?.message as string}
                     </p>
                  )}
               </Grid>
               <Grid xs={12} mb={2} gap={1}>
                  <TextField
                     fullWidth
                     variant='standard'
                     type='text'
                     label='SĐT'
                     name='phoneNumber'
                     placeholder='Enter your Phone number'
                     {...register('phoneNumber')}
                  />
                  {errors.email && (
                     <p className='text-sm text-red-500 color-red'>
                        {errors?.phoneNumber?.message as string}
                     </p>
                  )}
               </Grid>

               <Grid xs={12} mb={2} gap={1}>
                  <TextField
                     fullWidth
                     variant='standard'
                     type='text'
                     label='CCCD'
                     name='cccd'
                     placeholder='Enter your CCCD'
                     {...register('cccd')}
                  />
                  {errors.email && (
                     <p className='text-sm text-red-500 color-red'>
                        {errors?.cccd?.message as string}
                     </p>
                  )}
               </Grid>
               <Grid xs={12} mb={2} gap={1}>
                  <TextField
                     fullWidth
                     variant='standard'
                     type='text'
                     label='Họ Và Tên'
                     name='fullname'
                     placeholder='Enter your full name'
                     {...register('fullname')}
                  />
                  {errors.email && (
                     <p className='text-sm text-red-500 color-red'>
                        {errors?.fullname?.message as string}
                     </p>
                  )}
               </Grid>
               <Grid xs={12} mb={2} gap={1}>
                  <FormControl sx={{ minWidth: 450 }} {...register('gender')}>
                     <InputLabel htmlFor='max-width'>Giới tính</InputLabel>
                     <Select value={watch('gender')} autoFocus {...register('gender')}>
                        <MenuItem value={0}>Nam</MenuItem>
                        <MenuItem value={1}>Nữ</MenuItem>
                     </Select>
                  </FormControl>
                  {errors.gender && (
                     <p className='text-sm text-red-500 color-red'>
                        {errors?.gender?.message as string}
                     </p>
                  )}
               </Grid>
               <Grid xs={6} mb={2} gap={1}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DemoItem label='Ngày sinh'>
                        <DatePicker
                           onChange={(value: any) => setValue('birthdate', value.toISOString())}
                           value={dayjs(watch('birthdate'))}
                        />
                     </DemoItem>
                     {isEmpty(watch('birthdate')) && (
                        <p className='text-sm text-red-500 color-red'>
                           {errors?.birthdate?.message as string}
                        </p>
                     )}
                  </LocalizationProvider>
               </Grid>
               <Grid xs={12} mb={2} gap={1}>
                  <TextField
                     fullWidth
                     variant='standard'
                     type='password'
                     label='Password'
                     name='password'
                     placeholder='Enter your password'
                     {...register('password')}
                  />
                  {errors.password && (
                     <p className='text-sm text-red-500 color-red'>
                        {errors?.password?.message as string}
                     </p>
                  )}
               </Grid>
               <Grid xs={12} mb={2} gap={1}>
                  <TextField
                     fullWidth
                     variant='standard'
                     type='password'
                     label='Confirm password'
                     name='confirmPassword'
                     placeholder='Enter your password'
                     {...register('confirmPassword')}
                  />
                  {errors.confirmPassword && (
                     <p className='text-sm text-red-500 color-red'>
                        {errors?.confirmPassword?.message as string}
                     </p>
                  )}
               </Grid>
               <Grid item xs={12} className='grid-recaptcha mb-4'>
                  <ReCAPTCHA sitekey={RE_CAPTCHA_SITE_KEY} onChange={onSuccessReCaptcha} />
               </Grid>
               <div className='w-full flex justify-center gap-10 mb-4'>
                  <Button styleClass={'w-full'} isDisable={isDisable}>
                     Submit
                  </Button>
               </div>
               <div className='text-sm justify-center flex text-grayCustom'>
                  <span className='inline-block mr-1'>Đã có tài khoản?</span>
                  <NavLink to={'/login'} className='font-semibold cursor-pointer'>
                     Đăng Nhập
                  </NavLink>
               </div>
            </form>
         </div>
      </div>
   );
};

export default RegisterPage;
