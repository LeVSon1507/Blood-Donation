export type QuantitySend = {
   quantitysendid: number;
   numberbloodid: number;
   sendBloodid: number;
   bloodtypeid: number;
   quantity: number;
   sendBlood: string;
   numberBlood: {
      numberbloodid: number;
      quantity: number;
      quantitySends: string[];
      quantityTake: string[];
   };
   bloodtypes: string;
};

export type SendBlood = {
   sendBloodid: number;
   hospitalid: number;
   bloodbankid: number;
   datesend: string;
   status: number;
   hospitals: string;
   bloodbank: string;
   quantitySends: QuantitySend[];
};

export type BloodBank = {
   bloodbankid: number;
   nameBloodbank: string;
   users: string;
   sendBloods: SendBlood[];
};

export type Hospital = {
   hospitalid: number;
   nameHospital: string;
   bloodbankid: number;
   bloodbank: BloodBank;
   requests: {
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
      status: number;
      hospitals: string;
      registers: string[];
   }[];
};

export interface Volunteer {
   volunteerId: number;
   birthDate: string;
   gender: number;
   fullname: string;
   cccd: string;
   users: null;
   registers: any[];
}

export interface User {
   userId: number;
   img?: string;
   email?: string;
   password?: string;
   phoneNumber?: string;
   city?: any;
   ward?: any;
   district?: any;
   address?: string;
   role?: Role;
   gender?: number;
   fullname?: string;
   cccd?: string;
   birthdate?: string;
   volunteers?: Volunteer;
   hospitals?: Hospital;
   bloodbank?: any;
   nameHospital?: string;
   nameBloodbank?: string;
   notifications?: any[];
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

export type NewArticle = {
   article_id: string;
   title: string;
   link: string;
   keywords: string[];
   creator: string[];
   video_url: string;
   description: string;
   content: string;
   pubDate: string;
   image_url: string;
   source_id: string;
   source_url: string;
   source_icon: string;
   source_priority: number;
   country: string[];
   category: string[];
   language: string;
   ai_tag: string;
   sentiment: string;
   sentiment_stats: string;
   ai_region: string;
};

export enum Role {
   Volunteer = 1,
   Hospital = 2,
   BloodBank = 3,
   Admin = 4,
}

export enum RequestStatus {
   Approve = 1,
   Pending = 0,
   Reject = 2,
}

export enum NotificationStatus {
   NOT_READ = 0,
   READ = 1,
}

export type BloodTotalDTO = {
   numberbloodid: number;
   quantity: number;
   total: number;
};

export type ListBloodType = {
   bloodtypeid: number;
   nameBlood: string;
   totalBloodDTOs: BloodTotalDTO[];
};

export type Notification = {
   notificationId: number;
   userid: number;
   content: string;
   datepost: string;
   status: number;
   users: any[] | null; // Sử dụng any[] nếu users có thể là một mảng các đối tượng cụ thể
};
