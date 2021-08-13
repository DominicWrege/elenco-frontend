import ApiError from "../models/api";

export namespace http {

    export class HttpError extends Error {

        constructor(public response: Response, public json: ApiError) {
            super(response.statusText);
            this.response = response;
            this.json = json;
        }

    }

    export enum WithCredentials {
        No = 0,
        Yes
    }

    enum Method {
        Post = "POST",
        Get = "GET",
        Put = "PUT",
        Patch = "PATCH",
        Delete = "DELETE"
    }

    export async function post<T>(url: string, data?: T, credentials = WithCredentials.Yes): Promise<Response> {

        const context: Context<T> = {
            data: data,
            credentials: credentials,
        };
        return makeRequest(url, Method.Post, context);
    }

    export async function delete_<T>(url: string, data?: T, credentials = WithCredentials.Yes) {
        const context: Context<T> = {
            data: data,
            credentials: credentials,
        };
        return makeRequest(url, Method.Delete, context);
    }


    export async function patch<T>(url: string, data?: T, credentials = WithCredentials.No): Promise<Response> {
        const context: Context<T> = {
            data: data,
            credentials: credentials,
        };
        return makeRequest(url, Method.Patch, context);
    }


    export async function get<T>(url: string, credentials = WithCredentials.No): Promise<Response> {
        const context: Context<T> = {
            credentials: credentials,
        };
        return makeRequest(url, Method.Get, context);
    }


    interface Context<T> {
        data?: T,
        credentials: WithCredentials,
    }

    export async function makeRequest<T>(url: string, method: Method, ctx: Context<T>): Promise<Response> {

        const options = {
            method: method,
            mode: "cors" as RequestMode,
            credentials: ctx.credentials === WithCredentials.Yes ? "include" as RequestCredentials : undefined,
            headers: {
                "Content-Type": "application/json",
            },
            body: ctx.data ? JSON.stringify(ctx.data) : undefined
        };
        let resp = await fetch(url, options);
        if (resp.status >= 400) {
            throw new HttpError(resp, await resp.json());
        }

        return resp;
    }
}

