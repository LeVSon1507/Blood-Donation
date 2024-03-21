import { FiberManualRecordTwoTone } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import './PersonalInfor.scss';
import { url_img } from '../../utils/const';

interface IPersonalProps {}

const Profile = (props: IPersonalProps) => {
   return (
      <Box sx={{ m: 4 }}>
         <Box className='partner_profile'>
            <Box className='box_infor_first'>
               <Box className='avt_image'>
                  <img src={url_img} alt='avt' loading='lazy' />
                  <FiberManualRecordTwoTone className='online' />
               </Box>
               <Box className='info_user'>
                  <Box className='about_me'>
                     <Typography>{`//`} Trang Cá Nhân</Typography>
                  </Box>
                  <Box className='bio_box'>
                     <span className='box_name'>
                        <Typography className='real_name'>Họ và tên</Typography>
                        <Typography className='bio'>
                           <strong> Thông tin về tôi: </strong>
                           'bio'
                        </Typography>
                     </span>
                  </Box>
                  <Box className='grid_container'></Box>
                  <Box className='action_box'>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum tempore
                     recusandae pariatur quas quae ipsum voluptatem quaerat unde! Aliquid, accusamus
                     voluptatem. Voluptate praesentium minus voluptas facere accusamus eos nisi
                     soluta!
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
