import { districts } from "./district";
import { provinces } from "./province";
import { wards } from "./ward";

export const getAllProvinces = () => {
  return provinces.map((item) => ({
    label: item.name,
    value: item.code.toString(),
  }));
};

export const getListDistrictsByProvinceCode = (provinceId: string) => {
  return districts
    .filter((item) => item.province_code === +provinceId)
    ?.map((item) => ({
      label: item.name,
      value: item.code.toString(),
    }));
};

export const getListWardsByDistrictCode = (districtId: string) => {
  return wards
    .filter((item) => item.district_code === +districtId)
    ?.map((item) => ({
      label: item.name,
      value: item.code.toString(),
    }));
};
