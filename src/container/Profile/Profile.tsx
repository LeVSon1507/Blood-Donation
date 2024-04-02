import { FiberManualRecordTwoTone } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './Profile.scss';
import { PRIMARY_COLOR } from 'src/utils/const';
import {
   Role,
   User,
   formatDate,
   getDistrictByCode,
   getProvinceByCode,
   getWardByCode,
   http,
} from 'src/utils';
import ErrorPage from 'src/components/ErrorPage';
import EditProfile from './UpdateProfileModal';
import ava_default from 'src/assets/images/undraw_medicine_b-1-ol.svg';

interface IPersonalProps {}

const Profile = (props: IPersonalProps) => {
   const [error, setError] = useState('');
   const [registerCount, setRegisterCount] = useState('');
   const [openEdit, setOpenEdit] = useState(false);
   const [user, setUser] = useState<User>();
   const userId = JSON.parse(localStorage.getItem('userId')) as unknown as User;

   useEffect(() => {
      http
         .get(`/volunteer/countblooddonationsessions?volunteerid=${userId}`)
         .then(res => setRegisterCount(res?.data?.data))
         .catch(err => {
            setError(err?.message);
         });
      http
         .get(`/user/profile?id=${userId}`)
         .then(res => {
            return res?.data?.data;
         })
         .then(data => {
            if (data) {
               const newData = {
                  ...data,
                  ...data?.volunteers,
                  ...data?.hospitals,
                  ...data?.bloodbank,
               };
               setUser(newData);
               localStorage.setItem('currentUser', JSON.stringify(newData));
            }
         })
         .catch(err => {
            setError(err?.message);
         });
   }, [userId]);

   const currentUser = user ?? (JSON.parse(localStorage.getItem('currentUser')) as unknown as User);

   const city = getProvinceByCode(currentUser?.city?.toString())?.name;
   const ward = getWardByCode(currentUser?.ward?.toString())?.name;
   const district = getDistrictByCode(currentUser?.district?.toString())?.name;

   return error ? (
      <>{<ErrorPage message={error} />}</>
   ) : (
      <Box sx={{ m: 4, pb: '180px' }}>
         <Box className='partner_profile'>
            <Box className='box_infor_first'>
               <Box className='avt_image'>
                  <img
                     src={ava_default}
                     width={300}
                     height={300}
                     style={{ borderRadius: '50%' }}
                     alt='avt'
                     loading='lazy'
                  />
                  <FiberManualRecordTwoTone className='online' />
               </Box>
               <Box className='info_user'>
                  <Box className='about_me'>
                     <Typography>{`//`} Trang Cá Nhân</Typography>
                  </Box>
                  <Box className='bio_box'>
                     <span className='box_name'>
                        <Typography className='user_name'>
                           Họ và tên:{' '}
                           {currentUser?.fullname ||
                              currentUser?.nameHospital ||
                              currentUser?.nameBloodbank ||
                              currentUser?.nameHospital ||
                              'Chưa cập nhật'}
                        </Typography>
                        <Typography className='bio'>
                           <strong> Email: </strong>
                           {currentUser?.email || 'Chưa cập nhật'}
                        </Typography>
                        <Typography className='bio'>
                           <strong> Số điện thoại: </strong>
                           {currentUser?.phoneNumber ?? 'Chưa cập nhật'}
                        </Typography>
                        {currentUser?.role === Role.Volunteer && (
                           <Typography className='bio'>
                              <strong> Giới tính: </strong>
                              {currentUser?.gender === 0 ? 'Nam' : 'Nữ' ?? 'Chưa cập nhật'}
                           </Typography>
                        )}
                        <Typography className='bio'>
                           <strong> Thành phố: </strong>
                           {city ?? 'Chưa cập nhật'}
                        </Typography>
                        <Typography className='bio'>
                           <strong> Quận: </strong>
                           {district ?? 'Chưa cập nhật'}
                        </Typography>
                        <Typography className='bio'>
                           <strong> Huyện: </strong>
                           {ward ?? 'Chưa cập nhật'}
                        </Typography>
                     </span>
                  </Box>
                  <Box className='grid_container'></Box>
                  <Box className='action_box'>
                     {currentUser?.fullname && currentUser?.role === Role.Volunteer ? (
                        <>
                           <Typography>
                              Xin chào, Đây là trang cá nhân của{' '}
                              <strong>{currentUser.fullname}</strong>! Tôi sinh ngày{' '}
                              <strong>
                                 {formatDate(currentUser?.birthdate) || 'Chưa cập nhật'}
                              </strong>
                              , là một {currentUser?.gender === 0 ? 'anh chàng' : 'cô gái'} với số
                              CCCD là <strong>{currentUser.cccd || 'Chưa cập nhật'}</strong>.
                           </Typography>
                        </>
                     ) : (
                        currentUser?.role === Role.Volunteer && (
                           <Typography>
                              Xin chào! Đây là trang cá nhân của một người vô danh, có thể người đó
                              muốn cập nhật thông tin cá nhân của mình.
                           </Typography>
                        )
                     )}
                     {currentUser?.role === Role.Hospital && (
                        <Typography>Xin chào! Đây là tài khoản của bệnh viện!</Typography>
                     )}
                     {currentUser?.role === Role.Admin && (
                        <Typography>Xin chào! Đây là tài khoản của Admin!</Typography>
                     )}
                     {currentUser?.role === Role.BloodBank && (
                        <Typography>Xin chào! Đây là tài khoản của Ngân Hàng Máu!</Typography>
                     )}
                  </Box>
                  {currentUser?.role === Role.Volunteer && (
                     <Box className='contact_infor'>
                        <Box className='contact_infor_post'>
                           <Typography>Số lần đăng kí hiến máu:</Typography>
                        </Box>
                        <Box className='contact_infor_post'>
                           <Typography>{registerCount}</Typography>
                        </Box>
                     </Box>
                  )}
                  <>
                     <Button
                        variant='outlined'
                        onClick={() => setOpenEdit(true)}
                        sx={{ color: PRIMARY_COLOR, border: '1px solid #811315' }}
                     >
                        Cập nhật thông tin cá nhân
                     </Button>
                  </>
               </Box>
            </Box>
         </Box>
         <EditProfile isOpen={openEdit} handleClose={() => setOpenEdit(false)} user={currentUser} />
      </Box>
   );
};

export default Profile;
