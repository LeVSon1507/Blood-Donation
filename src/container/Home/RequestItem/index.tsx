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
import img7 from 'src/assets/images/undraw_scientist_ft0o.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DialogCommon from 'src/components/DialogCommon/DialogCommon';
import { ToastError, ToastSuccess } from 'src/utils/toastOptions';

function RequestItem({ data }: { data: SearchRequest }) {
   const navigate = useNavigate();
   const imageRandomMapping = {
      1: img1,
      2: img2,
      3: img3,
      4: img4,
      5: img5,
      6: img6,
      7: img7,
   };

   const isLogin =
      !!localStorage.getItem('token') &&
      !!localStorage.getItem('userId') &&
      !!localStorage.getItem('currentUser');

   const [result, setResult] = useState(null);

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
      result === 1 ? ToastError('Bạn không đủ điều kiện để đăng kí !') : setOpen(true);
   };

   const handleRegister = () => {
      isLogin ? onConfirm() : navigate('/login');
   };

   const handleYes = async () => {
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
         })
         .catch(err => {
            console.log(err?.message);
            ToastError('Đăng kí không thành công !!!');
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
                              onClick={e => {
                                 e.stopPropagation();
                                 e.preventDefault();
                                 handleRegister();
                              }}
                              aria-expanded='false'
                              style={{
                                 color: '#811315',
                                 border: '1px solid #811315',
                                 fontWeight: '500',
                              }}
                           >
                              Register
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
                              <div className='col-2 date-holder text-right'>
                                 <div className='date'>
                                    <img
                                       src={imageRandomMapping[Math.round(Math.random() * 10)]}
                                       alt='img_hpt'
                                    />
                                 </div>
                              </div>
                              <div className='col-8 content'>
                                 <h5>{data?.hospitals?.nameHospital}</h5>
                                 <p>Địa chỉ: {data?.address}</p>
                                 <p>
                                    Thời gian hoạt động: {data?.endtime}
                                    <div className='icon'>
                                       <i className='fa fa-clock-o'></i>
                                    </div>
                                 </p>
                                 <p>
                                    Thời gian hiến máu: {formatDateTime(data?.requestDate)}
                                    <div className='icon'>
                                       <i className='fa fa-clock-o'></i>
                                    </div>
                                 </p>
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
            content='Bạn có muốn đăng kí hiến máu tại bệnh viện này?'
         />
      </div>
   );
}
export default RequestItem;
