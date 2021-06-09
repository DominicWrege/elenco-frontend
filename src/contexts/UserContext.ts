import React from "react";
import { User } from "../models/user";

type context = User | null;

export interface UserContextValue {
    user: context,
    setUser: React.Dispatch<React.SetStateAction<context>>
}


export const UserContext = React.createContext<UserContextValue | null>(null);
