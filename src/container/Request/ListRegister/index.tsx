import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { http } from 'src/utils';
import { allColumns } from './allColumns';
import { Button } from '@mui/material';
import EditRequestForm from './EditRequestForm';

const ListRegister: React.FC = () => {
   const { id } = useParams();

   const [listRegister, setListRegister] = useState([]);
   const [open, setOpen] = useState(false);
   const [volunteer, setVolunteer] = useState({});

   //  TODO: change ID
   useEffect(() => {
      http.get(`Hopital/listvolunteerregister?id=${'2'}`).then(res => {
         setListRegister(res?.data?.data.registers || []);
      });
   }, [id]);

   const handleEditUserRequest = async (data: any) => {
      setVolunteer(data);
      const body = {
         registerId: data?.registerId,
         quantity: 0,
         bloodtypeid: 0,
      };
      http.post(`Hopital/updateregister`, body).then(res => {
         setListRegister(res?.data?.data.registers || []);
      });
   };

   const table = useMaterialReactTable({
      columns: allColumns,
      data: listRegister,
      enableRowPinning: false,
      enableSorting: false,
      renderRowActions: ({ row, cell }) => {
         const data = row.original;
         console.log('🚀 ~ data:', data);
         return (
            <Button className='p-2' onClick={() => handleEditUserRequest(data)}>
               Chỉnh sửa
            </Button>
         );
      },
      enableRowActions: true,
      enableColumnFilters: false,
      enableFullScreenToggle: false,
      enableColumnActions: false,
      paginationDisplayMode: 'pages',
      positionActionsColumn: 'last',
      muiTableHeadCellProps: {
         sx: {
            backgroundColor: 'whitesmoke',
         },
      },
   });

   return (
      <>
         <h4 className='mb-4'>{`Danh sách tình nguyện viên đăng kí (${
            listRegister?.length || '-'
         })`}</h4>

         <MaterialReactTable table={table} />
         <EditRequestForm
            volunteer={volunteer}
            open={open}
            setOpen={setOpen}
            onEdit={handleEditUserRequest}
         />
      </>
   );
};

export default ListRegister;
