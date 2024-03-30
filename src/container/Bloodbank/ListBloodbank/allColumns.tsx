import { Button, Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { isEmpty } from 'src/utils';

export const allColumns = (
   handleRequestBlood: (bloodtypeid: number, totalBloodDTOs: any) => void
): Array<MRT_ColumnDef<any>> => [
   {
      accessorKey: 'nameBlood',
      header: 'Tên Máu',
      size: 150,
      Cell: ({ row }) => {
         const data = row.original;
         const name = data?.nameBlood;

         return <Typography variant='body1'>{name}</Typography>;
      },
   },
   {
      accessorKey: 'totalBloodDTOs[0]',
      header: 'Số Lượng Bình Máu',
      size: 150,
      Cell: ({ row }) => {
         const data = row.original;

         return (
            <>
               {isEmpty(data?.totalBloodDTOs) ? (
                  <Typography variant='body1'>Kho máu trống</Typography>
               ) : (
                  data?.totalBloodDTOs.map(item => {
                     return (
                        <>
                           <Typography variant='body1'>
                              Bình máu dung lượng{' '}
                              {isEmpty(item?.quantity) ? '' : `${item?.quantity} ml`} có số lượng
                              là: <strong>{item?.total ?? 0}</strong> bình
                           </Typography>
                        </>
                     );
                  })
               )}
            </>
         );
      },
   },
   {
      accessorKey: 'action',
      header: 'Yêu cầu lấy máu từ kho máu',
      size: 150,
      Cell: ({ row }) => {
         const data = row.original;
         const emptyBloodInBank = isEmpty(data?.totalBloodDTOs);

         return (
            <>
               <Button
                  variant='contained'
                  onClick={() => handleRequestBlood(data?.bloodtypeid, data?.totalBloodDTOs)}
                  color='warning'
                  disabled={emptyBloodInBank}
               >
                  {emptyBloodInBank ? 'Không thể yêu cầu' : 'Yêu cầu'}
               </Button>
            </>
         );
      },
   },
];
