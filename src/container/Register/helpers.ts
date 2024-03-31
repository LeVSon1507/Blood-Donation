import * as yup from 'yup';

export const schema = yup
   .object({
      email: yup
         .string()
         .email('Please enter valid email address')
         .required('Please enter your email address'),
      cccd: yup.string().required('Please enter your cccd'),
      fullname: yup.string().required('Please enter your name'),
      password: yup
         .string()
         .min(8, 'Your password must be at least 8 characters or greater')
         .required('Please enter your password'),
      confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
   })
   .required();
