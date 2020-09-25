import { Profile } from './profile.model';

export class Customer {
    Id: number;
    Phone: string;
    Mobile: string;
    ProfileId: number;

    CustomerNumber: string;
    Address: string;
    MaxIndebtedness: number;
    IsBanned: boolean;
    BanReasonId: number;
    Nationality: number;
    DistrictId: number;
    Advertising: number;
    IdentityTypeId: number;
    IdentityNumber: string;

    //#region model
    Profile: Profile = new Profile();
    //#endregion
}