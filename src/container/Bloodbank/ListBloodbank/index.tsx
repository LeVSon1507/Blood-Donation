import { Typography } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useEffect, useState } from 'react';
import { useAuth } from 'src/context';
import { BloodTotalDTO, getCurrentUser, http, ListBloodType, PRIMARY_COLOR } from 'src/utils';
import { allColumns } from './allColumns';
import Button from 'src/components/Button';
import RequestBloodForm from '../RequestBloodForm';
import { ToastError } from 'src/utils/toastOptions';

type QuantityTake = {
   numberbloodid: number;
   quantity: number;
};

const ListBlood: React.FC = () => {
   const { user } = useAuth();
   let bloodTypeId;
   const currentUser = user?.userId ? user : getCurrentUser();

   const [listBlood, setListBlood] = useState<ListBloodType[]>([]);
   const [open, setOpen] = useState(false);
   const [totalBloodOfType, setTotalBloodOfType] = useState<BloodTotalDTO>();
   const [quantityTake, setQuantityTake] = React.useState<QuantityTake[]>([]);

   useEffect(() => {
      http.get(`Hopital/displaysremainingblood?id=${currentUser?.userId}`).then(res => {
         setListBlood(res?.data?.data);
      });
   }, [currentUser?.userId]);

   const onRequestBlood = async () => {
      ToastError('Đang trong quá trình phát triển, xin lỗi vì sự bất tiện này!');
      // const body = {
      //    hospitalid: currentUser?.userId,
      //    datetake: dayjs(),
      //    bloodtypeid: bloodTypeId,
      //    quantityTake: quantityTake,
      // };

      // http.post(`Hopital/addtakeblood`, body).then(res => {
      //    setListBlood(res?.data?.data);
      // });
   };

   const handleAddBlood = () => {
      ToastError('Đang trong quá trình phát triển, xin lỗi vì sự bất tiện này!');
   };

   const handleRequestBlood = (id: number, totalBloodDTOs: any) => {
      if (bloodTypeId) bloodTypeId = id;
      setTotalBloodOfType(totalBloodDTOs);
      setOpen(true);
   };

   const table = useMaterialReactTable({
      columns: allColumns(handleRequestBlood),
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
         <RequestBloodForm
            data={totalBloodOfType}
            setOpen={setOpen}
            open={open}
            setQuantityTake={setQuantityTake}
            quantityTake={quantityTake}
            onRequestBlood={onRequestBlood}
         />
      </div>
   );
};

export default ListBlood;
