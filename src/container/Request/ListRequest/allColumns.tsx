import { Typography } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { NavLink } from "react-router-dom";
import {
  formatDate,
  getDistrictByCode,
  getProvinceByCode,
  getWardByCode,
} from "src/utils";

export const allColumns: Array<MRT_ColumnDef<any>> = [
  {
    accessorKey: "hospitals.nameHospital",
    header: "Hospital",
    size: 150,
    Cell: ({ row }) => {
      const data = row.original;
      const name = data.hospitals?.nameHospital;

      return (
        <NavLink to={`/manage/hospitals/${data?.userId}`} className={""}>
          {name}
        </NavLink>
      );
    },
  },
  {
    accessorKey: "requestDate",
    header: "Request Date",
    size: 60,
    Cell: ({ row }) => {
      const requestDate = row.original?.requestDate;

      return <Typography>{formatDate(requestDate)}</Typography>;
    },
  },
  {
    accessorKey: "contact",
    header: "Contact",
    size: 100,
  },
  {
    accessorKey: "starttime",
    header: "Start Time",
    size: 50,
  },
  {
    accessorKey: "endtime",
    header: "End Time",
    size: 50,
  },
  {
    accessorKey: "address",
    header: "Address",
    size: 200,
    Cell: ({ row }) => {
      const data = row.original;

      const address = [
        data?.address,
        getWardByCode(data?.ward)?.name,
        getDistrictByCode(data?.district)?.name,
        getProvinceByCode(data?.city)?.name,
      ]
        .filter((item) => item)
        .join(", ");

      return <Typography fontSize={14}>{address}</Typography>;
    },
  },
];
