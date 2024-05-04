import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "src/context";
import { Callback, getCurrentUser, http } from "src/utils";

const listBloodType = [
  {
    bloodtypeid: 2,
    value: 2,
    label: "A",
  },
  {
    bloodtypeid: 3,
    value: 3,
    label: "B",
  },
  {
    bloodtypeid: 4,
    value: 4,
    label: "AB",
  },
  {
    bloodtypeid: 5,
    value: 5,
    label: "O",
  },
];

const AddBloodModal: React.FC<Props> = ({
  open,
  handleClose,
  handleAddSuccess,
}) => {
  const { user } = useAuth();
  const currentUser = user?.userId ? user : getCurrentUser();

  const [bloodType, setBloodType] = useState<any>(null);
  const [listNumberBlood, setListNumberBlood] = useState([]);

  const [numberBlood, setNumberBlood] = useState<any>({});

  useEffect(() => {
    http.get("hopital/listnumberblood").then((res) => {
      setListNumberBlood(res?.data?.data || []);
      const initialNumberBlood = res?.data?.data?.reduce((acc, item) => {
        return {
          ...acc,
          [item?.numberbloodid]: 0,
        };
      }, {});

      setNumberBlood(initialNumberBlood);
    });
  }, []);

  const handleAddBlood = () => {
    http
      .post("Hopital/addsendblood", {
        hospitalid: currentUser?.userId,
        datesend: new Date(),
        bloodtypeid: bloodType?.value,
        quantitySend: listNumberBlood?.map((item) => {
          return {
            numberbloodid: item?.numberbloodid,
            quantity: +numberBlood[item?.numberbloodid],
          };
        }),
      })
      .then(() => {
        handleClose();
        handleAddSuccess();
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={"sm"}
      fullWidth
      keepMounted={false}
    >
      <DialogTitle>Thêm máu vào kho</DialogTitle>
      <DialogContent>
        <h3 className="text-base font-medium">Chọn loại máu</h3>
        <Autocomplete
          options={listBloodType}
          getOptionLabel={(option) => {
            return option.label || "";
          }}
          isOptionEqualToValue={({ value }, { value: _value }) => {
            return value === _value;
          }}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
          onChange={(_, option) => {
            setBloodType(option);
          }}
          value={bloodType || null}
        />

        <h3 className="text-base font-medium mt-4">Điền số lượng máu</h3>
        <div className="flex flex-row gap-2 mt-4">
          {listNumberBlood?.map((item) => {
            return (
              <TextField
                label={item?.quantity}
                variant="outlined"
                type="number"
                value={numberBlood[item?.numberbloodid]}
                onChange={(e) => {
                  const value = e.target.value;
                  setNumberBlood({
                    ...numberBlood,
                    [item?.numberbloodid]: value,
                  });
                }}
              />
            );
          })}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Đóng
        </Button>
        <Button type="submit" variant={"contained"} onClick={handleAddBlood}>
          Yêu Cầu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

type Props = {
  open: boolean;
  handleClose: Callback;
  handleAddSuccess: Callback;
};

export default AddBloodModal;
