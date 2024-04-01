import * as yup from 'yup';

export const schema = yup.object({
   nameActivate: yup.string().required('Tên hoạt động là bắt buộc!'),
   aImgs: yup.array().of(
      yup.object({
         Img: yup.string().required('Hãy nhập ảnh'),
      })
   ),
});
