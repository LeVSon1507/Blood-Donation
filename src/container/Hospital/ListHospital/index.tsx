import { Typography } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/context';
import { getCurrentUser, http, PRIMARY_COLOR, Role } from 'src/utils';
import { allColumns } from './allColumns';
import Button from 'src/components/Button';

const ListHospital: React.FC = () => {
   const { user } = useAuth();
   const navigate = useNavigate();
   const currentUser = user?.userId ? user : getCurrentUser();

   const [listHospitals, setListHospitals] = useState([]);

   useEffect(() => {
      if (currentUser?.role === Role.Admin) {
         http.get(`Admin/listHospital`).then(res => {
            setListHospitals(res?.data?.data);
         });
      } else {
         http.get(`Manager/listHospital?id=${currentUser?.userId}`).then(res => {
            setListHospitals(res?.data?.data);
         });
      }
   }, [currentUser?.role, currentUser?.userId]);

   const isAdmin = currentUser?.role === Role.Admin;

   const handleAddHospital = () => {
      if (isAdmin) {
         navigate('/manage/blood-bank');
      } else {
         navigate('/manage/create-hospitals');
      }
   };

   const table = useMaterialReactTable({
      columns: allColumns(isAdmin),
      data: listHospitals,
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
               {isAdmin ? 'Danh sách ngân hàng máu' : 'Danh sách bệnh viện'}
            </Typography>
            <Button onClick={handleAddHospital}>Tạo</Button>
         </div>
         <MaterialReactTable table={table} />
      </div>
   );
};

export default ListHospital;
