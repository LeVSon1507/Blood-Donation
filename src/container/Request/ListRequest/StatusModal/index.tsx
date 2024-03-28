import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Callback, RequestStatus } from "src/utils";
import { statusOption } from "./helpers";

const StatusModal: React.FC<Props> = ({
  open,
  handleClose,
  handleChangeStatus,
  data,
}) => {
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.Approve);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"xl"}>
      <DialogTitle>Thay Đổi Trạng Thái</DialogTitle>
      <DialogContent>
        <Autocomplete
          disableClearable
          options={statusOption}
          isOptionEqualToValue={({ value }, { value: _value }) => {
            return value === _value;
          }}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" sx={{ width: 400 }} />
          )}
          onChange={(_, option) => {
            setStatus(option?.value);
          }}
          value={statusOption.find((i) => i.value === status) || null}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Đóng
        </Button>
        <Button
          type="submit"
          variant={"contained"}
          onClick={() => handleChangeStatus(status, data?.requestid)}
        >
          Cập Nhật
        </Button>
      </DialogActions>
    </Dialog>
  );
};

type Props = {
  open: boolean;
  handleClose: Callback;
  handleChangeStatus: Callback;
  data: any;
};

export default StatusModal;
