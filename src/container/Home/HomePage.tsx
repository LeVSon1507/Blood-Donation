import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Standard from './Standard/Standard';
import Note from './Note';
import DateRangePickerValue from './SearchBar';
import axios from 'axios';
import { API_KEY, SearchRequest, isEmpty, token } from 'src/utils';
import { Dayjs } from 'dayjs';
import { DateRange } from '@mui/x-date-pickers-pro';
import RequestItem from './RequestItem';
import ErrorPage from 'src/components/ErrorPage';
import Button from 'src/components/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import { useAuth } from 'src/context';
import { ToastError } from 'src/utils/toastOptions';

function HomePage() {
   const [startEndDate, setStartEndDate] = React.useState<DateRange<Dayjs>>([null, null]);
   const [error, setError] = useState('');
   const [data, setData] = useState<SearchRequest[]>([]);
   const [isSearchInMyCity, setIsSearchInMyCity] = useState(false);
   const { user } = useAuth();

   const handleSearchInMyCity = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;

      if (isEmpty(user?.city)) {
         ToastError('Vui lòng cập nhật địa chỉ của bạn!');
         setIsSearchInMyCity(false);
      } else {
         setIsSearchInMyCity(value);
      }
   };

   const startDateParam = startEndDate[0] ? `startdate=${startEndDate[0]?.toISOString()}` : '';
   const endDateParam = startEndDate[1] ? `enddate=${startEndDate[1]?.toISOString()}` : '';
   const volunteerIdParam =
      localStorage.getItem('userId') ?? null
         ? `volunteerid=${localStorage.getItem('userId') ?? ''}`
         : 'volunteerid=26';

   useEffect(() => {
      axios
         .get<{ data: SearchRequest[] }>(
            `${API_KEY}/volunteer/searchrequest?${startDateParam}&${endDateParam}&${
               isSearchInMyCity ? volunteerIdParam : ''
            }`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         )
         .then(res => setData(res?.data?.data))
         .catch(err => {
            setError(err?.message);
         });
   }, [endDateParam, isSearchInMyCity, startDateParam, volunteerIdParam]);

   const isNotResult = data?.length === 0 && !!startEndDate[0] && !!startEndDate[1];

   return error ? (
      <>{<ErrorPage message={error} />}</>
   ) : (
      <div className='mt-2'>
         {data?.length > 0 ? (
            <>
               <div className='d-flex flex-column'>
                  <DateRangePickerValue setValue={setStartEndDate} value={startEndDate} />
                  <div className='d-flex justify-content-center align-items-center'>
                     <FormGroup className='d-flex justify-content-center align-items-center'>
                        <FormControlLabel
                           control={<Checkbox />}
                           onChange={handleSearchInMyCity}
                           disabled={isEmpty(user?.city)}
                           label='Tìm kiếm danh sách hoạt động ở địa phương tôi'
                        />
                        {isEmpty(user?.city) && (
                           <Typography variant='body2' color='error'>
                              Vui lòng cập nhật địa chỉ của bạn để tìm kiếm tại địa phương!
                           </Typography>
                        )}
                     </FormGroup>
                  </div>
                  {!!startEndDate[0] && !!startEndDate[1] && (
                     <div className='d-flex justify-content-center align-items-center w-full mt-3'>
                        <Button onClick={() => setStartEndDate([null, null])}>Bỏ lọc</Button>
                     </div>
                  )}
               </div>
               <div className='w-full h-[2px] bg-black my-6' />
               {data?.map((item: SearchRequest) => {
                  return <div>{<RequestItem data={item} />}</div>;
               })}
            </>
         ) : (
            <>
               <div className='w-full h-[2px] bg-black my-6' />
               <DateRangePickerValue setValue={setStartEndDate} value={startEndDate} />
               {isNotResult && (
                  <div className='d-flex justify-content-center align-items-center flex-column text-center p-4'>
                     <Typography
                        variant='h2'
                        component='h1'
                        className='font-bold text-black font-open-sans'
                     >
                        {'Không có kết quả phù hợp'}
                     </Typography>
                     {!!startEndDate[0] && !!startEndDate[1] && (
                        <div className='d-flex justify-content-center align-items-center w-full mt-3'>
                           <Button onClick={() => setStartEndDate([null, null])}>Bỏ lọc</Button>
                        </div>
                     )}
                  </div>
               )}

               <div className='w-full h-[2px] bg-black mt-6 mb-6' />
               <Standard />
               <div className='w-full h-[2px] bg-black mb-64' />
               <Note />
            </>
         )}
      </div>
   );
}
export default HomePage;
