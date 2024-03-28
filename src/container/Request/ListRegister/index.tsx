import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "src/utils";
import { allColumns } from "./allColumns";

const ListRegister: React.FC = () => {
  const { id } = useParams();

  const [listRegister, setListRegister] = useState([]);

  useEffect(() => {
    http.get(`Hopital/listvolunteerregister?id=${id}`).then((res) => {
      setListRegister(res?.data?.data.registers || []);
    });
  }, [id]);

  const table = useMaterialReactTable({
    columns: allColumns,
    data: listRegister,
    enableRowPinning: false,
    enableSorting: false,
    enableColumnFilters: false,
    enableFullScreenToggle: false,
    enableColumnActions: false,
    paginationDisplayMode: "pages",
    positionActionsColumn: "last",
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "whitesmoke",
      },
    },
  });

  return (
    <>
      <h4 className="mb-4">{`Danh sách tình nguyện viên đăng kí (${
        listRegister?.length || "-"
      })`}</h4>

      <MaterialReactTable table={table} />
    </>
  );
};

export default ListRegister;
