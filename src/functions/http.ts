export namespace http {

    export class HttpError extends Error {
        constructor(public statusCode: number, public response: Response) {
            super();
            this.statusCode = statusCode;
            this.response = response;
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
        Patch = "PATCH"
    }

    export async function post<T>(url: string, data?: T, credentials = WithCredentials.Yes): Promise<Response> {

        const context: Context<T> = {
            data: data,
            credentials: credentials,
        };
        return makeRequest(url, Method.Post, context);
    };

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
            credentials: ctx.credentials === WithCredentials.Yes ? "include" as RequestCredentials : undefined,
            headers: {
                "Content-Type": "application/json",
            },
            body: ctx.data ? JSON.stringify(ctx.data) : undefined
        };

        let resp = await fetch(url, options);
        if (resp.status !== 200) {
            throw new HttpError(resp.status, resp);
        }
        return resp;
    }
}

