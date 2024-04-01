import { MenuItem, Typography } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'src/components/Button';
import { useAuth } from 'src/context';
import { getCurrentUser, http, PRIMARY_COLOR, Role } from 'src/utils';
import { allColumns } from './allColumns';
import StatusModal from './StatusModal';
import { ToastError } from 'src/utils/toastOptions';

const ListRequest: React.FC = () => {
   const { user } = useAuth();
   const navigate = useNavigate();
   const currentUser = user?.userId ? user : getCurrentUser();
   const [statusRole, setStatusRow] = useState(null);
   const [openModal, setOpenModal] = useState(false);

   const [listRequests, setListRequests] = useState([]);

   useEffect(() => {
      const requestId = currentUser?.userId;

      if (currentUser?.role === Role.Hospital) {
         http.get(`Hopital/listRequest?id=${requestId}`).then(res => {
            setListRequests(res?.data?.data);
         });
      }
      if (currentUser?.role === Role.BloodBank) {
         http.get(`Manager/listRequestsByBloodbank?bloodbankid=${requestId}`).then(res => {
            setListRequests(res?.data?.data);
         });
      }
      // eslint-disable-next-line
   }, [currentUser?.userId]);

   const handleAddRequest = () => {
      navigate('/manage/create-requests');
   };

   const handleEditRequest = row => {
      navigate(`/manage/requests/${row?.requestid}`);
   };

   const handleDeleteRequest = row => {};

   const handleChangeStatus = row => {
      setStatusRow(row);
      setOpenModal(true);
   };

   const handleCloseModal = () => {
      setOpenModal(false);
   };

   const handleSave = (status: Request, requestId: string) => {
      http
         .put(`Manager/acceptRequest`, {
            id: requestId,
            status: status,
         })
         .then(() => {
            const requestId = currentUser?.userId;
            setTimeout(() => {}, 1000);
            http.get(`Manager/listRequestsByBloodbank?bloodbankid=${requestId}`).then(res => {
               setListRequests(res?.data?.data);
               setOpenModal(false);
            });
         })
         .catch(err => {
            setOpenModal(false);
         });
   };

   const table = useMaterialReactTable({
      columns: allColumns,
      data: listRequests,
      enableRowPinning: false,
      enableSorting: false,
      enableColumnFilters: false,
      enableFullScreenToggle: false,
      enableColumnActions: false,
      paginationDisplayMode: 'pages',
      enableRowActions: true,
      positionActionsColumn: 'last',
      muiTableHeadCellProps: {
         sx: {
            backgroundColor: 'whitesmoke',
         },
      },
      renderRowActionMenuItems: ({ row }) => [
         <MenuItem key='edit' onClick={() => handleEditRequest(row?.original)}>
            Cập Nhật
         </MenuItem>,
         <MenuItem key='delete' onClick={() => handleDeleteRequest(row?.original)}>
            Xóa
         </MenuItem>,
         <MenuItem
            key='status'
            onClick={
               currentUser?.role === Role.BloodBank
                  ? () => handleChangeStatus(row?.original)
                  : () => ToastError('Tài khoản bạn không có quyền!')
            }
         >
            Thay Đổi Trạng Thái
         </MenuItem>,
      ],
   });

   return (
      <>
         <div className='ml-4'>
            <div className='w-full flex flew-row justify-between items-center'>
               <Typography variant='h4' color={PRIMARY_COLOR} mb={2}>
                  Requests
               </Typography>
               {currentUser?.role === Role.Hospital && (
                  <Button onClick={handleAddRequest}>Tạo</Button>
               )}
            </div>
            <MaterialReactTable table={table} />
            <StatusModal
               open={openModal}
               handleClose={handleCloseModal}
               handleChangeStatus={handleSave}
               data={statusRole}
            />
         </div>
      </>
   );
};

export default ListRequest;
