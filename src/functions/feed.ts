import { API_URL } from "../env"
import { FeedModel, UserFeedModel } from "../models/feeds";
import { http } from "./http"

export async function getByName(name: string): Promise<FeedModel> {
    const url = encodeURI(`${API_URL}/api/feed/${name}`);
    // const url = `${API_URL}/api/feed/${name}`;
    // console.log(url);
    const resp = await http.get(url, http.WithCredentials.Yes);
    return resp.json();
}


export async function getRelated(feedId: number): Promise<UserFeedModel[]> {
    const resp = await http.get(`${API_URL}/api/feed/${feedId}/related`);
    return resp.json();
}


export default getByName;