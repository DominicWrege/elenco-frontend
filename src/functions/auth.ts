import { API_URL, AUTH_COOKIE, LOCALE_USER_CACHE } from "../env";
import { http } from "./http";
import { Permission, User } from "../models/user";
import Cookies from "js-cookie";

export namespace auth {

    export interface LoginFields {
        email: string,
        password: string
    }

    export interface RegisterFields {
        email: string,
        password: string,
        passwordCheck: string
    }

    export async function login(fields: LoginFields): Promise<User> {
        const resp = await http.post(`${API_URL}/auth/login`, fields, http.WithCredentials.Yes);
        const user = await resp.json();
        window.localStorage.setItem(LOCALE_USER_CACHE, JSON.stringify(user));
        return user;
    }

    export function getSession(): User | null {

        if (!hasSession()) {
            return null
        }
        if (!window.localStorage.getItem(LOCALE_USER_CACHE)) {
            return null
        }
        return JSON.parse(window.localStorage[LOCALE_USER_CACHE]);
    }

    export function hasSession(): boolean {
        const cookie = Cookies.get("auth");
        return cookie !== null && cookie !== undefined;
    }

    export function isAdmin(user?: User | null): boolean {
        return user?.permission === Permission.Admin;
    }

    export async function fetchUser(): Promise<User | null> {
        try {
            const resp = await http.get(`${API_URL}/user/info`, http.WithCredentials.Yes);
            return resp.json();
        } catch (err: http.HttpError | any) {
            console.error(err);
            return null;
        }
    }

    export async function register(fields: RegisterFields): Promise<void> {
        await http.post(`${API_URL}/auth/register`, fields, http.WithCredentials.No);
    }

    export async function logout(): Promise<void> {
        if (hasSession()) {
            await http.post(`${API_URL}/auth/logout`, null, http.WithCredentials.Yes);
            if (window.localStorage.getItem(LOCALE_USER_CACHE)) {
                window.localStorage.removeItem(LOCALE_USER_CACHE);
            }
            removeCookie();
        }
    }
    export function removeCookie() {
        if (Cookies.get(AUTH_COOKIE)) {
            Cookies.remove(AUTH_COOKIE);
        }
    }
}


