import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SearchRequest, isEmpty, useScrollTop } from 'src/utils';
import Button from 'src/components/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import DateRangePickerValue from '../SearchBar';
import RequestItem from '../RequestItem';
import LoadingCommon from 'src/components/LoadingCircle';

const HaveResult = ({
   requestList = [],
   startEndDate,
   setStartEndDate,
   handleSearchInMyCity,
   userCity,
   isLoading,
}) => {
   const isSearching = !isEmpty(startEndDate[0]) && !isEmpty(startEndDate[1]);
   useScrollTop();

   return isLoading ? (
      <LoadingCommon additionalClass='h-[100vh]' />
   ) : (
      <>
         <div className='d-flex flex-column'>
            <DateRangePickerValue setValue={setStartEndDate} value={startEndDate} />
            <div className='d-flex justify-content-center align-items-center'>
               <FormGroup className='d-flex justify-content-center align-items-center'>
                  <FormControlLabel
                     control={<Checkbox />}
                     onChange={handleSearchInMyCity}
                     disabled={isEmpty(userCity)}
                     label='Tìm kiếm danh sách hoạt động ở địa phương tôi'
                  />

                  {isEmpty(userCity) && (
                     <Typography variant='body2' color='error'>
                        Vui lòng cập nhật địa chỉ của bạn để tìm kiếm tại địa phương!
                     </Typography>
                  )}
               </FormGroup>
            </div>

            {isSearching && (
               <div className='d-flex justify-content-center align-items-center w-full mt-3'>
                  <Button onClick={() => setStartEndDate([null, null])}>Bỏ lọc</Button>
               </div>
            )}
         </div>

         <div className='w-full h-[2px] bg-black my-6' />

         {requestList.map((item: SearchRequest) => {
            return <div>{<RequestItem data={item} key={item?.requestid} />}</div>;
         })}
      </>
   );
};

export default HaveResult;
