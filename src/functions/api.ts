import { API_URL } from "../env";
import { Author, MetaStatistic } from "../models/api";
import { http } from "./http";


export namespace api {
    export async function getAllAuthors(): Promise<Author> {
        const resp = await http.get(`${API_URL}/authors`);
        return resp.json();
    }
    export async function getMeta(): Promise<MetaStatistic> {
        const resp = await http.get(`${API_URL}/meta`);
        return resp.json();
    }
}

export default api;