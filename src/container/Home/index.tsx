import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Standard from './Standard/Standard';
import Note from './Note';
import DateRangePickerValue from './SearchBar';
import axios from 'axios';
import { API_KEY, SearchRequest, User, isEmpty, token } from 'src/utils';
import { Dayjs } from 'dayjs';
import { DateRange } from '@mui/x-date-pickers-pro';
import ErrorPage from 'src/components/ErrorPage';
import { ToastError } from 'src/utils/toastOptions';
import Gallery from '../LandingView/about/gallery';
import NoResult from './NoResult';
import HaveResult from './HaveResult';
import CheckboxFindInCity from '../CheckboxFindInCity';
import ListActivities from '../Activities/ListActivities';

function HomePage() {
   const [startEndDate, setStartEndDate] = React.useState<DateRange<Dayjs>>([null, null]);
   const [error, setError] = useState('');
   const [requestList, setRequestList] = useState<SearchRequest[]>([]);
   const [isSearchInMyCity, setIsSearchInMyCity] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const currentUser = JSON.parse(localStorage.getItem('currentUser')) as unknown as User;

   const handleSearchInMyCity = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;

      if (isEmpty(currentUser?.city)) {
         ToastError('Vui lòng cập nhật địa chỉ của bạn!');
         setIsSearchInMyCity(false);
      } else {
         setIsSearchInMyCity(value);
      }
   };

   const startDateParam = startEndDate[0] ? `startdate=${startEndDate[0]?.toISOString()}` : '';
   const endDateParam = startEndDate[1] ? `enddate=${startEndDate[1]?.toISOString()}` : '';
   const volunteerIdParam = !isEmpty(currentUser?.userId)
      ? `volunteerid=${currentUser?.userId}`
      : '';

   useEffect(() => {
      setIsLoading(true);
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
         .then(res => {
            setRequestList(res?.data?.data);
            setIsLoading(false);
         })
         .catch(err => {
            setError(err?.message);
            setIsLoading(false);
         });
   }, [endDateParam, isSearchInMyCity, startDateParam, volunteerIdParam]);

   const isSearching = !isEmpty(startEndDate[0]) && !isEmpty(startEndDate[1]);

   return error ? (
      <>{<ErrorPage message={error} />}</>
   ) : (
      <div className='mt-2'>
         {!isEmpty(requestList) ? (
            <HaveResult
               isLoading={isLoading}
               requestList={requestList}
               startEndDate={startEndDate}
               setStartEndDate={setStartEndDate}
               handleSearchInMyCity={handleSearchInMyCity}
               userCity={currentUser?.city}
               isSearchInMyCity={isSearchInMyCity}
            />
         ) : (
            <>
               {!isSearching && <Gallery />}
               <div className='w-full h-[2px] bg-black my-6' />
               <DateRangePickerValue setValue={setStartEndDate} value={startEndDate} />
               {isSearching && (
                  <CheckboxFindInCity
                     handleSearchInMyCity={handleSearchInMyCity}
                     isSearchInMyCity={isSearchInMyCity}
                     city={currentUser?.city}
                  />
               )}
               <NoResult
                  isLoading={isLoading}
                  startEndDate={startEndDate}
                  setStartEndDate={setStartEndDate}
                  isEmptyData={isEmpty(requestList)}
               />
               <>
                  <div className='w-full h-[2px] bg-black mt-6 mb-6' />
                  <Standard />
                  <div className='w-full h-[2px] bg-black mb-64' />
                  <Note />
                  <div className='w-full h-[2px] bg-black mt-6 mb-6' />
                  <ListActivities />
               </>
            </>
         )}
      </div>
   );
}
export default HomePage;
