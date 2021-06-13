import { API_URL } from "../env";
import { SubmittedFeeds } from "../models/feeds";
import { http } from "./http";


export namespace user{
    export async function getSubmittedFeeds(): Promise<SubmittedFeeds> {

        const resp = await http.get(`${API_URL}/user/feeds`, http.WithCredentials.Yes);
        const feeds: SubmittedFeeds = await resp.json();
        return feeds;
    }
}

