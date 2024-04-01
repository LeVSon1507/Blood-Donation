import React, { useState } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingCommon from 'src/components/LoadingCircle';
import { useFieldArray, useForm } from 'react-hook-form';
import { Role, getCurrentUser, http, isEmpty } from 'src/utils';
import { Button, Grid, TextField, Tooltip, Typography } from '@mui/material';
import { IoCloseCircle } from 'react-icons/io5';
import { FaSave } from 'react-icons/fa';
import { schema } from './helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastInfo, ToastSuccess } from 'src/utils/toastOptions';

function AddActiveForm() {
   const currentUser = getCurrentUser();
   const isAdmin = currentUser?.role === Role.Admin;

   const {
      watch,
      register,
      setValue,
      reset,
      control,
      formState: { errors },
   } = useForm<any>({
      resolver: yupResolver<any>(schema),
      mode: 'onChange',
      defaultValues: {
         nameActivate: '',
         aImgs: [
            {
               Img: '',
            },
         ],
      },
   });

   const { fields, append, remove } = useFieldArray<any>({
      control,
      name: 'aImgs',
   });

   const [isLoading, setIsLoading] = useState<boolean>(false);

   const handleAddActive = async () => {
      if (isEmpty(watch('nameActivate'))) return ToastInfo('Tên hoạt động là bắt buộc!');
      if (fields?.map((i: any) => i.Img).includes(''))
         return ToastInfo('Không được để trống URL ảnh!');

      setIsLoading(true);
      const data = {
         nameActivate: watch('nameActivate'),
         aImgs: watch('aImgs'),
      };
      http
         .post(`admin/addactive`, data)
         .then(res => {
            ToastSuccess('Thêm hoạt động thành công!');
            reset({
               nameActivate: '',
               aImgs: [
                  {
                     Img: '',
                  },
               ],
            });
            setIsLoading(false);
         })
         .catch(err => {
            console.log(err);
            setIsLoading(false);
         });
   };

   return isLoading ? (
      <LoadingCommon additionalClass='h-[100vh]' />
   ) : !isAdmin ? (
      <Typography align='center' color='error' justifyContent={'center'} p={2} m={2} variant='h1'>
         Bạn không phải admin!
      </Typography>
   ) : (
      <div>
         <div className='container bootstrap snippets bootdey'>
            <div className='row'>
               <div className='col-xs-12 col-sm-12 col-md-6 col-md-offset-2'>
                  <div className='panel panel-info'>
                     <div className='panel-heading'>
                        <h3 className='panel-title'>
                           <span className='glyphicon glyphicon-th'></span>
                           Thêm buổi hoạt động
                        </h3>
                     </div>
                     <div className='panel-body'>
                        <div className='row'>
                           <div className='col-xs-6 col-sm-6 col-md-6 separator social-login-box'>
                              <br />
                              <Grid container xs={12}>
                                 {fields.map((item: any, index) => {
                                    return (
                                       <Grid
                                          item
                                          xs={6}
                                          key={index}
                                          onClick={fields?.length > 1 ? () => remove(index) : null}
                                       >
                                          <div className='d-flex justify-content-between align-items-center mb-3'>
                                             <Tooltip title='Click để xóa ảnh'>
                                                <img
                                                   alt={index.toString()}
                                                   className='img-thumbnail cursor-pointer w-[100px] h-[100px]'
                                                   src={
                                                      (item?.Img as unknown as string) ||
                                                      'https://edutalk.edu.vn/_nuxt/assets/images/default.jpg'
                                                   }
                                                />
                                             </Tooltip>
                                          </div>
                                       </Grid>
                                    );
                                 })}
                              </Grid>
                           </div>
                           <div className='col-xs-6 col-sm-6 col-md-6 login-box'>
                              <div className='form-group'>
                                 <div className='input-group'>
                                    <div className='input-group-addon'>
                                       <span className='glyphicon glyphicon-lock'></span>
                                    </div>
                                    <TextField
                                       fullWidth
                                       label='Tên hoạt động'
                                       onChange={e => setValue('nameActivate', e.target.value)}
                                       required
                                       placeholder='Tên hoạt động'
                                       variant='outlined'
                                    />
                                    {errors?.nameActivate && (
                                       <p className='text-red-500'>
                                          {errors?.nameActivate?.message as any}
                                       </p>
                                    )}
                                 </div>
                              </div>
                              <div className='form-group'>
                                 <div className='input-group'>
                                    <div className='input-group-addon'>
                                       <span className='glyphicon glyphicon-log-in'></span>
                                       <Typography variant='body2'>
                                          Nhập url ảnh buổi hoạt động
                                       </Typography>
                                    </div>
                                    <div>
                                       {fields.map((item, index) => {
                                          return (
                                             <div className='d-flex justify-content-between align-items-center'>
                                                <TextField
                                                   className='my-2'
                                                   fullWidth
                                                   key={item.id}
                                                   label={`URL hình ảnh ${index + 1}`}
                                                   placeholder={`Nhập URL hình ảnh ${index + 1}`}
                                                   variant='outlined'
                                                   {...register(`aImgs.${index}.Img`)}
                                                />
                                                {fields?.length > 1 && (
                                                   <IoCloseCircle
                                                      size={26}
                                                      className='cursor-pointer ml-2'
                                                      onClick={() => remove(index)}
                                                   />
                                                )}
                                             </div>
                                          );
                                       })}

                                       <Button
                                          variant='contained'
                                          onClick={() => append({ Img: '' })}
                                          type='button'
                                       >
                                          Thêm ảnh
                                       </Button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className='panel-footer'>
                        <div className='row'>
                           <div className='col-xs-6 col-sm-6 col-md-6'></div>
                           <div className='col-xs-6 col-sm-6 col-md-6'>
                              <button
                                 className='btn icon-btn-save btn-success d-flex align-items-center'
                                 type='submit'
                              >
                                 <div
                                    onClick={handleAddActive}
                                    className='d-flex align-items-center justify-content-center'
                                 >
                                    <span className='btn-save-label'>
                                       <FaSave size={24} />
                                    </span>
                                    Thêm Hoạt Động
                                 </div>
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default AddActiveForm;
