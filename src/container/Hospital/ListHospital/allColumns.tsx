import { Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { NavLink } from 'react-router-dom';
import { getDistrictByCode, getProvinceByCode, getWardByCode } from 'src/utils';

export const allColumns = (isAdmin: boolean): Array<MRT_ColumnDef<any>> => [
   {
      accessorKey: isAdmin ? 'bloodbank.nameBloodbank' : 'hospitals.nameHospital',
      header: isAdmin ? 'Blood Bank' : 'Hospital',
      size: 150,
      Cell: ({ row }) => {
         const data = row.original;
         const name = isAdmin ? data.bloodbank?.nameBloodbank : data.hospitals?.nameHospital;

         return isAdmin ? (
            <Typography variant='body1'> {name}</Typography>
         ) : (
            <NavLink to={`/manage/hospitals/${data?.userId}`} className={''}>
               {name}
            </NavLink>
         );
      },
   },
   {
      accessorKey: 'email',
      header: 'Email',
      size: 150,
   },
   {
      accessorKey: 'phoneNumber',
      header: 'Phone Number',
      size: 100,
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
];
