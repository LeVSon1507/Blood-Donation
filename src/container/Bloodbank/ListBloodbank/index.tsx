import { Typography } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "src/context";
import {
  BloodTotalDTO,
  getCurrentUser,
  http,
  ListBloodType,
  PRIMARY_COLOR,
} from "src/utils";
import { allColumns } from "./allColumns";
import Button from "src/components/Button";
import RequestBloodForm from "../RequestBloodForm";
import { ToastError, ToastSuccess } from "src/utils/toastOptions";
import dayjs from "dayjs";
import AddBloodModal from "../AddBloodModal";

export type QuantityTake = {
  numberbloodid: number;
  quantity: number;
};

const ListBlood: React.FC = () => {
  const { user } = useAuth();
  const bloodTypeId = useRef<number>();
  const currentUser = user?.userId ? user : getCurrentUser();

  const [listBlood, setListBlood] = useState<ListBloodType[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalBloodOfType, setTotalBloodOfType] = useState<BloodTotalDTO>();
  const [quantityTake, setQuantityTake] = React.useState<QuantityTake[]>([]);
  const [openAddBlood, setOpenAddBlood] = useState(false);

  useEffect(() => {
    http
      .get(`Hopital/displaysremainingblood?id=${currentUser?.userId}`)
      .then((res) => {
        setListBlood(res?.data?.data);
      });
  }, [currentUser?.userId, quantityTake]);

  const onRequestBlood = async () => {
    const body = {
      hospitalid: currentUser?.userId,
      datetake: dayjs(),
      bloodtypeid: bloodTypeId.current,
      quantityTake: quantityTake,
    };
    setIsLoading(true);
    http
      .post(`Hopital/addtakeblood`, body)
      .then((res) => {
        ToastSuccess(res?.data?.message ?? "Yêu cầu gửi thành công!");
        setOpen(false);
        setQuantityTake([]);
        setIsLoading(false);
      })
      .catch((err) => {
        ToastError("Không gửi được yêu cầu!");
        setIsLoading(false);
      });
  };

  const handleAddBloodSuccess = () => {
    http
      .get(`Hopital/displaysremainingblood?id=${currentUser?.userId}`)
      .then((res) => {
        setListBlood(res?.data?.data);
      });
  };

  const handleAddBlood = () => {
    setOpenAddBlood(true);
  };

  const handleRequestBlood = (id: number, totalBloodDTOs: any) => {
    bloodTypeId.current = id;
    setTotalBloodOfType(totalBloodDTOs);
    setOpen(true);
  };

  const table = useMaterialReactTable({
    columns: allColumns(handleRequestBlood),
    data: listBlood,
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
          Danh sách máu đang có trong kho
        </Typography>
        <Button onClick={handleAddBlood}>Tạo</Button>
      </div>
      <MaterialReactTable table={table} />
      <RequestBloodForm
        data={totalBloodOfType}
        setOpen={setOpen}
        isLoading={isLoading}
        open={open}
        setQuantityTake={setQuantityTake}
        quantityTake={quantityTake}
        onRequestBlood={onRequestBlood}
      />

      <AddBloodModal
        open={openAddBlood}
        handleClose={() => setOpenAddBlood(false)}
        handleAddSuccess={handleAddBloodSuccess}
      />
    </div>
  );
};

export default ListBlood;
