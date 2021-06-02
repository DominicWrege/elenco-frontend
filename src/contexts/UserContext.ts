import React from "react";
import { User } from "../models/user";


export interface UserContextValue {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<null | User>>
}


export const UserContext = React.createContext<UserContextValue | null>(null);
