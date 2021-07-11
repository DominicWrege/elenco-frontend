import { API_URL } from "../env";
import { Author, MetaStatistic } from "../models/api";
import { EpisodeNext } from "../models/episode";
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

    export async function getMoreEpsiodes(feedId: number, offset: number): Promise<EpisodeNext> {
        //also supports limit query
        const resp = await http.get(`${API_URL}/feed/${feedId}/episodes?offset=${offset}`)
        return resp.json();
    }
}

export default api;