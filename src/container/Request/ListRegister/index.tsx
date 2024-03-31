import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { http } from 'src/utils';
import { allColumns } from './allColumns';
import { Button } from '@mui/material';
import EditRequestForm from './EditRequestForm';
import { ToastSuccess } from 'src/utils/toastOptions';

const ListRegister: React.FC = () => {
   const { id } = useParams();

   const [listRegister, setListRegister] = useState([]);
   const [open, setOpen] = useState(false);
   const [volunteer, setVolunteer] = useState<any>({});
   const [quantity, setQuantity] = React.useState(volunteer?.quantity);
   const [bloodTypeId, setBloodTypeId] = React.useState<any>(
      (volunteer?.bloodtypes?.bloodtypeid as string) || null
   );
   const [isLoading, setIsLoading] = useState(false);

   //  TODO: change ID
   useEffect(() => {
      http.get(`Hopital/listvolunteerregister?id=${'2'}`).then(res => {
         setListRegister(res?.data?.data.registers || []);
      });
   }, [id]);

   const onEditRegister = () => {
      setIsLoading(true);
      const body = {
         registerId: volunteer?.registerId,
         quantity: +quantity,
         bloodtypeid: +bloodTypeId,
      };
      http
         .put(`Hopital/updateregister`, body)
         .then(res => {
            setIsLoading(false);
            setOpen(false);
            window.location.reload();
            ToastSuccess('Cập nhật thành công!');
         })
         .catch(err => {
            setIsLoading(false);
            console.log(err);
         });
   };

   const handleEditUserRequest = async (data: any) => {
      setVolunteer(data);
      setIsLoading(true);
      setOpen(true);
      setTimeout(() => {
         setIsLoading(false);
      }, 1000);
   };

   const table = useMaterialReactTable({
      columns: allColumns,
      data: listRegister,
      enableRowPinning: false,
      enableSorting: false,
      renderRowActions: ({ row, cell }) => {
         const data = row.original;
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
            quantity={quantity}
            setQuantity={setQuantity}
            bloodTypeId={bloodTypeId}
            setBloodTypeId={setBloodTypeId}
            onEditRegister={onEditRegister}
            isLoading={isLoading}
         />
      </>
   );
};

export default ListRegister;
