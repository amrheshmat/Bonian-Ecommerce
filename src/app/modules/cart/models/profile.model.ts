
export class Profile {
    Id: number;
    ProfileName: string;
    NormalizeName :string;
    
    ProfileTypeId :number;
    SaaSProfileId :number;

    Address: string;
    Email: string;
    Description:string;    
    IsActive: string;
    
    CreationTime :Date;
    CreatedBy :number;
    ModificationTime :Date;
    ModifiedBy :number;
}