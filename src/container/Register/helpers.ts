import * as yup from 'yup';

export const schema = yup
   .object({
      email: yup
         .string()
         .email('Vui lòng nhập địa chỉ email hợp lệ')
         .required('Vui lòng nhập địa chỉ email của bạn'),
      cccd: yup.string().required('Vui lòng nhập số CCCD của bạn'),
      phoneNumber: yup.string().required('Vui lòng nhập số điện thoại của bạn'),
      birthdate: yup.string().required('Vui lòng nhập ngày sinh của bạn'),
      gender: yup.number().required('Vui lòng nhập ngày sinh của bạn'),
      fullname: yup.string().required('Vui lòng nhập tên của bạn'),
      password: yup
         .string()
         .min(8, 'Mật khẩu của bạn phải chứa ít nhất 8 ký tự')
         .required('Vui lòng nhập mật khẩu của bạn'),
      confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu phải trùng khớp'),
   })
   .required();
