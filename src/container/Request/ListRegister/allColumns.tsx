import { Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';

export const allColumns: Array<MRT_ColumnDef<any>> = [
   {
      accessorKey: 'volunteers.fullname',
      header: 'Tên',
      size: 150,
   },
   {
      accessorKey: 'volunteers.cccd',
      header: 'CCCD',
      size: 70,
   },
   {
      accessorKey: 'volunteers.users.email',
      header: 'Email',
      size: 100,
   },
   {
      accessorKey: 'volunteers.users.phoneNumber',
      header: 'Số Điện Thoại',
      size: 70,
   },
   {
      accessorKey: 'volunteers.gender',
      header: 'Giới Tính',
      size: 50,
      Cell: ({ row }) => {
         const gender = row.original?.volunteers?.gender;

         return <Typography fontSize={14}>{gender === 0 ? 'Nam' : 'Nữ'}</Typography>;
      },
   },
   {
      accessorKey: 'bloodtypes.nameBlood',
      header: 'Nhóm Máu',
      size: 40,
   },
   {
      accessorKey: 'quantity',
      header: 'Đã hiến (ml)',
      size: 40,
   },
];
