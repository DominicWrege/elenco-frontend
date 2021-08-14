
import { API_URL } from "../env";
import Episode, { EpisodeNext } from "../models/episode";
import { http } from "./http";


export namespace episode {
    export async function lazyLoad(feedId: number, offset: number): Promise<EpisodeNext> {
        //also supports limit query
        const resp = await http.get(`${API_URL}/episodes/${feedId}?offset=${offset}`);
        return resp.json();
    }

    export async function getByID(id: number): Promise<Episode> {
        const resp = await http.get(`${API_URL}/episode/${id}`);
        return resp.json();
    }
}


export default episode;