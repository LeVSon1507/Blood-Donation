import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import { getCurrentUser, getFullAddress } from 'src/utils';
import { QuantityTake } from '../ListBloodbank';
import LoadingCommon from 'src/components/LoadingCircle';

export default function RequestBloodForm({
   data,
   open,
   setOpen,
   setQuantityTake,
   onRequestBlood,
   quantityTake,
   isLoading,
}: any) {
   const currentHospital = getCurrentUser();

   const handleClose = () => {
      setOpen(false);
   };

   const handleChangeBlood = (index: number, quantity: number) => {
      const currentNumberBloodId = index + 1;
      const oldTake = quantityTake?.filter(
         (item: QuantityTake) => item?.numberbloodid !== currentNumberBloodId
      );
      const newTake = {
         numberbloodid: currentNumberBloodId,
         quantity,
      };
      setQuantityTake([...oldTake, newTake]);
   };

   return (
      <React.Fragment>
         <Dialog maxWidth='lg' open={open} onClose={handleClose}>
            {isLoading ? (
               <LoadingCommon additionalClass='h-[100vh] w-[35vw]' />
            ) : (
               <>
                  <DialogTitle className='my-1'>Đơn yêu cầu lấy máu:</DialogTitle>
                  <Box className='mx-3 px-3'>
                     <Typography variant='body1' className='my-1'>
                        <strong>Email yêu cầu: </strong> {currentHospital?.email}
                     </Typography>
                     <Typography variant='body1' className='my-1'>
                        <strong>Tên bệnh viện: </strong> {currentHospital?.hospitals?.nameHospital}
                     </Typography>
                     <Typography variant='body2' className='my-1'>
                        <strong>Địa chỉ:</strong> {getFullAddress()}
                     </Typography>
                     <Typography variant='h6' className='mt-2'>
                        Chọn số lượng của mỗi bình tương ứng dung tích bình máu:
                     </Typography>
                  </Box>
                  {data?.map((item, index) => {
                     return (
                        <DialogContent className='ml-2'>
                           <Box noValidate component='form'>
                              <FormControl sx={{ minWidth: 450 }}>
                                 <InputLabel htmlFor='max-width'>
                                    Số lượng lấy với bình {item?.quantity} ml:
                                 </InputLabel>
                                 <Select
                                    onChange={e =>
                                       handleChangeBlood(index, e.target.value as number)
                                    }
                                    value={quantityTake[index]?.quantity}
                                    label={`Số lượng lấy với bình ${item?.quantity} ml`}
                                 >
                                    {Array.from({ length: item?.total ?? 0 }, (_, i) => (
                                       <MenuItem key={i + 1} value={i + 1}>
                                          {i + 1}
                                       </MenuItem>
                                    ))}
                                 </Select>
                              </FormControl>
                           </Box>
                        </DialogContent>
                     );
                  })}
                  <div className='d-flex justify-content-end align-items-center'>
                     <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                     </DialogActions>
                     <DialogActions>
                        <Button onClick={onRequestBlood}>Gửi</Button>
                     </DialogActions>
                  </div>
               </>
            )}
         </Dialog>
      </React.Fragment>
   );
}
