import { Typography } from "@mui/material";
import React from "react";
import { PRIMARY_COLOR } from "src/utils";

const RegisterSection: React.FC = () => {
  return (
    <div className="w-full shadow-md px-6 py-6 rounded-xl">
      <Typography variant="h6" fontWeight={500} color={PRIMARY_COLOR} mb={2}>
        Danh sách tình nguyên viên đăng kí
      </Typography>
    </div>
  );
};

export default RegisterSection;
