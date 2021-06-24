import { API_URL } from "../env";
import { Author } from "../models/api";
import { http } from "./http";


export namespace api {
    export async function getAllAuthors(): Promise<Author> {
        const resp = await http.get(`${API_URL}/authors`);
        return resp.json();
    }
}

export default api;