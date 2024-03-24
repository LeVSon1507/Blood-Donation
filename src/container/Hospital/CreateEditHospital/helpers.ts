import * as yup from "yup";

export const schema = yup
  .object({
    nameHospital: yup.string().nullable().required("Please enter your name"),
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter your email address"),
    password: yup
      .string()
      .min(2, "Your password must be at least 8 characters or greater")
      .required("Please enter your password"),
  })
  .required();

export interface BloodBankForm {
  phoneNumber: string;
  email: string;
  password: string;
  city: string;
  district: string;
  address: string;
  nameHospital: string;
  ward: string;
}
