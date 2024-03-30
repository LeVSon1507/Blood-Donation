import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BloodBankForm, schema } from './helpers';
import {
   getAllProvinces,
   getListDistrictsByProvinceCode,
   getListWardsByDistrictCode,
   http,
} from 'src/utils';
import Button from 'src/components/Button';
import { toast } from 'react-toastify';

const CreateEditBloodBank: React.FC = () => {
   const [isAdding, setIsAdding] = useState(false);
   const [listDistricts, setListDistricts] = useState([]);
   const [listWards, setListWards] = useState([]);

   const {
      handleSubmit,
      register,
      setValue,
      reset,
      formState: { errors },
      watch,
   } = useForm<BloodBankForm>({
      resolver: yupResolver<any>(schema),
      mode: 'onChange',
      defaultValues: {
         nameBloodbank: '',
         email: '',
         password: '',
         phoneNumber: '',
         city: '',
         district: '',
         address: '',
         ward: '',
      },
   });

   const onSubmit = value => {
      setIsAdding(true);
      const payload = { ...value, img: '' };
      http
         .post('admin/createbloodbank', payload)
         .then(res => {
            toast.success('success');
            setIsAdding(false);
            reset({
               nameBloodbank: '',
               email: '',
               password: '',
               phoneNumber: '',
               city: '',
               district: '',
               address: '',
               ward: '',
            });
         })
         .catch(err => {
            setIsAdding(false);
            console.error('err', err);
         });
   };

   const watchCity = watch('city');
   const watchDistrict = watch('district');

   useEffect(() => {
      setListDistricts(getListDistrictsByProvinceCode(watchCity));
      setValue('district', null);
   }, [watchCity, setValue]);

   useEffect(() => {
      setListWards(getListWardsByDistrictCode(watchDistrict));
      setValue('ward', null);
   }, [watchDistrict, setValue]);

   return (
      <div className='w-full px-8 pt-6'>
         <h2>Create Blood Bank</h2>
         <div className='w-full pt-4'>
            <form className='max-w-[600px]' onSubmit={handleSubmit(onSubmit)}>
               <Grid xs={12}>
                  <Grid xs={6} mb={2} gap={1}>
                     <TextField
                        fullWidth
                        variant='standard'
                        type='text'
                        label='Name'
                        name='nameBloodbank'
                        placeholder='Enter your name'
                        {...register('nameBloodbank')}
                     />
                     {errors.nameBloodbank && (
                        <p className='text-sm text-red-500 color-red'>
                           {errors.nameBloodbank.message}
                        </p>
                     )}
                  </Grid>
                  <Grid xs={6} mb={2} gap={1}>
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
                  <Grid xs={6} mb={2} gap={1}>
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
                        <p className='text-sm text-red-500 color-red'>{errors.password.message}</p>
                     )}
                  </Grid>
                  <Grid xs={6} mb={2} gap={1}>
                     <TextField
                        fullWidth
                        variant='standard'
                        type='text'
                        label='Phone Number'
                        name='phoneNumber'
                        placeholder='Enter your phone number'
                        {...register('phoneNumber')}
                     />
                     {errors.password && (
                        <p className='text-sm text-red-500 color-red'>{errors.password.message}</p>
                     )}
                  </Grid>
                  <Grid xs={6} mb={2} gap={1}>
                     <Autocomplete
                        disablePortal
                        options={getAllProvinces()}
                        isOptionEqualToValue={({ value }, { value: _value }) => value === _value}
                        renderInput={params => (
                           <TextField {...params} variant='standard' label='City' />
                        )}
                        {...register('city')}
                        onChange={(_, option) => {
                           setValue('city', option?.value);
                        }}
                     />
                  </Grid>
                  <Grid xs={6} mb={2} gap={1}>
                     <Autocomplete
                        disablePortal
                        options={listDistricts}
                        isOptionEqualToValue={({ value }, { value: _value }) => value === _value}
                        renderInput={params => (
                           <TextField {...params} variant='standard' label='District' />
                        )}
                        {...register('district')}
                        onChange={(_, option) => {
                           setValue('district', option?.value);
                        }}
                     />
                  </Grid>
                  <Grid xs={6} mb={2} gap={1}>
                     <Autocomplete
                        disablePortal
                        options={listWards}
                        isOptionEqualToValue={({ value }, { value: _value }) => value === _value}
                        renderInput={params => (
                           <TextField {...params} variant='standard' label='Ward' />
                        )}
                        {...register('ward')}
                        onChange={(_, option) => {
                           setValue('ward', option?.value);
                        }}
                     />
                  </Grid>
                  <Grid xs={6} mb={2} gap={1}>
                     <TextField
                        fullWidth
                        variant='standard'
                        type='text'
                        label='Address'
                        name='address'
                        placeholder='Enter your address'
                        {...register('address')}
                     />
                  </Grid>
               </Grid>
               <Button type='submit' isLoading={isAdding}>
                  Submit
               </Button>
            </form>
         </div>
      </div>
   );
};

export default CreateEditBloodBank;
