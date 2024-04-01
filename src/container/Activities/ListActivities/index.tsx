import React, { useEffect, useState } from 'react';
import { Role, formatDate, getCurrentUser, http } from 'src/utils';
import LoadingCommon from 'src/components/LoadingCircle';
import { Box, Button, Grid, Typography } from '@mui/material';
import { ToastSuccess } from 'src/utils/toastOptions';

type Image = {
   imgId: number;
   activateid: number;
   img: string;
   activate: string;
};

type Activate = {
   activateid: number;
   nameActivate: string;
   datepost: string;
   images: Image[];
};

const ListActivities = () => {
   const currentUser = getCurrentUser();

   const [activitiesList, setActivitiesList] = useState<Activate[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [isReload, setIsReload] = useState<boolean>(false);

   useEffect(() => {
      setIsLoading(true);
      http
         .get(`admin/listactive`)
         .then(res => {
            setActivitiesList(res?.data?.data || []);
            setIsLoading(false);
         })
         .catch(err => {
            setIsLoading(false);
            console.error('err', err);
         });
   }, [currentUser?.userId, isReload]);

   const handleDeleteActive = (activeId: any) => {
      http
         .delete(`admin/deleteactive?id=${activeId}`, null)
         .then(res => {
            ToastSuccess('Xóa hoạt động thành công!');
            setIsReload(!isReload);
            setIsLoading(false);
         })
         .catch(err => {
            setIsLoading(false);
            setIsReload(!isReload);
            console.error('err', err);
         });
   };

   return (
      <>
         {isLoading ? (
            <LoadingCommon additionalClass='h-[100vh]' />
         ) : (
            <Box className='container'>
               <Box className='m-3'>
                  <Typography variant='h6'>Danh sách hoạt động</Typography>
                  <Grid container xs={12}>
                     {activitiesList.map(item => {
                        return (
                           <Grid
                              item
                              xs={4}
                              gap={1}
                              key={item?.activateid}
                              className='w-full border border-gray-300 p-4 mt-2 rounded'
                           >
                              {currentUser?.role === Role.Admin && (
                                 <Button
                                    variant='outlined'
                                    onClick={() => handleDeleteActive(item?.activateid)}
                                    className='mt-2'
                                 >
                                    Xoá hoạt động
                                 </Button>
                              )}
                              <Typography variant='h6'>Hoạt động: {item?.nameActivate} </Typography>
                              <Typography variant='body2'>
                                 Tổ chức ngày: {formatDate(item?.datepost)}
                              </Typography>
                              <Grid container xs={12}>
                                 {item?.images.map(img => {
                                    return (
                                       <Grid item xs={4} key={img?.imgId} className='w-full'>
                                          <img
                                             src={
                                                img?.img ||
                                                'https://edutalk.edu.vn/_nuxt/assets/images/default.jpg'
                                             }
                                             loading='lazy'
                                             width={200}
                                             height={200}
                                             alt={img?.imgId?.toString()}
                                             key={img?.imgId}
                                             className='w-full mt-2 rounded p-2'
                                          />
                                       </Grid>
                                    );
                                 })}
                              </Grid>
                           </Grid>
                        );
                     })}
                  </Grid>
               </Box>
            </Box>
         )}
      </>
   );
};

export default ListActivities;
