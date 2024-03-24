import { Typography } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/context";
import { getCurrentUser, http, PRIMARY_COLOR, Role } from "src/utils";
import { allColumns } from "./allColumns";
import Button from "src/components/Button";

const ListRequest: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const currentUser = user?.userId ? user : getCurrentUser();

  const [listRequests, setListRequests] = useState([]);

  useEffect(() => {
    const requestId = currentUser?.userId;

    if (currentUser?.role === Role.Hospital) {
      http.get(`Hopital/listRequest?id=${requestId}`).then((res) => {
        setListRequests(res?.data?.data);
      });
    }
    if (currentUser?.role === Role.BloodBank) {
      http
        .get(`Manager/listRequestsByBloodbank?bloodbankid=${requestId}`)
        .then((res) => {
          setListRequests(res?.data?.data);
        });
    }
    // eslint-disable-next-line
  }, [currentUser?.userId]);

  const handleAddRequest = () => {
    navigate("/manage/create-requests");
  };

  const table = useMaterialReactTable({
    columns: allColumns,
    data: listRequests,
    enableRowPinning: false,
    enableSorting: false,
    enableColumnFilters: false,
    enableFullScreenToggle: false,
    enableColumnActions: false,
    paginationDisplayMode: "pages",
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "whitesmoke",
      },
    },
  });

  return (
    <div className="ml-4">
      <div className="w-full flex flew-row justify-between items-center">
        <Typography variant="h4" color={PRIMARY_COLOR} mb={2}>
          Requests
        </Typography>
        <Button onClick={handleAddRequest}>Tạo</Button>
      </div>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default ListRequest;
