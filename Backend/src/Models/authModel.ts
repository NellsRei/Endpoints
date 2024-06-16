export interface User{
    Id: string,
    Name: string,
    Email: string,
    Password:string,
    isDeleted:number,
    isEmailSent: number
}

export interface Payload{
    Sub: string,
    Name: string
}