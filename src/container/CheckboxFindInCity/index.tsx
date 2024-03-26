import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import React from 'react';
import { getProvinceByCode, isEmpty } from 'src/utils';

const CheckboxFindInCity = ({ isSearchInMyCity, handleSearchInMyCity, city }) => {
   return (
      <div className='d-flex justify-content-center align-items-center'>
         <FormGroup className='d-flex justify-content-center align-items-center'>
            <FormControlLabel
               control={<Checkbox checked={isSearchInMyCity} />}
               onChange={handleSearchInMyCity}
               disabled={isEmpty(city)}
               label={`Tìm kiếm danh sách hoạt động ở ${
                  isSearchInMyCity && !isEmpty(city)
                     ? getProvinceByCode(city)?.name
                     : 'tại địa phương'
               }`}
            />

            {isEmpty(city) && (
               <Typography variant='body2' color='error'>
                  Vui lòng cập nhật địa chỉ của bạn để tìm kiếm tại địa phương!
               </Typography>
            )}
         </FormGroup>
      </div>
   );
};

export default CheckboxFindInCity;
