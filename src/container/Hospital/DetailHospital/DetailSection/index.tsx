import React, { useEffect, useState } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from 'src/assets/images/hpt_img.svg';
import {
   PRIMARY_COLOR,
   User,
   getDistrictByCode,
   getProvinceByCode,
   getWardByCode,
   http,
   isEmpty,
} from 'src/utils';
import LoadingCommon from 'src/components/LoadingCircle';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

function DetailSection({ hospitalId }: { hospitalId?: string }) {
   const { id } = useParams();

   const [isLoading, setIsLoading] = useState(false);
   const [hospital, setHospital] = useState<User>();

   useEffect(() => {
      setIsLoading(true);
      http
         .get(`/user/profile?id=${id}`)
         .then(res => {
            setIsLoading(false);
            setHospital(res?.data?.data);
         })
         .catch(err => {
            setIsLoading(false);
            console.log('error: ', err?.data?.message);
         });
   }, [id]);

   const address = [
      hospital?.address,
      getWardByCode(hospital?.district)?.name,
      getDistrictByCode(hospital?.ward)?.name,
      getProvinceByCode(hospital?.city)?.name,
   ]
      .filter(item => item)
      .join(', ');

   return isLoading ? (
      <LoadingCommon additionalClass='w-[100vh]' />
   ) : (
      <div className='container-hpt'>
         <div className='p-5 w-full hospital-detail'>
            <div>
               <div className='row'>
                  <div className='col-lg-4'>
                     <div className='card'>
                        <div className='card-body'>
                           <div className='d-flex flex-column align-items-center text-center'>
                              <img
                                 src={img}
                                 alt='giotmauhong'
                                 className='p-1 bg-primary rounded-md'
                                 width={'40%'}
                                 height={'40%'}
                              />
                              <div className='mt-3'>
                                 <h4>{hospital?.hospitals?.nameHospital}</h4>
                                 <p className='text-secondary mb-1 '>
                                    Đã tổ chức {hospital?.hospitals?.requests?.length} buổi hiến
                                    máu.
                                 </p>
                                 <p className='text-muted font-size-sm'>{address}</p>
                              </div>
                           </div>
                           <hr className='my-4' />
                           <ul className='list-group list-group-flush'>
                              <li className='list-group-item d-flex justify-content-between align-items-center flex-wrap'>
                                 <h6 className='mb-0'>
                                    <svg
                                       xmlns='http://www.w3.org/2000/svg'
                                       width='24'
                                       height='24'
                                       viewBox='0 0 24 24'
                                       fill='none'
                                       stroke='currentColor'
                                       stroke-width='2'
                                       stroke-linecap='round'
                                       stroke-linejoin='round'
                                       className='feather feather-globe me-2 icon-inline'
                                    >
                                       <circle cx='12' cy='12' r='10'></circle>
                                       <line x1='2' y1='12' x2='22' y2='12'></line>
                                       <path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'></path>
                                    </svg>
                                    Website
                                 </h6>
                                 <span className='text-secondary'>
                                    https://
                                    {hospital?.hospitals?.nameHospital?.replace(/\s/g, '')?.trim()}
                                    .com
                                 </span>
                              </li>
                              <li className='list-group-item d-flex justify-content-between align-items-center flex-wrap'>
                                 <h6 className='mb-0'>
                                    <svg
                                       xmlns='http://www.w3.org/2000/svg'
                                       width='24'
                                       height='24'
                                       viewBox='0 0 24 24'
                                       fill='none'
                                       stroke='currentColor'
                                       stroke-width='2'
                                       stroke-linecap='round'
                                       stroke-linejoin='round'
                                       className='feather feather-twitter me-2 icon-inline text-info'
                                    >
                                       <path d='M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z'></path>
                                    </svg>
                                    Twitter
                                 </h6>
                                 <span className='text-secondary'>
                                    https://
                                    {hospital?.hospitals?.nameHospital?.replace(/\s/g, '')?.trim()}
                                    .com
                                 </span>
                              </li>
                              <li className='list-group-item d-flex justify-content-between align-items-center flex-wrap'>
                                 <h6 className='mb-0'>
                                    <svg
                                       xmlns='http://www.w3.org/2000/svg'
                                       width='24'
                                       height='24'
                                       viewBox='0 0 24 24'
                                       fill='none'
                                       stroke='currentColor'
                                       stroke-width='2'
                                       stroke-linecap='round'
                                       stroke-linejoin='round'
                                       className='feather feather-instagram me-2 icon-inline text-danger'
                                    >
                                       <rect
                                          x='2'
                                          y='2'
                                          width='20'
                                          height='20'
                                          rx='5'
                                          ry='5'
                                       ></rect>
                                       <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'></path>
                                       <line x1='17.5' y1='6.5' x2='17.51' y2='6.5'></line>
                                    </svg>
                                    Instagram
                                 </h6>
                                 <span className='text-secondary'>
                                    https://
                                    {hospital?.hospitals?.nameHospital?.replace(/\s/g, '')?.trim()}
                                    .com
                                 </span>
                              </li>
                              <li className='list-group-item d-flex justify-content-between align-items-center flex-wrap'>
                                 <h6 className='mb-0'>
                                    <svg
                                       xmlns='http://www.w3.org/2000/svg'
                                       width='24'
                                       height='24'
                                       viewBox='0 0 24 24'
                                       fill='none'
                                       stroke='currentColor'
                                       stroke-width='2'
                                       stroke-linecap='round'
                                       stroke-linejoin='round'
                                       className='feather feather-facebook me-2 icon-inline text-primary'
                                    >
                                       <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'></path>
                                    </svg>
                                    Facebook
                                 </h6>
                                 <span className='text-secondary'>
                                    https://
                                    {hospital?.hospitals?.nameHospital?.replace(/\s/g, '')?.trim()}
                                    .com
                                 </span>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div className='col-lg-8'>
                     <div className='hpt-card'>
                        <div className='card-body'>
                           <div className='row mb-3'>
                              <div className='col-sm-3'>
                                 <h6 className='mb-0'>Tên bệnh viện:</h6>
                              </div>
                              <div className='col-sm-9 text-secondary'>
                                 <input
                                    type='text'
                                    className='form-control'
                                    value={hospital?.hospitals?.nameHospital}
                                 />
                              </div>
                           </div>
                           <div className='row mb-3'>
                              <div className='col-sm-3'>
                                 <h6 className='mb-0'>Email:</h6>
                              </div>
                              <div className='col-sm-9 text-secondary'>
                                 <input
                                    type='text'
                                    className='form-control'
                                    value={hospital?.email}
                                 />
                              </div>
                           </div>
                           <div className='row mb-3'>
                              <div className='col-sm-3'>
                                 <h6 className='mb-0'>Số điện thoại:</h6>
                              </div>
                              <div className='col-sm-9 text-secondary'>
                                 <input
                                    type='text'
                                    className='form-control'
                                    value={hospital?.phoneNumber}
                                 />
                              </div>
                           </div>
                           <div className='row mb-3'>
                              <div className='col-sm-3'>
                                 <h6 className='mb-0'>Thành phố:</h6>
                              </div>
                              <div className='col-sm-9 text-secondary'>
                                 <input
                                    type='text'
                                    className='form-control'
                                    value={getProvinceByCode(hospital?.city)?.name}
                                 />
                              </div>
                           </div>
                           <div className='row mb-3'>
                              <div className='col-sm-3'>
                                 <h6 className='mb-0'>Huyện:</h6>
                              </div>
                              <div className='col-sm-9 text-secondary'>
                                 <input
                                    type='text'
                                    className='form-control'
                                    value={getDistrictByCode(hospital?.district)?.name}
                                 />
                              </div>
                           </div>
                           <div className='row mb-3'>
                              <div className='col-sm-3'>
                                 <h6 className='mb-0'>Phường:</h6>
                              </div>
                              <div className='col-sm-9 text-secondary'>
                                 <input
                                    type='text'
                                    className='form-control'
                                    value={getWardByCode(hospital?.ward)?.name}
                                 />
                              </div>
                           </div>
                           <div className='row mb-3'>
                              <div className='col-sm-3'>
                                 <h6 className='mb-0'>Đường:</h6>
                              </div>
                              <div className='col-sm-9 text-secondary'>
                                 <input
                                    type='text'
                                    className='form-control'
                                    value={hospital?.address}
                                 />
                              </div>
                           </div>
                           <div className='row'>
                              <div className='col-sm-3'></div>
                              <div className='col-sm-9 text-secondary'>
                                 {/* TODO: implement later */}
                              </div>
                           </div>
                        </div>
                     </div>
                     {!isEmpty(hospital?.hospitals?.requests) ? (
                        <div className='row'>
                           <div className='col-sm-12'>
                              <div className='card'>
                                 <div className='card-body'>
                                    <h5 className='d-flex align-items-center mb-3'>
                                       Các buổi hiến máu đã tổ chức:
                                    </h5>
                                    {hospital?.hospitals?.requests.map(item => {
                                       return (
                                          <div key={item?.requestid}>
                                             <p>
                                                Buổi hiến máu số {item?.requestid} tại{' '}
                                                {item?.hospitals} với số lượng {item?.quantity}{' '}
                                                người, được tổ chức tại{' '}
                                                {getDistrictByCode(item?.city)?.name || ''}
                                             </p>
                                             {item?.status === 0 && (
                                                <div className='progress mb-3'>
                                                   <div
                                                      className='progress-bar bg-danger'
                                                      role='progressbar'
                                                      aria-valuenow={72}
                                                      aria-valuemin={0}
                                                      aria-valuemax={100}
                                                   ></div>
                                                </div>
                                             )}
                                          </div>
                                       );
                                    })}
                                 </div>
                              </div>
                           </div>
                        </div>
                     ) : (
                        <div className='row'>
                           <div className='col-sm-12'>
                              <div className='card'>
                                 <div className='card-body flex justify-start items-start '>
                                    <Typography sx={{ color: PRIMARY_COLOR }} variant='body1'>
                                       Chưa tổ chức buổi hiến máu nào!!!
                                    </Typography>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
export default DetailSection;
