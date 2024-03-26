import { MenuItem, Typography } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "src/components/Button";
import { useAuth } from "src/context";
import { getCurrentUser, http, PRIMARY_COLOR, Role } from "src/utils";
import { allColumns } from "./allColumns";

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

  const handleEditRequest = (row) => {
    navigate(`/manage/requests/${row?.requestid}`);
  };

  const handleDeleteRequest = (row) => {};

  const table = useMaterialReactTable({
    columns: allColumns,
    data: listRequests,
    enableRowPinning: false,
    enableSorting: false,
    enableColumnFilters: false,
    enableFullScreenToggle: false,
    enableColumnActions: false,
    paginationDisplayMode: "pages",
    enableRowActions: true,
    positionActionsColumn: "last",
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "whitesmoke",
      },
    },
    renderRowActionMenuItems: ({ row }) => [
      <MenuItem key="edit" onClick={() => handleEditRequest(row?.original)}>
        Edit
      </MenuItem>,
      <MenuItem key="delete" onClick={() => handleDeleteRequest(row?.original)}>
        Delete
      </MenuItem>,
    ],
  });

  return (
    <>
      <div className="ml-4">
        <div className="w-full flex flew-row justify-between items-center">
          <Typography variant="h4" color={PRIMARY_COLOR} mb={2}>
            Requests
          </Typography>
          {currentUser?.role === Role.Hospital && (
            <Button onClick={handleAddRequest}>Tạo</Button>
          )}
        </div>
        <MaterialReactTable table={table} />
      </div>
    </>
  );
};

export default ListRequest;
