import React, { useEffect, useState } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_KEY, SearchRequest, formatDateTime, token } from 'src/utils';
import img1 from 'src/assets/images/undraw_blooming_re_2kc4.svg';
import img2 from 'src/assets/images/undraw_doctor_kw-5-l.svg';
import img3 from 'src/assets/images/undraw_medical_care_movn.svg';
import img4 from 'src/assets/images/undraw_medicine_b-1-ol.svg';
import img5 from 'src/assets/images/undraw_professor_re_mj1s.svg';
import img6 from 'src/assets/images/undraw_questions_re_1fy7.svg';
import img_heard from 'src/assets/images/undraw_a_whole_year_vnfm.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DialogCommon from 'src/components/DialogCommon/DialogCommon';
import { ToastError, ToastSuccess } from 'src/utils/toastOptions';
import { CircularProgress, LinearProgress, Typography } from '@mui/material';

const NOT_VALID_REGISTER_MESSAGE =
   'Bạn không đủ điều kiện để đăng kí, đợi một khoảng thời gian sau hoặc liên hệ admin để biết thêm chi tiết!';

function RequestItem({ data }: { data: SearchRequest }) {
   const navigate = useNavigate();
   const imageRandomMapping = {
      1: img1,
      2: img2,
      3: img3,
      4: img4,
      5: img5,
      6: img6,
   };

   const isLogin =
      !!localStorage.getItem('token') &&
      !!localStorage.getItem('userId') &&
      !!localStorage.getItem('currentUser');

   const [result, setResult] = useState(null);

   const [isLoading, setIsLoading] = useState<boolean>(false);

   useEffect(() => {
      axios
         .get<{ data: string }>(
            `${API_KEY}/volunteer/checkregister?id=${localStorage.getItem('userId')}`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         )
         .then(res => setResult(res?.data?.data))
         .catch(err => {
            console.log(err?.message);
         });
   }, []);

   const [open, setOpen] = useState<boolean>(false);

   const onConfirm = () => {
      result !== 0 ? ToastError(NOT_VALID_REGISTER_MESSAGE) : setOpen(true);
   };

   const handleRegister = () => {
      isLogin ? onConfirm() : navigate('/login');
   };

   const handleYes = async () => {
      if (!isLogin) return navigate('/login');
      if (result !== 0) {
         return ToastError(NOT_VALID_REGISTER_MESSAGE);
      }

      setIsLoading(true);
      axios
         .post<{ data: string }>(
            `${API_KEY}/volunteer/register`,
            {
               volunteerid: localStorage.getItem('userId'),
               requestid: data.requestid,
            },
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         )
         .then(res => {
            ToastSuccess('Đăng kí thành công !!!');
            setOpen(false);
            setIsLoading(false);
            setResult(null);
         })
         .catch(err => {
            console.log(err?.message);
            ToastError('Đăng kí không thành công !!!');
            setIsLoading(false);
         });
   };

   return (
      <div>
         <link
            href='https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'
            rel='stylesheet'
         />
         <div className='container'>
            <div className='row'>
               <div className='col-lg-12'>
                  <div className='recent-activities card'>
                     <div className='card-close'>
                        <div className='dropdown'>
                           <button
                              type='button'
                              className='btn'
                              data-toggle='dropdown'
                              aria-haspopup='true'
                              style={{
                                 color: '#811315',
                                 border: '1px solid #811315',
                                 borderRadius: '4px',
                              }}
                              onClick={e => {
                                 e.stopPropagation();
                                 e.preventDefault();
                                 handleRegister();
                              }}
                              aria-expanded='false'
                           >
                              Đăng kí
                           </button>
                        </div>
                     </div>
                     <div className='card-header'>
                        <h3 className='h4'>
                           Buổi hiến máu số {data?.requestid} tại bệnh viện{' '}
                           {data?.hospitals?.nameHospital}
                        </h3>
                     </div>
                     <div className='card-body no-padding'>
                        <div className='item'>
                           <div className='row'>
                              <div className='col-2 text-right'>
                                 <div className='text-center d-flex justify-content-center align-items-center'>
                                    {imageRandomMapping[Math.round(Math.random() * 10)] ? (
                                       <img
                                          src={
                                             imageRandomMapping[Math.floor(Math.random() * 6) + 1]
                                          }
                                          alt='img_hpt'
                                       />
                                    ) : (
                                       <div className='d-flex justify-content-center align-items-center'>
                                          <CircularProgress color='secondary' />
                                       </div>
                                    )}
                                 </div>
                              </div>
                              <div className='col-8 content row align-items-center'>
                                 <div className='col-8'>
                                    <Typography variant='h5' className='mb-3'>
                                       Tên bệnh viện: {data?.hospitals?.nameHospital}
                                    </Typography>
                                    <Typography variant='body1'>
                                       Địa chỉ: {data?.address}
                                    </Typography>
                                    <Typography variant='body1'>
                                       Thời gian hoạt động: {data?.endtime}
                                       <div className='icon'>
                                          <i className='fa fa-clock-o'></i>
                                       </div>
                                    </Typography>
                                    <Typography variant='body1'>
                                       Thời gian hiến máu: {formatDateTime(data?.requestDate)}
                                       <div className='icon'>
                                          <i className='fa fa-clock-o'></i>
                                       </div>
                                    </Typography>
                                 </div>
                                 <div className='col-4'>
                                    <Typography variant='body1'>
                                       Số lượng người đăng kí: {Math.round(data?.total)} / 100%
                                    </Typography>
                                    <LinearProgress
                                       variant='determinate'
                                       value={data?.total}
                                       color='secondary'
                                    />
                                    <img src={img_heard} alt='img_heard' />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <DialogCommon
            open={open}
            onClose={() => setOpen(false)}
            onConfirm={handleYes}
            isLoading={isLoading}
            content='Bạn có muốn đăng kí hiến máu tại bệnh viện này?'
         />
      </div>
   );
}
export default RequestItem;
