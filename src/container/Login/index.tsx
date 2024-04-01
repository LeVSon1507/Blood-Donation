import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from 'src/context';
import { schema } from './helpers';
import { Role, User, http } from 'src/utils';
import { Grid, TextField, Typography } from '@mui/material';
import logo1 from 'src/assets/images/undraw_doctors_p6aq.svg';
import logo2 from 'src/assets/images/undraw_doctor_kw-5-l.svg';
import Button from 'src/components/Button';
import LoadingCommon from 'src/components/LoadingCircle';
import { IoMdArrowRoundBack } from 'react-icons/io';

const Login: React.FC = () => {
   const navigate = useNavigate();
   const { handleSetUser } = useAuth();
   const [isLoading, setIsLoading] = React.useState(false);

   const handleCheckNavigateByAccountRole = (user: User) => {
      const isAdmin = user?.role === Role.Admin;
      const isHospital = user?.role === Role.Hospital;
      const isManager = user?.role === Role.BloodBank;
      const isUser = user?.role === Role.Volunteer;

      if (isAdmin) {
         navigate('/manage/blood-bank');
      }
      if (isHospital) {
         navigate(`/manage/hospitals/${user?.userId}`);
      }
      if (isManager) {
         navigate('/manage/hospitals');
      }
      if (isUser) {
         navigate('/home');
      }
   };

   const {
      handleSubmit,
      register,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
      mode: 'onChange',
      defaultValues: {
         email: '',
         password: '',
      },
   });

   const onSubmit = value => {
      setIsLoading(true);
      http
         .post('user/login', value)
         .then(res => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data?.data?.userId);
            localStorage.setItem('currentUser', JSON.stringify(res.data?.data));
            setIsLoading(false);
            handleSetUser(res?.data?.data);
            return res?.data?.data;
         })
         .then(user => {
            toast.success('Login successfully');
            handleCheckNavigateByAccountRole(user);
         })
         .catch(err => {
            setIsLoading(false);
            console.log('error: ', err?.data?.message);
            toast.error(err?.data?.message || 'Email or password incorrect');
         });
   };

   return isLoading ? (
      <LoadingCommon additionalClass='h-[100vh]' />
   ) : (
      <>
         <div className='minH-[100vh] h-[100vh] w-full flex justify-center items-center bg-grayLight'>
            <div className='w-[70%] h-[90%] shadow-2xl flex flex-row bg-white'>
               <div className='w-[50%] h-[100%] '>
                  <img src={logo2} alt='' className='w-full h-full object-cover' />
               </div>
               <div className='w-[50%] h-[100%] flex flex-col px-8 justify-center'>
                  <IoMdArrowRoundBack
                     size={30}
                     className='cursor-pointer'
                     onClick={() => navigate('/')}
                  />
                  <div className='flex flex-col justify-center items-center'>
                     <div className='flex justify-center items-center cursor-pointer'>
                        <img
                           src={logo1}
                           alt='logoT'
                           width={120}
                           height={120}
                           className='bg-white p-2 rounded-full'
                        />
                     </div>
                     <Typography variant='h5' component='h2'>
                        Giọt Máu Hồng
                     </Typography>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
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
                           <p className='text-sm text-red-500 color-red'>{errors.email.message}</p>
                        )}
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
                              {errors.password.message}
                           </p>
                        )}
                     </Grid>

                     <div className='w-full flex justify-center pb-6'>
                        <Button type='submit'>Đăng Nhập</Button>
                     </div>
                  </form>
                  <div className='text-sm flex justify-center text-grayCustom'>
                     <span className='inline-block mr-1'>Bạn chưa có tài khoản?</span>
                     <NavLink
                        to={'/register'}
                        className='font-semibold cursor-pointer text-red-800'
                     >
                        Đăng ký ngay!
                     </NavLink>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Login;
