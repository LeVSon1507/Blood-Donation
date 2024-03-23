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
import { API_KEY, User, token, url_img } from 'src/utils';
import {
   Card,
   CardActionArea,
   CardContent,
   CardMedia,
   DialogActions,
   DialogContent,
   DialogContentText,
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
import { ToastError, ToastInfo, ToastSuccess } from 'src/utils/toastOptions';
import './styles.scss';
import axios from 'axios';
import DialogCommon from 'src/components/DialogCommon/DialogCommon';

const validationSchema = Yup.object({
   email: Yup.string().nullable().required('Email là bắt buộc'),
   fullname: Yup.string().nullable().required('Họ và tên là bắt buộc'),
   cccd: Yup.string().nullable().required('CCCD là bắt buộc'),
});

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
   const { isOpen, handleClose, user, setUserInfor } = props;
   const [isConfirm, setIsConfirm] = React.useState<boolean>(false);

   const formRef = React.useRef<FormikProps<any>>(null);

   const handleUpdateProfile = () => {
      return ToastInfo(
         'Chức năng không đang trong quá trình phát triển, xin lỗi vì sự bất tiên này!'
      );
      const updateData = values;

      axios
         .put<{ data: User }>(`${API_KEY}/user/updateProfileVolunteer`, updateData, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then(res => {
            ToastSuccess('Update Profile Successfully');
            handleClose();
            setUserInfor(res.data.data);
         })
         .catch(err => {
            console.log(err?.message);
            ToastError('Update Profile Fail!');
         });
   };

   const formik = useFormik({
      initialValues: {
         userId: user?.userId,
         img: user?.img,
         email: user?.email,
         phoneNumber: user?.phoneNumber,
         city: user?.city,
         ward: user?.ward,
         district: user?.district,
         address: user?.address,
         birthdate: user?.volunteers?.birthDate,
         gender: user?.volunteers?.gender,
         fullname: user?.volunteers?.fullname,
         cccd: user?.volunteers?.cccd,
      },
      validationSchema,
      innerRef: formRef,
      onSubmit: () => setIsConfirm(true),
   });

   const { errors, touched, getFieldProps, dirty, values } = formik;

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
                     Edit General Information
                  </Typography>
               </Toolbar>
            </AppBar>
            <Grid container className='edit-profile-dialog__grid'>
               <Grid item xs={8} className='edit-profile-dialog__grid__left'>
                  <DialogContent className='edit-profile-dialog__grid__left__dialog'>
                     <DialogContentText className='post-label'>
                        Edit User Profile:
                     </DialogContentText>

                     <TextField
                        autoFocus
                        margin='dense'
                        id='Full Name'
                        className='edit-profile-dialog__grid__left__dialog__input'
                        {...getFieldProps('fullname')}
                        label='Họ và tên'
                        type='text'
                        fullWidth
                        required
                        variant='outlined'
                        error={touched.fullName && Boolean(errors.fullName)}
                        helperText={
                           touched.fullName && errors.fullName ? (
                              <Typography variant='caption' color='error'>
                                 {errors.fullName as string}
                              </Typography>
                           ) : null
                        }
                     />

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

                     <TextField
                        autoFocus
                        margin='dense'
                        id='cccd'
                        {...getFieldProps('cccd')}
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

                     <TextField
                        autoFocus
                        margin='dense'
                        id='phoneNumber'
                        {...getFieldProps('phoneNumber')}
                        label='Số điện thoại'
                        className='edit-profile-dialog__grid__left__dialog__input'
                        type='number'
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

                     <TextField
                        autoFocus
                        margin='dense'
                        className='edit-profile-dialog__grid__left__dialog__input'
                        id='city'
                        {...getFieldProps('city')}
                        label='Thành Phố'
                        type='text'
                        fullWidth
                        variant='outlined'
                        error={touched.city && Boolean(errors.city)}
                        helperText={
                           touched.city && errors.city ? (
                              <Typography variant='caption' color='error'>
                                 {errors.city as string}
                              </Typography>
                           ) : null
                        }
                     />

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

                     <TextField
                        autoFocus
                        margin='dense'
                        id='address'
                        {...getFieldProps('address')}
                        className='edit-profile-dialog__grid__left__dialog__input'
                        label='Địa chỉ'
                        type='text'
                        fullWidth
                        variant='outlined'
                        error={touched.address && Boolean(errors.address)}
                        helperText={
                           touched.address && errors.address ? (
                              <Typography variant='caption' color='error'>
                                 {errors.address as string}
                              </Typography>
                           ) : null
                        }
                     />
                  </DialogContent>
                  <DialogActions className='dialog-actions'>
                     <Button onClick={handleClose}>Cancel</Button>
                     <Button onClick={handleUpdateProfile} disabled={!dirty}>
                        Update
                     </Button>
                  </DialogActions>
               </Grid>
               <Grid item xs={3} className='edit-profile-dialog__grid__right'>
                  <Card className='edit-profile-dialog__grid__right__card'>
                     <CardActionArea className='edit-profile-dialog__grid__right__card__action-area'>
                        <CardMedia
                           component='img'
                           image={url_img}
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
                              {values?.username}
                           </Typography>
                           <Typography
                              className='edit-profile-dialog__grid__right__card__action-area__text'
                              variant='body1'
                              color='text.secondary'
                           >
                              {values?.fullName || 'XXXXXXXX'}
                           </Typography>
                           <Typography
                              className='edit-profile-dialog__grid__right__card__action-area__text'
                              variant='body2'
                              sx={{ mb: 1 }}
                              color='text.secondary'
                           >
                              {values?.bio || 'Update your bio'}
                           </Typography>
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
