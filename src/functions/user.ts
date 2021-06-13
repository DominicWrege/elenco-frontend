import { API_URL } from "../env";
import { UserFeedModel } from "../models/feeds";
import { http } from "./http";


export namespace user{
    export async function getSubmittedFeeds(): Promise<UserFeedModel[]> {

        const resp = await http.get(`${API_URL}/user/feeds`, http.WithCredentials.Yes);
        const feeds: UserFeedModel[] = await resp.json();
        return feeds;
    }
}

