import React from 'react';
import DetailSection from './DetailSection';

const DetailHospital: React.FC = () => {
   return (
      <div className='w-full px-8 pt-6'>
         <h2>Bệnh Viện</h2>
         <DetailSection />
         {/* <RegisterSection /> */}
      </div>
   );
};

export default DetailHospital;
