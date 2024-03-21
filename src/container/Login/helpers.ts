import * as yup from "yup";

export const schema = yup
  .object({
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
