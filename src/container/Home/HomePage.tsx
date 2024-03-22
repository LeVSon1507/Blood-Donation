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
import ErrorPage from 'src/components/ErrorPage';
import Button from 'src/components/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';

function HomePage() {
   const [startEndDate, setStartEndDate] = React.useState<DateRange<Dayjs>>([null, null]);
   const [error, setError] = useState('');
   const [data, setData] = useState<SearchRequest[]>([]);
   const [isSearchInMyCity, setIsSearchInMyCity] = useState(false);

   const handleSearchInMyCity = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setIsSearchInMyCity(value);
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
      <div style={{ marginTop: '24px' }}>
         {data?.length > 0 ? (
            <>
               <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <DateRangePickerValue setValue={setStartEndDate} value={startEndDate} />
                  {
                     // TODO: check city in profile
                     <div
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                     >
                        <FormGroup>
                           <FormControlLabel
                              control={<Checkbox />}
                              onChange={handleSearchInMyCity}
                              label='Tìm kiếm danh sách hoạt động ở địa phương tôi'
                           />
                        </FormGroup>
                     </div>
                  }
                  {!!startEndDate[0] && !!startEndDate[1] && (
                     <div
                        style={{
                           marginTop: '24px',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           width: '100%',
                        }}
                     >
                        <Button onClick={() => setStartEndDate([null, null])}>Bỏ lọc</Button>
                     </div>
                  )}
               </div>
               <div
                  style={{
                     width: '100%',
                     height: '2px',
                     backgroundColor: 'black',
                     margin: '45px 0',
                  }}
               />
               {data?.map((item: SearchRequest) => {
                  return <div>{<RequestItem data={item} />}</div>;
               })}
            </>
         ) : (
            <>
               <div
                  style={{
                     width: '100%',
                     height: '2px',
                     backgroundColor: 'black',
                     margin: '22px 0',
                  }}
               />
               <DateRangePickerValue setValue={setStartEndDate} value={startEndDate} />
               {isNotResult && (
                  <div
                     style={{
                        padding: '32px',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}
                  >
                     <Typography
                        variant='h2'
                        component='h1'
                        sx={{
                           fontWeight: 700,
                           color: 'black',
                           fontFamily: 'Open Sans,Arial,sans-serif',
                        }}
                     >
                        {'Không có kết quả phù hợp'}
                     </Typography>
                     {!!startEndDate[0] && !!startEndDate[1] && (
                        <div
                           style={{
                              marginTop: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '100%',
                           }}
                        >
                           <Button onClick={() => setStartEndDate([null, null])}>Bỏ lọc</Button>
                        </div>
                     )}
                  </div>
               )}

               <div
                  style={{
                     width: '100%',
                     height: '2px',
                     backgroundColor: 'black',
                     margin: '22px 0',
                  }}
               />
               <Standard />
               <div
                  style={{
                     width: '100%',
                     height: '2px',
                     backgroundColor: 'black',
                     marginBottom: '64px',
                  }}
               />
               <Note />
            </>
         )}
      </div>
   );
}
export default HomePage;
