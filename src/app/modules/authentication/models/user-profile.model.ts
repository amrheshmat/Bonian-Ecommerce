import { SecurityObject } from "./security-object.model";

export class UserProfileModel {
    Username: string;
    Password: string;
    UserId: number;
    Email: string;
    Mobile: string;
    ProfileName: string;
    Address: string;
    DistrictId: number;
    UserID:number;
    ProfileID:number;
    newPassword:string;
    confirmPassword:string;
    ProfileTypeId:number;
    securityObject : SecurityObject[];
}