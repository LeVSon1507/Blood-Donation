export interface Volunteer {
   volunteerId: number;
   birthDate: string;
   gender: number;
   fullName: string | null;
   cccd: string;
   users: null;
   registers: any[];
}

export interface User {
   userId: number;
   img: string;
   email: string;
   password: string;
   phoneNumber: string;
   city: string;
   ward: string;
   district: string;
   address: string;
   role: number;
   volunteers: Volunteer;
   hospitals: any;
   bloodbank: any;
   notifications: any[];
}

export interface Hospital {
   hospitalid: number;
   nameHospital: string;
   bloodbankid: number;
   bloodbank: null;
   users: null;
   requests: any[];
   sendBloods: any[];
   takebloods: any[];
}

export interface SearchRequest {
   requestid: number;
   hospitalid: number;
   requestDate: string;
   quantity: number;
   contact: string;
   starttime: string;
   endtime: string;
   city: string;
   ward: string;
   district: string;
   address: string;
   hospitals: Hospital;
   total: number;
   status: number;
}
