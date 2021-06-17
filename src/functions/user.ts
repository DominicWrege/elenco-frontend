import { API_URL } from "../env";
import { SubmittedFeeds } from "../models/feeds";
import { http } from "./http";


export namespace user{
    export async function getSubmittedFeeds(): Promise<SubmittedFeeds> {
        const resp = await http.get(`${API_URL}/user/feeds`, http.WithCredentials.Yes);
        const feeds: SubmittedFeeds = await resp.json();
        return feeds;
    }

    export async function subscribe(feedId: number): Promise<void> {
        const payload = {
            feedId: feedId
        };
        await http.post(`${API_URL}/api/feed/subscribe`, payload, http.WithCredentials.Yes);
    }
    export async function unsubscribe(feedId: number): Promise<void> {
        const payload = {
            feedId: feedId
        };
        await http.post(`${API_URL}/api/feed/unsubscribe`, payload, http.WithCredentials.Yes);
    }
    export async function has_subscription(feedId: number): Promise<boolean> {
        const payload = {
            feedId: feedId
        };
        const resp = await http.post(`${API_URL}/user/has-subscription`, payload, http.WithCredentials.Yes);
        const json = await resp.json();
        return json.isSubscripted ?? false;
    }
}

