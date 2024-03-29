import React, { useEffect, useState } from 'react';
import img from 'src/assets/images/hpt_img.svg';
import { FaCalendarCheck, FaRegClock, FaRegUser } from 'react-icons/fa';
import { MdOutlineAddLocation } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import {
   formatDate,
   getDistrictByCode,
   getProvinceByCode,
   getWardByCode,
   http,
   RequestStatus,
} from 'src/utils';
import dayjs from 'dayjs';
import { Chip } from '@mui/material';
import ListRegister from '../ListRegister';

const RequestDetail: React.FC = () => {
   const { id } = useParams();
   const [request, setRequest] = useState(null);

   useEffect(() => {
      http.get(`Hopital/getRequestbyid?id=${id}`).then(res => {
         const data = res?.data?.data;
         setRequest(data);
      });
   }, [id]);

   const hospitalUser = request?.hospitals?.users;
   const hospitalAddress = `${hospitalUser?.address}, ${getWardByCode(hospitalUser?.ward)?.name}, ${
      getDistrictByCode(hospitalUser?.district)?.name
   }, ${getProvinceByCode(hospitalUser?.city)?.name}`;

   const requestAddress = `${request?.address}, ${getWardByCode(request?.ward)?.name}, ${
      getDistrictByCode(request?.district)?.name
   }, ${getProvinceByCode(request?.city)?.name}`;

   return (
      <div className={'w-full'}>
         <div className='w-full px-5 py-5 shadow-lg rounded-xl '>
            <h4>Yêu cầu buổi hiến máu</h4>
            <div className='flex flex-row mt-3 items-center justify-between gap-6 h-[320px]'>
               <div className='w-[30%] h-full rounded-md bg-slate-100 flex flex-col gap-4 px-3 py-3'>
                  <div className='w-full h-[180]'>
                     <img
                        src={img}
                        alt='giotmauhong'
                        className='p-1 bg-primary rounded-md full h-full object-cover'
                     />
                  </div>
                  <div>
                     <div className='font-semibold'>{`Bệnh viện ${
                        request?.hospitals?.nameHospital || '--'
                     }`}</div>
                     <div className='font-normal text-xs'>{hospitalAddress}</div>
                     <div className='font-semibold text-xs mt-2'>
                        SDT:{' '}
                        <span className={'text-xs font-normal'}>
                           {request?.hospitals?.users?.phoneNumber || '--'}
                        </span>
                     </div>
                  </div>
               </div>
               <div className='w-[70%] h-full rounded-md bg-slate-100 flex flex-row gap-4 px-3 py-3'>
                  <div className='w-[320px] h-full'>
                     <img
                        src={img}
                        alt='giotmauhong'
                        className='p-1 bg-primary rounded-md w-full h-full object-cover'
                     />
                  </div>

                  <div>
                     <h4 className='font-semibold text-xl'>Buổi đăng kí hiến máu</h4>
                     <div className='flex flex-col gap-3'>
                        <div className='flex flex-row gap-2 items-center'>
                           <FaCalendarCheck />
                           <span>Ngày diễn ra:</span>
                           <span className='font-semibold'>
                              {formatDate(request?.requestDate || '')}
                           </span>
                        </div>
                        <div className='flex flex-row gap-2 items-center '>
                           <FaRegClock />
                           <span>Thời gian:</span>
                           <span className='font-semibold'>{`${dayjs(request?.starttime)
                              ?.format('hh:mm A')
                              ?.toString()} - ${dayjs(request?.endtime)
                              ?.format('hh:mm A')
                              ?.toString()}`}</span>
                        </div>
                        <div className='flex flex-row gap-2 items-center'>
                           <MdOutlineAddLocation size={24} className='-ml-[3px]' />
                           <span>Địa điểm:</span>
                           <span className='font-semibold'>{requestAddress}</span>
                        </div>
                        <div className='flex flex-row gap-2 items-center'>
                           <FaRegUser />
                           <span>Số lượng:</span>
                           <span className='font-semibold'>{request?.quantity || '--'}</span>
                        </div>
                        <div className='mt-auto'>
                           <Chip
                              label={
                                 request?.status === RequestStatus.Approve
                                    ? 'Chấp thuận'
                                    : 'Đang chờ xử lí'
                              }
                              color={
                                 request?.status === RequestStatus.Approve ? 'success' : 'warning'
                              }
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className='w-full px-5 py-5 shadow-lg rounded-xl mt-8'>
            <ListRegister />
         </div>
      </div>
   );
};

export default RequestDetail;
