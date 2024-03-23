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
   city?: string;
   ward?: string;
   district?: string;
   address?: string;
   role?: number;
   gender?: string;
   fullname?: string;
   cccd?: string;
   birthdate?: string;
   volunteers?: Volunteer;
   hospitals?: any;
   bloodbank?: any;
   notifications?: any[];
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
