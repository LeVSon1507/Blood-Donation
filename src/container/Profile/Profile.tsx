import { FiberManualRecordTwoTone } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './Profile.scss';
import { token, url_img } from 'src/utils/const';
import { API_KEY, User, formatDate } from 'src/utils';
import axios from 'axios';
import ErrorPage from 'src/components/ErrorPage';

interface IPersonalProps {}

const Profile = (props: IPersonalProps) => {
   const [user, setUser] = useState<User>(null);
   const [error, setError] = useState('');

   useEffect(() => {
      axios
         .get<{ data: User }>(`${API_KEY}/user/profile?id=26`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then(res => setUser(res?.data?.data))
         .catch(err => {
            setError(err?.message);
         });
   }, []);

   return error ? (
      <>{<ErrorPage message={error} />}</>
   ) : (
      <Box sx={{ m: 4, pb: '180px' }}>
         <Box className='partner_profile'>
            <Box className='box_infor_first'>
               <Box className='avt_image'>
                  <img src={user?.img ?? url_img} alt='avt' loading='lazy' />
                  <FiberManualRecordTwoTone className='online' />
               </Box>
               <Box className='info_user'>
                  <Box className='about_me'>
                     <Typography>{`//`} Trang Cá Nhân</Typography>
                  </Box>
                  <Box className='bio_box'>
                     <span className='box_name'>
                        <Typography className='user_name'>
                           Họ và tên: {user?.volunteers?.fullName || 'Chưa cập nhật'}
                        </Typography>
                        <Typography className='bio'>
                           <strong> Email: </strong>
                           {user?.email || 'Chưa cập nhật'}
                        </Typography>
                        <Typography className='bio'>
                           <strong> Số điện thoại: </strong>
                           {user?.phoneNumber ?? 'Chưa cập nhật'}
                        </Typography>
                        <Typography className='bio'>
                           <strong> Giới tính:</strong>
                           {user?.volunteers?.gender === 0 ? ' nam' : ' nữ' ?? 'Chưa cập nhật'}
                        </Typography>
                     </span>
                  </Box>
                  <Box className='grid_container'></Box>
                  <Box className='action_box'>
                     {user?.volunteers?.fullName ? (
                        <>
                           <Typography>
                              Xin chào, tôi là <strong>{user.volunteers.fullName}</strong>!
                           </Typography>
                           <Typography>
                              Tôi sinh ngày{' '}
                              <strong>
                                 {formatDate(user.volunteers.birthDate) || 'Chưa cập nhật'}
                              </strong>
                              , là một {user.volunteers.gender === 0 ? 'anh chàng' : 'cô gái'} với
                              số CCCD là <strong>{user.volunteers.cccd || 'Chưa cập nhật'}</strong>.
                           </Typography>
                        </>
                     ) : (
                        <Typography>
                           Xin chào! Tôi là một người vô danh, có thể bạn muốn cập nhật thông tin cá
                           nhân của mình.
                        </Typography>
                     )}
                  </Box>
                  <Box className='contact_infor'>
                     <Box className='contact_infor_post'>
                        <Typography>Số lần hiến máu:</Typography>
                     </Box>
                     <Box className='contact_infor_post'>
                        <Typography>3</Typography>
                     </Box>
                  </Box>
               </Box>
            </Box>
         </Box>
      </Box>
   );
};

export default Profile;
