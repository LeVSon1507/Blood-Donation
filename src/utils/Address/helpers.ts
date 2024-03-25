import { districts } from './district';
import { provinces } from './province';
import { wards } from './ward';

export const getAllProvinces = () => {
   return provinces.map(item => ({
      label: item.name,
      value: item.code.toString(),
   }));
};

export const getListDistrictsByProvinceCode = (provinceId: string) => {
   return districts
      .filter(item => item.province_code === +provinceId)
      ?.map(item => ({
         label: item.name,
         value: item.code.toString(),
      }));
};

export const getListWardsByDistrictCode = (districtId: string) => {
   return wards
      .filter(item => item.district_code === +districtId)
      ?.map(item => ({
         label: item.name,
         value: item.code.toString(),
      }));
};

export const getWardByCode = (code: string) => {
   if (!code) return null;
   return wards.find(item => item.code === +code);
};

export const getDistrictByCode = (code: string) => {
   if (!code) return null;
   return districts.find(item => item.code === +code);
};

export const getProvinceByCode = (code: string) => {
   if (!code) return null;
   return provinces.find(item => item.code === +code);
};
