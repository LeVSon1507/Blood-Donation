import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RequestForm, schema } from "./helpers";
import {
  getAllProvinces,
  getListDistrictsByProvinceCode,
  getListWardsByDistrictCode,
  http,
} from "src/utils";
import Button from "src/components/Button";
import { toast } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { Dayjs } from "dayjs";

const CreateEditRequest: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWards, setListWards] = useState([]);

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm<RequestForm>({
    resolver: yupResolver<any>(schema),
    mode: "onChange",
    defaultValues: {
      requestDate: "",
      quantity: "",
      contact: "",
      starttime: "",
      endtime: "",
      city: "",
      ward: "",
      district: "",
      address: "",
    },
  });

  const onSubmit = (value) => {
    setIsAdding(true);
    const hospitalId = JSON.parse(localStorage.getItem("currentUser"))?.userId;

    const payload = { ...value, hospitalid: hospitalId };

    http
      .post("Hopital/AddRequest", payload)
      .then((res) => {
        toast.success("success");
        setIsAdding(false);
        reset({
          requestDate: "",
          quantity: "",
          contact: "",
          starttime: "",
          endtime: "",
          city: "",
          ward: "",
          district: "",
          address: "",
        });
      })
      .catch((err) => {
        setIsAdding(false);
        console.error("err", err);
      });
  };

  const watchCity = watch("city");
  const watchDistrict = watch("district");

  useEffect(() => {
    setListDistricts(getListDistrictsByProvinceCode(watchCity));
    setValue("district", null);
  }, [watchCity, setValue]);

  useEffect(() => {
    setListWards(getListWardsByDistrictCode(watchDistrict));
    setValue("ward", null);
  }, [watchDistrict, setValue]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="w-full px-8 pt-6">
        <h2>Add Request</h2>
        <div className="w-full pt-4">
          <form className="max-w-[600px]" onSubmit={handleSubmit(onSubmit)}>
            <Grid xs={12}>
              <Grid xs={6} mb={2} gap={1}>
                <DemoItem label="Request date">
                  <DatePicker
                    {...register("requestDate")}
                    onChange={(e: Dayjs) => {
                      setValue("requestDate", e.toISOString());
                    }}
                  />
                </DemoItem>
                {errors.requestDate && (
                  <p className="text-sm text-red-500 color-red">
                    {errors.requestDate.message}
                  </p>
                )}
              </Grid>
              <Grid xs={6} mb={2} gap={1}>
                <TextField
                  fullWidth
                  variant="standard"
                  type="number"
                  label="Quantity"
                  name="quantity"
                  placeholder="Enter your quantity"
                  {...register("quantity")}
                />
                {errors.quantity && (
                  <p className="text-sm text-red-500 color-red">
                    {errors.quantity.message}
                  </p>
                )}
              </Grid>
              <Grid xs={6} mb={2} gap={1}>
                <TextField
                  fullWidth
                  variant="standard"
                  type="text"
                  label="Contact"
                  name="contact"
                  placeholder="Enter your contact"
                  {...register("contact")}
                />
                {errors.contact && (
                  <p className="text-sm text-red-500 color-red">
                    {errors.contact.message}
                  </p>
                )}
              </Grid>
              <Grid xs={6} mb={2} gap={1}>
                <TextField
                  fullWidth
                  variant="standard"
                  type="number"
                  label="Start Time"
                  name="starttime"
                  placeholder="Enter your start time"
                  {...register("starttime")}
                />
                {errors.starttime && (
                  <p className="text-sm text-red-500 color-red">
                    {errors.starttime.message}
                  </p>
                )}
              </Grid>
              <Grid xs={6} mb={2} gap={1}>
                <TextField
                  fullWidth
                  variant="standard"
                  type="number"
                  label="End Time"
                  name="endtime"
                  placeholder="Enter your end time"
                  {...register("endtime")}
                />
                {errors.endtime && (
                  <p className="text-sm text-red-500 color-red">
                    {errors.endtime.message}
                  </p>
                )}
              </Grid>
              <Grid xs={6} mb={2} gap={1}>
                <Autocomplete
                  disablePortal
                  options={getAllProvinces()}
                  isOptionEqualToValue={({ value }, { value: _value }) =>
                    value === _value
                  }
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" label="City" />
                  )}
                  {...register("city")}
                  onChange={(_, option) => {
                    setValue("city", option?.value);
                  }}
                />
              </Grid>
              <Grid xs={6} mb={2} gap={1}>
                <Autocomplete
                  disablePortal
                  options={listDistricts}
                  isOptionEqualToValue={({ value }, { value: _value }) =>
                    value === _value
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="District"
                    />
                  )}
                  {...register("district")}
                  onChange={(_, option) => {
                    setValue("district", option?.value);
                  }}
                />
              </Grid>
              <Grid xs={6} mb={2} gap={1}>
                <Autocomplete
                  disablePortal
                  options={listWards}
                  isOptionEqualToValue={({ value }, { value: _value }) =>
                    value === _value
                  }
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" label="Ward" />
                  )}
                  {...register("ward")}
                  onChange={(_, option) => {
                    setValue("ward", option?.value);
                  }}
                />
              </Grid>
              <Grid xs={6} mb={2} gap={1}>
                <TextField
                  fullWidth
                  variant="standard"
                  type="text"
                  label="Address"
                  name="address"
                  placeholder="Enter your address"
                  {...register("address")}
                />
              </Grid>
            </Grid>
            <Button type="submit" isLoading={isAdding}>
              Tạo
            </Button>
          </form>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default CreateEditRequest;
