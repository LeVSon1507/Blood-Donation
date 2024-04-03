import 'bootstrap/dist/css/bootstrap.min.css';
import { SearchRequest, isEmpty, useScrollTop } from 'src/utils';
import Button from 'src/components/Button';
import DateRangePickerValue from '../SearchBar';
import RequestItem from '../RequestItem';
import LoadingCommon from 'src/components/LoadingCircle';
import CheckboxFindInCity from 'src/container/CheckboxFindInCity';

const HaveResult = ({
   requestList = [],
   startEndDate,
   setStartEndDate,
   handleSearchInMyCity,
   userCity,
   isSearchInMyCity,
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
            {isSearching && (
               <CheckboxFindInCity
                  handleSearchInMyCity={handleSearchInMyCity}
                  isSearchInMyCity={isSearchInMyCity}
                  city={userCity}
               />
            )}

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
