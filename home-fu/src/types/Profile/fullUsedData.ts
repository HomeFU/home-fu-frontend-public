export type UserModel = {
    id:number,
    email: string,
    password:string,
    emailConfirmCode:string,
    role:string,
    firstName:string,
    lastName:string,
    phoneNumber:string,
    address:string,
    emergencyContactName:string,
    emergencyContactPhone:string,
    birthDate:string,
    gender:string,
    profileImageUrl: File
}