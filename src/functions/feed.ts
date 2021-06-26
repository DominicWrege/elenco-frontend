import { API_URL } from "../env"
import { FeedEpisodeModel, FeedModel, UserFeedModel } from "../models/feeds";
import { http } from "./http"



export namespace feed {
    export async function getByName(name: string): Promise<FeedEpisodeModel> {
        const url = encodeURI(`${API_URL}/feed/${name}`);
        // const url = `${API_URL}/api/feed/${name}`;
        // console.log(url);
        const resp = await http.get(url, http.WithCredentials.Yes);
        return resp.json();
    }


    export async function getRelated(feedId: number): Promise<UserFeedModel[]> {
        const resp = await http.get(`${API_URL}/feed/${feedId}/related`);
        return resp.json();
    }

    export async function getByCategory(categoryName: string): Promise<FeedEpisodeModel> {
        const uri = decodeURI(`${API_URL}/category/${categoryName}/feeds`);
        const resp = await http.get(uri);
        return resp.json();
    }

    export async function getByAuthor(name: string) {
        const uri = decodeURI(`${API_URL}/author/${name}/feeds`);
        const resp = await http.get(uri);
        return resp.json();
    }

    // export function intoSmallFeed(feed: FeedModel): UserFeedModel {

    //     return {

    //     }
    // }

}

export default feed;