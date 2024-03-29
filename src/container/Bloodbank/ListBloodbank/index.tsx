import { Typography } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/context';
import { getCurrentUser, http, PRIMARY_COLOR } from 'src/utils';
import { allColumns } from './allColumns';
import Button from 'src/components/Button';

const ListBlood: React.FC = () => {
   const { user } = useAuth();
   const navigate = useNavigate();
   const currentUser = user?.userId ? user : getCurrentUser();

   const [listBlood, setListBlood] = useState([]);
   console.log('🚀 ~ listBlood:', listBlood);

   useEffect(() => {
      http.get(`Hopital/displaysremainingblood?id=${currentUser?.userId}`).then(res => {
         setListBlood(res?.data?.data);
      });
   }, [currentUser?.userId]);

   const handleAddBlood = () => {
      navigate('/manage/create-hospitals');
   };

   const table = useMaterialReactTable({
      columns: allColumns,
      data: listBlood,
      enableRowPinning: false,
      enableSorting: false,
      enableColumnFilters: false,
      enableFullScreenToggle: false,
      enableColumnActions: false,
      paginationDisplayMode: 'pages',
      muiTableHeadCellProps: {
         sx: {
            backgroundColor: 'whitesmoke',
         },
      },
   });

   return (
      <div className='ml-4'>
         <div className='w-full flex flew-row justify-between items-center'>
            <Typography variant='h4' color={PRIMARY_COLOR} mb={2}>
               Danh sách máu đang có trong kho
            </Typography>
            <Button onClick={handleAddBlood}>Tạo</Button>
         </div>
         <MaterialReactTable table={table} />
      </div>
   );
};

export default ListBlood;
