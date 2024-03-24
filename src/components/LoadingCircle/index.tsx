import { CircularProgress } from '@mui/material';
import React from 'react';
import { PRIMARY_COLOR } from 'src/utils';

const LoadingCommon = ({ additionalClass }: { additionalClass?: string }) => {
   return (
      <div className={`d-flex justify-content-center align-items-center w-full ${additionalClass}`}>
         <CircularProgress size={50} style={{ color: PRIMARY_COLOR }} />
      </div>
   );
};

export default LoadingCommon;
