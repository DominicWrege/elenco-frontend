export interface User {
    username: string,
    permission: Permission,
    id: number
}
export enum Permission {
    user = "User",
    Admin = "Admin",
}

export interface UserShort {
    id: number,
    username; string
}