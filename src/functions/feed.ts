import { API_URL } from "../env"
import { FeedEpisodeModel, FeedModel, FeedSmall, FeedStatus } from "../models/feeds";
import { http } from "./http"


export namespace feed {
    export async function getByName(name: string): Promise<FeedEpisodeModel> {
        const url = encodeURI(`${API_URL}/feed/${name}`);
        // const url = `${API_URL}/api/feed/${name}`;
        // console.log(url);
        const resp = await http.get(url, http.WithCredentials.Yes);

        return resp.json();
    }

    export async function getRecent(): Promise<FeedSmall[]> {
        const resp = await http.get(`${API_URL}/feeds/recent`);
        return resp.json();
    }

    export async function getTop25(): Promise<FeedSmall[]> {
        const resp = await http.get(`${API_URL}/feeds/top`);
        return resp.json();
    }

    export async function getRelated(feedId: number): Promise<FeedSmall[]> {
        const resp = await http.get(`${API_URL}/feed/${feedId}/related`);
        return resp.json();
    }

    export async function getByCategory(categoryName: string): Promise<FeedSmall[]> {
        const uri = decodeURI(`${API_URL}/category/${categoryName}/feeds`);
        const resp = await http.get(uri);
        const json = await resp.json();
        return json.map(intoSmallFeed);
    }

    export async function getByAuthor(name: string): Promise<FeedSmall[]> {
        const uri = decodeURI(`${API_URL}/author/${name}/feeds`);
        const resp = await http.get(uri);
        const json = await resp.json();
        return json.map(intoSmallFeed);
    }

    export function intoSmallFeed(feed: FeedModel): FeedSmall {

        return {
            id: feed.id,
            title: feed.title,
            subtitle: feed.subtitle,
            img: feed.imgCache,
            authorName: feed.authorName,
            submitted: feed.submitted
        };
    }

    export async function update(feedId: number, action: FeedStatus): Promise<void> {
        const body = {
            feedId,
            action
        };

        await http.patch(`${API_URL}/feed/update`, body, http.WithCredentials.Yes);
    }

}

export default feed;