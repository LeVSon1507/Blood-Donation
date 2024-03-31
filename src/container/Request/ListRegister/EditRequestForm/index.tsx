import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { getFullAddress } from 'src/utils';
import LoadingCommon from 'src/components/LoadingCircle';

export default function EditRequestForm({
   open,
   setOpen,
   isLoading,
   onEditRegister,
   quantity,
   setQuantity,
   bloodTypeId,
   setBloodTypeId,
   volunteer,
}) {
   const handleClose = () => {
      setOpen(false);
   };

   const handleChangeBloodType = (bloodTypeId: any) => {
      setBloodTypeId(bloodTypeId);
   };

   if (isLoading) return <LoadingCommon />;

   return (
      <React.Fragment>
         <Dialog maxWidth='sm' fullWidth sx={{}} open={open} onClose={handleClose}>
            <DialogTitle className='my-1'>Chỉnh sửa thông tin:</DialogTitle>

            <Box className='mx-3 px-3 my-2'>
               <Typography variant='body1' className='my-1'>
                  <strong>Tên người hiến:</strong> {volunteer?.volunteers?.fullname || ''}
               </Typography>
               <Typography variant='body1' className='my-1'>
                  <strong>CCCD:</strong> {volunteer?.volunteers?.cccd || ''}
               </Typography>
               <Typography variant='body2' className='my-1'>
                  <strong>Địa chỉ:</strong> {getFullAddress(volunteer?.volunteers?.users) || ''}
               </Typography>
            </Box>
            <Box className='mx-3 px-3'>
               <Box className='my-1'>
                  <FormControl fullWidth>
                     <InputLabel htmlFor='max-width'>
                        Nhóm máu của tình nguyện viên {volunteer?.volunteers?.fullname || ''}:
                     </InputLabel>
                     <Select
                        autoFocus
                        onChange={e => handleChangeBloodType(e.target.value)}
                        value={bloodTypeId}
                     >
                        <MenuItem value={2}>Máu B</MenuItem>
                        <MenuItem value={3}>Máu AB</MenuItem>
                        <MenuItem value={4}>Máu O</MenuItem>
                        <MenuItem value={5}>Máu A</MenuItem>
                     </Select>
                  </FormControl>
               </Box>

               <TextField
                  className='mt-3'
                  fullWidth
                  type='text'
                  label='Số Lượng Máu Đã Hiến (ml)'
                  name='quantity'
                  value={quantity}
                  placeholder='Chỉnh Sửa Số Lượng Máu Đã Hiến'
                  onChange={e => setQuantity(e.target.value)}
               />
            </Box>

            <Box className='d-flex align-items-center justify-content-end'>
               <DialogActions>
                  <Button onClick={handleClose}>Đóng</Button>
               </DialogActions>
               <DialogActions>
                  <Button onClick={onEditRegister}>Chỉnh sửa</Button>
               </DialogActions>
            </Box>
         </Dialog>
      </React.Fragment>
   );
}
