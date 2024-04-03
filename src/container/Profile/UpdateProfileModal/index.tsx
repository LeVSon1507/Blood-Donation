import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import './styles.scss';
import {
   PRIMARY_COLOR,
   Role,
   User,
   getAllProvinces,
   getDistrictByCode,
   getListDistrictsByProvinceCode,
   getListWardsByDistrictCode,
   getProvinceByCode,
   getWardByCode,
   http,
   isEmpty,
   url_img,
} from 'src/utils';
import {
   Autocomplete,
   Card,
   CardActionArea,
   CardContent,
   CardMedia,
   DialogActions,
   DialogContent,
   FormControl,
   FormHelperText,
   Grid,
   InputLabel,
   MenuItem,
   Select,
   TextField,
} from '@mui/material';
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastSuccess } from 'src/utils/toastOptions';
import './styles.scss';
import DialogCommon from 'src/components/DialogCommon/DialogCommon';
import ava_default from 'src/assets/images/undraw_medicine_b-1-ol.svg';

const commonValidation = {
   email: Yup.string().nullable().required('Email là bắt buộc'),
   phoneNumber: Yup.string().nullable().required('SĐT là bắt buộc'),
   city: Yup.string().nullable().required('Thành phố là bắt buộc'),
   address: Yup.string().nullable().required('Địa chỉ là bắt buộc'),
   ward: Yup.string().nullable().required('Phường là bắt buộc'),
   district: Yup.string().nullable().required('Huyện là bắt buộc'),
};

const volunteerValidation = {
   cccd: Yup.string().nullable().required('CCCD là bắt buộc'),
   fullname: Yup.string().nullable().required('Họ và tên là bắt buộc'),
};

const hospitalValidation = {
   nameHospital: Yup.string().required('Tên Bệnh Viện là bắt buộc'),
};

const bloodBankValidation = {
   nameBloodbank: Yup.string().required('Tên Bệnh Viện là bắt buộc'),
};

interface Props {
   isOpen: boolean;
   onEditSuccess?: () => void;
   handleClose: () => void;
   user: User;
   setUserInfor?: React.Dispatch<React.SetStateAction<User>>;
}

const Transition = React.forwardRef(function Transition(
   props: TransitionProps & {
      children: React.ReactElement;
   },
   ref: React.Ref<unknown>
) {
   return <Slide direction='up' ref={ref} {...props} />;
});

const EditProfile = (props: Props) => {
   const { isOpen, handleClose, user } = props;
   const [isConfirm, setIsConfirm] = React.useState<boolean>(false);
   const currentUser = user || (JSON.parse(localStorage.getItem('currentUser')) as unknown as User);
   const formRef = React.useRef<FormikProps<User>>(null);
   const isHospital = currentUser?.role === Role.Hospital;
   const isVolunteer = currentUser?.role === Role.Volunteer;
   const isBloodBank = currentUser?.role === Role.BloodBank;

   const validationSchema = Yup.object().shape({
      ...commonValidation,
      ...(currentUser?.role === Role.Hospital && hospitalValidation),
      ...(currentUser?.role === Role.Volunteer && volunteerValidation),
      ...(currentUser?.role === Role.BloodBank && bloodBankValidation),
   });

   const handleUpdateProfile = () => {
      const updateData = {
         ...values,
         phoneNumber: `${values?.phoneNumber}`,
      };

      const endpoint = isBloodBank
         ? '/user/updateProfilebloodbank'
         : isHospital
         ? '/user/updateProfileHospital'
         : '/user/updateProfileVolunteer';

      http
         .put(endpoint, updateData)
         .then(res => {
            ToastSuccess('Update Profile Successfully');
            handleClose();
            localStorage.setItem('currentUser', JSON.stringify(updateData));
            window.location.reload();
         })
         .catch(err => {
            console.log(err?.message);
         });
   };

   const city = getProvinceByCode(currentUser?.city?.toString());
   const ward = getWardByCode(currentUser?.ward?.toString());
   const district = getDistrictByCode(currentUser?.district?.toString());

   const formik = useFormik({
      initialValues: {
         userId: currentUser?.userId,
         img: currentUser?.img ?? url_img,
         email: currentUser?.email,
         phoneNumber: currentUser?.phoneNumber,
         city: city?.code,
         ward: ward?.code,
         district: district?.code,
         role: currentUser?.role,
         address: currentUser?.address,
         birthdate: currentUser?.birthdate,
         gender: currentUser?.gender,
         fullname: currentUser?.fullname,
         cccd: currentUser?.cccd,
         nameHospital: currentUser?.hospitals?.nameHospital ?? '',
         nameBloodbank: currentUser?.bloodbank?.nameBloodbank ?? '',
      },
      validationSchema,
      innerRef: formRef,
      onSubmit: () => setIsConfirm(true),
   });

   const { errors, touched, getFieldProps, setFieldValue, dirty, values } = formik;

   const [listDistricts, setListDistricts] = React.useState([]);
   const [listWards, setListWards] = React.useState([]);

   React.useEffect(() => {
      setListDistricts(getListDistrictsByProvinceCode(values?.city));
      setFieldValue('district', null);
   }, [values?.city, setFieldValue]);

   React.useEffect(() => {
      setListWards(getListWardsByDistrictCode(values?.district));
      setFieldValue('ward', null);
   }, [values?.district, setFieldValue]);

   return (
      <React.Fragment>
         <Dialog
            fullScreen
            open={isOpen}
            onClose={handleClose}
            TransitionComponent={Transition}
            className='edit-profile-dialog'
         >
            <AppBar className='edit-profile-dialog__app-bar'>
               <Toolbar>
                  <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
                     <CloseIcon />
                  </IconButton>
                  <Typography
                     className='edit-profile-dialog__app-bar__title'
                     variant='h6'
                     component='div'
                  >
                     Cập nhật thông tin cá nhân
                  </Typography>
               </Toolbar>
            </AppBar>
            <Grid container className='edit-profile-dialog__grid'>
               <Grid item xs={8} className='edit-profile-dialog__grid__left'>
                  <DialogContent className='edit-profile-dialog__grid__left__dialog'>
                     {isVolunteer && (
                        <TextField
                           autoFocus
                           margin='dense'
                           id='Full Name'
                           className='edit-profile-dialog__grid__left__dialog__input'
                           {...getFieldProps('fullname')}
                           label='Tên Của Bạn'
                           type='text'
                           fullWidth
                           required
                           variant='outlined'
                           error={touched.fullname && Boolean(errors.fullname)}
                           helperText={
                              touched.fullname && errors.fullname ? (
                                 <Typography variant='caption' color='error'>
                                    {errors.fullname as string}
                                 </Typography>
                              ) : null
                           }
                        />
                     )}

                     {isHospital && (
                        <TextField
                           autoFocus
                           margin='dense'
                           id='Hospital Name'
                           className='edit-profile-dialog__grid__left__dialog__input'
                           {...getFieldProps('nameHospital')}
                           label='Tên Bệnh Viện'
                           type='text'
                           fullWidth
                           required
                           variant='outlined'
                           error={touched.nameHospital && Boolean(errors.nameHospital)}
                           helperText={
                              touched.nameHospital && errors.nameHospital ? (
                                 <Typography variant='caption' color='error'>
                                    {errors.nameHospital as string}
                                 </Typography>
                              ) : null
                           }
                        />
                     )}

                     {isBloodBank && (
                        <TextField
                           autoFocus
                           margin='dense'
                           id='Blood bank Name'
                           className='edit-profile-dialog__grid__left__dialog__input'
                           {...getFieldProps('nameBloodbank')}
                           label='Tên Bệnh Viện'
                           type='text'
                           fullWidth
                           required
                           variant='outlined'
                           error={touched.nameBloodbank && Boolean(errors.nameBloodbank)}
                           helperText={
                              touched.nameBloodbank && errors.nameBloodbank ? (
                                 <Typography variant='caption' color='error'>
                                    {errors.nameBloodbank as string}
                                 </Typography>
                              ) : null
                           }
                        />
                     )}

                     <TextField
                        autoFocus
                        disabled
                        margin='dense'
                        id='email'
                        {...getFieldProps('email')}
                        className='edit-profile-dialog__grid__left__dialog__input'
                        label='Email'
                        type='email'
                        fullWidth
                        required
                        variant='outlined'
                        error={touched.email && Boolean(errors.email)}
                        helperText={
                           touched.email && errors.email ? (
                              <Typography variant='caption' color='error'>
                                 {errors.email as string}
                              </Typography>
                           ) : null
                        }
                     />

                     {isVolunteer && (
                        <TextField
                           margin='dense'
                           id='cccd'
                           {...getFieldProps('cccd')}
                           required
                           className='edit-profile-dialog__grid__left__dialog__input'
                           label='Số Căn Cước Công Dân'
                           type='text'
                           fullWidth
                           variant='outlined'
                           error={touched.cccd && Boolean(errors.cccd)}
                           helperText={
                              touched.cccd && errors.cccd ? (
                                 <Typography variant='caption' color='error'>
                                    {errors.cccd as string}
                                 </Typography>
                              ) : null
                           }
                        />
                     )}

                     <TextField
                        autoFocus
                        margin='dense'
                        required
                        id='phoneNumber'
                        {...getFieldProps('phoneNumber')}
                        label='Số điện thoại'
                        className='edit-profile-dialog__grid__left__dialog__input'
                        type='text'
                        fullWidth
                        variant='outlined'
                        error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                        helperText={
                           touched.phoneNumber && errors.phoneNumber ? (
                              <Typography variant='caption' color='error'>
                                 {errors.phoneNumber as string}
                              </Typography>
                           ) : null
                        }
                     />

                     {isVolunteer && (
                        <TextField
                           id='birthdate'
                           type='date'
                           label='Ngày sinh'
                           {...getFieldProps('birthdate')}
                           InputLabelProps={{
                              shrink: true,
                              htmlFor: 'birthdate',
                           }}
                           inputProps={{
                              ...getFieldProps('birthdate'),
                              max: new Date().toISOString().split('T')[0],
                           }}
                           error={touched.birthdate && Boolean(errors.birthdate)}
                           helperText={
                              touched.birthdate && errors.birthdate ? (
                                 <Typography variant='caption' color='error'>
                                    {errors.birthdate as string}
                                 </Typography>
                              ) : null
                           }
                           className='edit-profile-dialog__grid__left__dialog__input-date'
                        />
                     )}

                     <Grid xs={12} mb={2} gap={1}>
                        {isVolunteer && (
                           <FormControl
                              fullWidth
                              variant='outlined'
                              className='edit-profile-dialog__grid__left__dialog__input'
                              error={touched.gender && Boolean(errors.gender)}
                           >
                              <InputLabel htmlFor='gender'>Giới tính</InputLabel>
                              <Select id='gender' {...getFieldProps('gender')} label='Gender'>
                                 <MenuItem value={0}>Male</MenuItem>
                                 <MenuItem value={1}>Female</MenuItem>
                              </Select>
                              {touched.gender && errors.gender ? (
                                 <FormHelperText variant='outlined' color='error'>
                                    {errors.gender as string}
                                 </FormHelperText>
                              ) : null}
                           </FormControl>
                        )}
                     </Grid>

                     <Grid xs={12} mb={2} gap={1}>
                        <Autocomplete
                           disablePortal
                           options={getAllProvinces()}
                           isOptionEqualToValue={({ value }, { value: _value }) => {
                              return value === _value;
                           }}
                           renderInput={params => (
                              <TextField {...params} variant='outlined' label='City' />
                           )}
                           {...getFieldProps('city')}
                           onChange={(_, option: any) => {
                              setFieldValue('city', option?.value);
                              setListDistricts(getListDistrictsByProvinceCode(option?.value));
                           }}
                           value={
                              values?.city
                                 ? getAllProvinces().find(i => i.value === values?.city?.toString())
                                 : null
                           }
                        />
                        {touched.city && errors.city ? (
                           <Typography variant='caption' color='error'>
                              {errors.city as string}
                           </Typography>
                        ) : null}
                     </Grid>
                     <Grid xs={12} mb={2} gap={1}>
                        <Autocomplete
                           disablePortal
                           options={listDistricts}
                           isOptionEqualToValue={({ value }, { value: _value }) => value === _value}
                           renderInput={params => (
                              <TextField {...params} variant='outlined' label='District' />
                           )}
                           {...getFieldProps('district')}
                           onChange={(_, option) => {
                              setFieldValue('district', option?.value);
                              setListWards(getListWardsByDistrictCode(option?.value));
                           }}
                           value={
                              values?.district
                                 ? listDistricts.find(i => i.value === values?.district?.toString())
                                 : null
                           }
                        />
                        {touched.district && errors.district ? (
                           <Typography variant='caption' color='error'>
                              {errors.district as string}
                           </Typography>
                        ) : null}
                     </Grid>
                     <Grid xs={12} mb={2} gap={1}>
                        <Autocomplete
                           disablePortal
                           options={listWards}
                           isOptionEqualToValue={({ value }, { value: _value }) => value === _value}
                           renderInput={params => (
                              <TextField {...params} variant='outlined' label='Ward' />
                           )}
                           {...getFieldProps('ward')}
                           onChange={(_, option) => {
                              setFieldValue('ward', option?.value);
                           }}
                           value={
                              values?.ward
                                 ? listWards.find(i => i.value === values?.ward?.toString())
                                 : null
                           }
                        />
                        {touched.ward && errors.ward ? (
                           <Typography variant='caption' color='error'>
                              {errors.ward as string}
                           </Typography>
                        ) : null}
                     </Grid>
                     <Grid xs={12} mb={2} gap={1}>
                        <TextField
                           fullWidth
                           variant='outlined'
                           type='text'
                           label='Address'
                           name='address'
                           placeholder='Enter your address'
                           {...getFieldProps('address')}
                        />
                     </Grid>
                  </DialogContent>
                  <DialogActions className='dialog-actions'>
                     <Button
                        variant='outlined'
                        sx={{ color: PRIMARY_COLOR, border: '1px solid #811315' }}
                        onClick={handleClose}
                     >
                        Cancel
                     </Button>
                     <Button
                        variant='outlined'
                        sx={{ color: PRIMARY_COLOR, border: '1px solid #811315' }}
                        onClick={handleUpdateProfile}
                        disabled={!dirty || !isEmpty(errors)}
                     >
                        Update
                     </Button>
                  </DialogActions>
               </Grid>
               <Grid item xs={3} className='edit-profile-dialog__grid__right'>
                  <Card className='edit-profile-dialog__grid__right__card'>
                     <CardActionArea className='edit-profile-dialog__grid__right__card__action-area'>
                        <CardMedia
                           component='img'
                           image={ava_default}
                           alt='green iguana'
                           className='edit-profile-dialog__grid__right__card__action-area__img'
                        />
                        <CardContent
                           sx={{
                              justifyContent: 'center',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                           }}
                        >
                           <Typography
                              className='edit-profile-dialog__grid__right__card__action-area__text'
                              variant='h5'
                              component='div'
                           >
                              {values?.fullname}
                           </Typography>
                           <Typography
                              className='edit-profile-dialog__grid__right__card__action-area__text'
                              variant='body1'
                              color='text.secondary'
                           >
                              Email: {values?.email || 'XXXXXXXX'}
                           </Typography>
                           <Typography
                              className='edit-profile-dialog__grid__right__card__action-area__text'
                              variant='body2'
                              color='text.secondary'
                           >
                              SĐT: {values?.phoneNumber || 'Update your bio'}
                           </Typography>
                           {isVolunteer && (
                              <Typography
                                 className='edit-profile-dialog__grid__right__card__action-area__text'
                                 variant='body2'
                                 sx={{ mb: 1 }}
                                 color='text.secondary'
                              >
                                 Ngày sinh: {values?.birthdate || 'Update your bio'}
                              </Typography>
                           )}
                        </CardContent>
                     </CardActionArea>
                  </Card>
               </Grid>
            </Grid>
            <DialogCommon
               open={isConfirm}
               onClose={() => setIsConfirm(false)}
               content={'Bạn có xác nhận thông tin chính xác không?'}
               onConfirm={handleUpdateProfile}
            />
         </Dialog>
      </React.Fragment>
   );
};
export default EditProfile;
