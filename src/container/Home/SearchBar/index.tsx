import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Typography } from '@mui/material';

export default function DateRangePickerValue({ value, setValue }) {
   return (
      <div className='container' style={{ backgroundColor: '#811315', padding: '20px' }}>
         <div style={{ backgroundColor: 'white', padding: '20px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
                  <Typography variant='subtitle2'>
                     Bạn cần đặt lịch hiến máu vào thời gian nào?
                  </Typography>
                  <DemoItem component='DateRangePicker'>
                     <DateRangePicker value={value} onChange={newValue => setValue(newValue)} />
                  </DemoItem>
               </DemoContainer>
            </LocalizationProvider>
         </div>
      </div>
   );
}
