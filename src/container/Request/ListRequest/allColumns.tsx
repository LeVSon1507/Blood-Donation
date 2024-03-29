import { Chip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { MRT_ColumnDef } from 'material-react-table';
import { NavLink } from 'react-router-dom';
import {
   formatDate,
   getDistrictByCode,
   getProvinceByCode,
   getWardByCode,
   RequestStatus,
} from 'src/utils';
import { AiFillCaretLeft } from 'react-icons/ai';

const getStatus = status => {
   switch (status) {
      case RequestStatus.Pending:
         return { label: 'Đang chờ xử lí', color: 'warning' };
      case RequestStatus.Approve:
         return { label: 'Chấp thuận', color: 'success' };
      case RequestStatus.Reject:
         return { label: 'Không chấp thuận', color: 'error' };
      default:
         return null;
   }
};

export const allColumns: Array<MRT_ColumnDef<any>> = [
   {
      accessorKey: 'requestId',
      header: '',
      size: 50,
      Cell: ({ row }) => {
         const requestid = row.original.requestid;

         return (
            <NavLink to={`/manage/requests/detail/${requestid}`}>
               <AiFillCaretLeft size={24} />
            </NavLink>
         );
      },
   },
   {
      accessorKey: 'hospitals.nameHospital',
      header: 'Hospital',
      size: 150,
      Cell: ({ row }) => {
         const data = row.original;
         const name = data.hospitals?.nameHospital;

         return (
            <NavLink to={`/manage/hospitals/${data?.hospitalid}`} className={''}>
               {name}
            </NavLink>
         );
      },
   },
   {
      accessorKey: 'requestDate',
      header: 'Request Date',
      size: 60,
      Cell: ({ row }) => {
         const requestDate = row.original?.requestDate;

         return <Typography fontSize={14}>{formatDate(requestDate)}</Typography>;
      },
   },
   {
      accessorKey: 'contact',
      header: 'Contact',
      size: 100,
   },
   {
      accessorKey: 'starttime',
      header: 'Start Time',
      size: 50,
      Cell: ({ row }) => {
         const data = row.original?.starttime;

         return <Typography fontSize={14}>{dayjs(data).format('hh:mm A')?.toString()}</Typography>;
      },
   },
   {
      accessorKey: 'endtime',
      header: 'End Time',
      size: 50,
      Cell: ({ row }) => {
         const data = row.original?.endtime;

         return <Typography fontSize={14}>{dayjs(data).format('hh:mm A')?.toString()}</Typography>;
      },
   },
   {
      accessorKey: 'address',
      header: 'Address',
      size: 200,
      Cell: ({ row }) => {
         const data = row.original;

         const address = [
            data?.address,
            getWardByCode(data?.ward)?.name,
            getDistrictByCode(data?.district)?.name,
            getProvinceByCode(data?.city)?.name,
         ]
            .filter(item => item)
            .join(', ');

         return <Typography fontSize={14}>{address}</Typography>;
      },
   },
   {
      accessorKey: 'status',
      header: 'Status',
      size: 200,
      Cell: ({ row }) => {
         const data = row.original?.status;
         return (
            <Chip
               label={getStatus(data)?.label || '--'}
               color={getStatus(data)?.color as 'success' | 'error' | 'warning'}
            />
         );
      },
   },
];
