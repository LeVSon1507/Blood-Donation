import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Typography } from '@mui/material';
import { getCurrentUser, getFullAddress } from 'src/utils';

export default function EditRequestForm({ open, setOpen, onEdit, volunteer }) {
   const currentHospital = getCurrentUser();

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <React.Fragment>
         <Dialog maxWidth='lg' open={open} onClose={handleClose}>
            <DialogTitle className='my-1'>Chỉnh sửa thông tin:</DialogTitle>

            <Box className='mx-3 px-3'>
               <Typography variant='body1' className='my-1'>
                  <strong>Tên người hiến:</strong> {volunteer?.volunteers?.fullname}
               </Typography>
               <Typography variant='body1' className='my-1'>
                  <strong>CCCD:</strong> {volunteer?.volunteers?.cccd || ''}
               </Typography>
               <Typography variant='body2' className='my-1'>
                  <strong>Địa chỉ:</strong> {getFullAddress(volunteer?.volunteers?.users)}
               </Typography>
            </Box>

            <TextField
               fullWidth
               variant='standard'
               type='text'
               label='Số Lượng Máu Đã Hiến'
               name='quantity'
               value={''}
               placeholder='Chỉnh Sửa Số Lượng Máu Đã Hiến'
               onChange={() => {}}
            />

            <TextField
               fullWidth
               variant='standard'
               type='text'
               label='Nhóm máu của tình nguyện viên'
               name='quantity'
               value={''}
               placeholder='Chỉnh Sửa Nhóm máu của tình nguyện viên'
               onChange={() => {}}
            />

            <DialogActions>
               <Button onClick={handleClose}>Đóng</Button>
            </DialogActions>
            <DialogActions>
               <Button onClick={onEdit}>Chỉnh sửa</Button>
            </DialogActions>
         </Dialog>
      </React.Fragment>
   );
}
