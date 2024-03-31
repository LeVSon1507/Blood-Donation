import {
   Box,
   Button,
   Chip,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Divider,
   Typography,
} from '@mui/material';
import React from 'react';
import LoadingCommon from 'src/components/LoadingCircle';
import { NotificationStatus, PRIMARY_COLOR, formatDateTime, getCurrentUser, http } from 'src/utils';

const NotificationList = ({ open, setOpen, data }) => {
   const [isLoading, setIsLoading] = React.useState<boolean>(false);
   const currentUser = getCurrentUser();
   const handleClose = () => {
      setOpen(false);
   };

   const handleMaskRead = () => {
      setIsLoading(true);
      http
         .post(`volunteer/updatestatusnotification?userid=${currentUser.userId}`, null)
         .then(res => {
            setIsLoading(false);
         })
         .catch(err => {
            setIsLoading(false);
            console.log(err);
         });
   };

   if (isLoading) return <LoadingCommon />;

   return (
      <Dialog maxWidth='sm' fullWidth sx={{}} open={open} onClose={handleClose}>
         <Box className='d-flex justify-content-between align-items-center'>
            <DialogTitle>Thông báo</DialogTitle>
            <Button
               variant='text'
               sx={{ color: PRIMARY_COLOR }}
               onClick={handleMaskRead}
               className='p-2 '
            >
               Đánh dấu đã đọc!
            </Button>
         </Box>
         <DialogContent>
            {data?.map((item, index) => {
               return (
                  <Box key={index} className='my-2 border p-2 rounded'>
                     <p className='my-1'> Thời gian : {formatDateTime(item?.datepost)}</p>
                     <Typography variant='body2' className='my-2'>
                        {item?.content}
                     </Typography>
                     <div className='mt-auto'>
                        <Chip
                           label={item?.status === NotificationStatus.READ ? 'Đã đọc' : 'Chưa đọc'}
                           color={item?.status === NotificationStatus.READ ? 'success' : 'warning'}
                        />
                     </div>
                     <Divider className='my-2' />
                  </Box>
               );
            })}
         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose}>Đóng</Button>
         </DialogActions>
      </Dialog>
   );
};

export default NotificationList;
