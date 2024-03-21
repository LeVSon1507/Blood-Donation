import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { schema } from "./helpers";
import { http } from "src/utils";
import { Grid, TextField, Typography } from "@mui/material";
import logo1 from "src/assets/images/undraw_doctors_p6aq.svg";
import Button from "src/components/Button";

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    http
      .post("user/register", data)
      .then((res) => {
        navigate("/login");
        toast.success("Register Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.data?.message);
      });
  };
  return (
    <div className="minH-[100vh] h-[100vh] w-[100%]  pt-10">
      <div className="max-w-[1000px] mx-auto px-5">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center cursor-pointer">
            <img
              src={logo1}
              alt="logoT"
              width={160}
              height={160}
              className="bg-white p-2 rounded-full"
            />
          </div>
          <Typography variant="h4" component="h2">
            Giọt Máu Hồng
          </Typography>
        </div>
        <form
          className="mx-auto max-w-[600px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid xs={12} mb={2} gap={1}>
            <TextField
              fullWidth
              variant="standard"
              type="text"
              label="Email"
              name="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500 color-red">
                {errors.email.message}
              </p>
            )}
          </Grid>
          <Grid xs={12} mb={2} gap={1}>
            <TextField
              fullWidth
              variant="standard"
              type="password"
              label="Password"
              name="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500 color-red">
                {errors.password.message}
              </p>
            )}
          </Grid>
          <Grid xs={12} mb={2} gap={1}>
            <TextField
              fullWidth
              variant="standard"
              type="password"
              label="Confirm password"
              name="confirmPassword"
              placeholder="Enter your password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 color-red">
                {errors.confirmPassword.message}
              </p>
            )}
          </Grid>

          <div className="w-full flex justify-center gap-10 mb-4">
            <Button styleClass={"w-full"}>Submit</Button>
          </div>
          <div className="text-sm justify-center flex text-grayCustom">
            <span className="inline-block mr-1">Already have an account? </span>
            <NavLink to={"/login"} className="font-semibold cursor-pointer">
              Sign in
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
