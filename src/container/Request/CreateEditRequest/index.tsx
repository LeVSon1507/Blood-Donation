import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RequestForm, schema } from './helpers';
import {
   getAllProvinces,
   getListDistrictsByProvinceCode,
   getListWardsByDistrictCode,
   http,
   url_img,
} from 'src/utils';
import Button from 'src/components/Button';
import { toast } from 'react-toastify';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import { useParams } from 'react-router-dom';
import LoadingCommon from 'src/components/LoadingCircle';

type Props = {};

const CreateEditRequest: React.FC<Props> = () => {
   const [isAdding, setIsAdding] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [listDistricts, setListDistricts] = useState([]);
   const [listWards, setListWards] = useState([]);

   const { id } = useParams<{ id: string }>();

   const {
      handleSubmit,
      register,
      setValue,
      control,
      reset,
      formState: { errors },
      watch,
   } = useForm<RequestForm>({
      resolver: yupResolver<any>(schema),
      mode: 'onChange',
      defaultValues: {
         requestDate: '',
         quantity: '',
         contact: '',
         starttime: '',
         endtime: '',
         img: url_img,
         city: '',
         ward: '',
         district: '',
         address: '',
      },
   });

   useEffect(() => {
      if (!!id) {
         setIsLoading(true);
         http
            .get(`Hopital/getRequestbyid?id=${id}`)
            .then(res => {
               const data = res?.data?.data;
               reset({
                  requestDate: data?.requestDate || '',
                  quantity: data?.quantity || '',
                  contact: data?.contact || '',
                  starttime: data?.starttime || '',
                  endtime: data?.endtime || '',
                  city: data?.city || '',
                  ward: data?.ward || '',
                  district: data?.district || '',
                  address: data?.address || '',
               });
            })
            .catch(err => {
               setIsLoading(false);
               console.error('err', err);
            });
      }
   }, [id, reset]);

   const onSubmit = value => {
      setIsAdding(true);
      const hospitalId = JSON.parse(localStorage.getItem('currentUser'))?.userId;

      const payload = { ...value, hospitalid: hospitalId, img: '' };

      if (!!id) {
         http
            .put('Hopital/updaterequest', { ...payload, requestid: +id })
            .then(res => {
               toast.success('success');
               setIsAdding(false);
            })
            .catch(err => {
               setIsAdding(false);
               console.error('err', err);
            });
      } else {
         http
            .post('Hopital/AddRequest', payload)
            .then(res => {
               toast.success('success');
               setIsAdding(false);
               reset({
                  requestDate: '',
                  quantity: '',
                  contact: '',
                  starttime: '',
                  endtime: '',
                  city: '',
                  ward: '',
                  district: '',
                  address: '',
               });
            })
            .catch(err => {
               setIsAdding(false);
               console.error('err', err);
            });
      }
   };

   const watchCity = watch('city');
   const watchDistrict = watch('district');
   const watchWard = watch('ward');
   const watchRequestDate = watch('requestDate');

   useEffect(() => {
      setListDistricts(getListDistrictsByProvinceCode(watchCity));
   }, [watchCity, setValue]);

   useEffect(() => {
      setListWards(getListWardsByDistrictCode(watchDistrict));
   }, [watchDistrict, setValue]);

   return isLoading ? (
      <LoadingCommon additionalClass='h-[100vh]' />
   ) : (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <div className='w-full px-8 pt-6'>
            <h2>{!!id ? 'Cập Nhật Yêu Cầu' : 'Thêm Yêu Cầu'}</h2>
            <div className='w-full pt-4'>
               <form className='max-w-[600px]' onSubmit={handleSubmit(onSubmit)}>
                  <Grid xs={12}>
                     <Grid xs={10} mb={2} gap={1}>
                        <Controller
                           control={control}
                           name='requestDate'
                           render={({ field: { onChange, value, ...fields } }) => {
                              return (
                                 <>
                                    <DemoItem label='Request date'>
                                       <DatePicker
                                          onChange={(e: Dayjs) => {
                                             onChange(e.toISOString());
                                          }}
                                          value={dayjs(watchRequestDate)}
                                          {...fields}
                                       />
                                    </DemoItem>
                                    {errors.requestDate && (
                                       <p className='text-sm text-red-500 color-red'>
                                          {errors.requestDate.message}
                                       </p>
                                    )}
                                 </>
                              );
                           }}
                        />
                     </Grid>
                     <Grid xs={6} mb={2} gap={1}>
                        <TextField
                           fullWidth
                           variant='outlined'
                           InputLabelProps={{
                              shrink: true,
                           }}
                           type='number'
                           label='Quantity'
                           name='quantity'
                           placeholder='Enter your quantity'
                           {...register('quantity')}
                        />
                        {errors.quantity && (
                           <p className='text-sm text-red-500 color-red'>
                              {errors.quantity.message}
                           </p>
                        )}
                     </Grid>
                     <Grid xs={6} mb={2} gap={1}>
                        <TextField
                           fullWidth
                           variant='outlined'
                           type='text'
                           InputLabelProps={{
                              shrink: true,
                           }}
                           label='Contact'
                           name='contact'
                           placeholder='Enter your contact'
                           {...register('contact')}
                        />
                        {errors.contact && (
                           <p className='text-sm text-red-500 color-red'>
                              {errors.contact.message}
                           </p>
                        )}
                     </Grid>
                     <Grid container xs={12}>
                        <Grid item xs={6} mb={2} gap={1}>
                           <Controller
                              control={control}
                              name='starttime'
                              render={({ field: { onChange, value, ...fields } }) => {
                                 return (
                                    <>
                                       <TimePicker
                                          label='Start Time'
                                          name='starttime'
                                          onChange={(e: Dayjs) => {
                                             onChange(e.toISOString());
                                          }}
                                          value={dayjs(value)}
                                          {...fields}
                                       />

                                       {errors.starttime && (
                                          <p className='text-sm text-red-500 color-red'>
                                             {errors.starttime.message}
                                          </p>
                                       )}
                                    </>
                                 );
                              }}
                           />
                        </Grid>
                        <Grid xs={6} mb={2} gap={1} item>
                           <Controller
                              control={control}
                              name='endtime'
                              render={({ field: { onChange, value, ...fields } }) => {
                                 return (
                                    <>
                                       <TimePicker
                                          label='Start Time'
                                          name='endtime'
                                          onChange={(e: Dayjs) => {
                                             onChange(e.toISOString());
                                          }}
                                          value={dayjs(value)}
                                          {...fields}
                                       />

                                       {errors.endtime && (
                                          <p className='text-sm text-red-500 color-red'>
                                             {errors.endtime.message}
                                          </p>
                                       )}
                                    </>
                                 );
                              }}
                           />
                        </Grid>
                     </Grid>

                     <Grid xs={10} mb={2} gap={1}>
                        <Controller
                           control={control}
                           name='city'
                           render={({ field: { onChange, value, ...fields } }) => {
                              return (
                                 <>
                                    <Autocomplete
                                       disablePortal
                                       options={getAllProvinces()}
                                       isOptionEqualToValue={({ value }, { value: _value }) => {
                                          return value === _value;
                                       }}
                                       renderInput={params => (
                                          <TextField {...params} variant='outlined' label='City' />
                                       )}
                                       {...fields}
                                       onChange={(_, option) => {
                                          onChange(option?.value);
                                          setValue('district', '');
                                          setValue('ward', '');
                                       }}
                                       value={
                                          watchCity
                                             ? getAllProvinces().find(i => i.value === watchCity) ||
                                               null
                                             : null
                                       }
                                    />
                                 </>
                              );
                           }}
                        />
                     </Grid>
                     <Grid xs={10} mb={2} gap={1}>
                        <Controller
                           control={control}
                           name='district'
                           render={({ field: { onChange, value, ...fields } }) => {
                              return (
                                 <Autocomplete
                                    disablePortal
                                    options={listDistricts}
                                    isOptionEqualToValue={({ value }, { value: _value }) =>
                                       value === _value
                                    }
                                    renderInput={params => (
                                       <TextField {...params} variant='outlined' label='District' />
                                    )}
                                    {...fields}
                                    onChange={(_, option) => {
                                       onChange(option?.value);
                                       setValue('ward', '');
                                    }}
                                    value={
                                       watchDistrict
                                          ? listDistricts.find(i => i.value === watchDistrict)
                                          : null
                                    }
                                 />
                              );
                           }}
                        />
                     </Grid>
                     <Grid xs={10} mb={2} gap={1}>
                        <Controller
                           control={control}
                           name='ward'
                           render={({ field: { onChange, value, ...fields } }) => {
                              return (
                                 <Autocomplete
                                    disablePortal
                                    options={listWards}
                                    isOptionEqualToValue={({ value }, { value: _value }) =>
                                       value === _value
                                    }
                                    renderInput={params => {
                                       return (
                                          <TextField {...params} variant='outlined' label='Ward' />
                                       );
                                    }}
                                    {...fields}
                                    onChange={(_, option) => {
                                       onChange(option?.value);
                                    }}
                                    value={
                                       watchWard ? listWards.find(i => i.value === watchWard) : null
                                    }
                                 />
                              );
                           }}
                        />
                     </Grid>
                     <Grid xs={10} mb={2} gap={1}>
                        <TextField
                           fullWidth
                           variant='outlined'
                           type='text'
                           label='Address'
                           name='address'
                           InputLabelProps={{
                              shrink: true,
                           }}
                           placeholder='Enter your address'
                           {...register('address')}
                        />
                     </Grid>
                  </Grid>
                  <Button type='submit' isLoading={isAdding}>
                     {!!id ? 'Cập nhật' : 'Tạo'}
                  </Button>
               </form>
            </div>
         </div>
      </LocalizationProvider>
   );
};

export default CreateEditRequest;
