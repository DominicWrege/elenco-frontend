import { API_URL } from "../env";
import { Author, Image, MetaStatistic } from "../models/api";
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

    export async function getImage(feedTitle: string): Promise<Image> {
        let uri = encodeURI(`${API_URL}/img-path/${feedTitle}`);
        const resp = await http.get(uri);

        let json: Image = await resp.json();

        return {
            feedId: json.feedId,
            img: `${API_URL}/img/${json.img}`
        };
    }

}

export default api;