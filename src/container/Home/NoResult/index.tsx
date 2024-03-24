import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'src/components/Button';
import { Typography } from '@mui/material';
import LoadingCommon from 'src/components/LoadingCircle';
import { isEmpty } from 'src/utils';

const NoResult = ({ isLoading, startEndDate, setStartEndDate, isEmptyData }) => {
   const isSearching = !isEmpty(startEndDate[0]) && !isEmpty(startEndDate[1]);

   const isNotHaveResult = isEmptyData && isSearching;

   return (
      <>
         {isLoading ? (
            <LoadingCommon additionalClass='h-[100vh]' />
         ) : (
            isNotHaveResult && (
               <div className='d-flex justify-content-center align-items-center flex-column text-center p-4'>
                  <Typography
                     variant='h2'
                     component='h1'
                     className='font-bold text-black font-open-sans'
                  >
                     {'Không có kết quả phù hợp'}
                  </Typography>
                  {isSearching && (
                     <div className='d-flex justify-content-center align-items-center w-full mt-3'>
                        <Button onClick={() => setStartEndDate([null, null])}>Bỏ lọc</Button>
                     </div>
                  )}
               </div>
            )
         )}
      </>
   );
};

export default NoResult;
