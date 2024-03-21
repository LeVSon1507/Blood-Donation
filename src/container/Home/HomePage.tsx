import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Standard from './Standard/Standard';
import Note from './Note';
import DateRangePickerValue from './SearchBar';
import axios from 'axios';
import { API_KEY, SearchRequest, token } from 'src/utils';
import { Dayjs } from 'dayjs';
import { DateRange } from '@mui/x-date-pickers-pro';
import RequestItem from './RequestItem';

function HomePage() {
   const [startEndDate, setStartEndDate] = React.useState<DateRange<Dayjs>>([null, null]);
   const [error, setError] = useState('');
   const [data, setData] = useState<SearchRequest[]>([]);

   const startDateParam = startEndDate[0] ? `startdate=${startEndDate[0]?.toISOString()}` : '';
   const endDateParam = startEndDate[1] ? `enddate=${startEndDate[1]?.toISOString()}` : '';
   const volunteerIdParam =
      localStorage.getItem('userId') ?? null
         ? `volunteerid=${localStorage.getItem('userId') ?? ''}`
         : '';

   useEffect(() => {
      axios
         .get<{ data: SearchRequest[] }>(
            `${API_KEY}/volunteer/searchrequest?${startDateParam}&${endDateParam}&${volunteerIdParam}`,
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
   }, [endDateParam, startDateParam, volunteerIdParam]);

   return error ? (
      <>{error}</>
   ) : data?.length > 0 ? (
      <>
         <DateRangePickerValue setValue={setStartEndDate} value={startEndDate} />
         <div
            style={{ width: '100%', height: '2px', backgroundColor: 'black', margin: '45px 0' }}
         />
         {data?.map((item: SearchRequest) => {
            // return <div>{item?.address}</div>;
            return <div>{<RequestItem data={item} />}</div>;
         })}
      </>
   ) : (
      <>
         <DateRangePickerValue setValue={setStartEndDate} value={startEndDate} />
         <div
            style={{ width: '100%', height: '2px', backgroundColor: 'black', margin: '22px 0' }}
         />
         <Standard />
         <div
            style={{ width: '100%', height: '2px', backgroundColor: 'black', marginBottom: '64px' }}
         />
         <Note />
      </>
   );
}
export default HomePage;
