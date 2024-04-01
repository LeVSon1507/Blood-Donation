import * as yup from 'yup';

export const schema = yup
   .object({
      email: yup
         .string()
         .email('Vui lòng nhập địa chỉ email hợp lệ')
         .required('Vui lòng nhập địa chỉ email của bạn'),
      password: yup
         .string()
         .min(2, 'Mật khẩu của bạn phải chứa ít nhất 8 ký tự')
         .required('Vui lòng nhập mật khẩu của bạn'),
   })
   .required();
