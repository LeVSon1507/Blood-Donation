import * as yup from "yup";

export const schema = yup.object({
  requestDate: yup.string().nullable().required("Please enter request date"),
});

export interface RequestForm {
  requestDate: string;
  quantity: string;
  contact: string;
  starttime: string;
  img: string;
  endtime: string;
  city: string;
  ward: string;
  district: string;
  address: string;
}
