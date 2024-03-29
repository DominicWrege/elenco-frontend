import { API_URL } from "../env";
import { FeedUserInfo } from "../models/api";
import { SubmittedFeeds, FeedSmall } from "../models/feeds";
import { http } from "./http";


export namespace user {
    export async function getSubmittedFeeds(): Promise<SubmittedFeeds> {
        const resp = await http.get(`${API_URL}/user/feeds`, http.WithCredentials.Yes);
        const feeds: SubmittedFeeds = await resp.json();
        return feeds;
    }

    export async function subscribe(feedId: number): Promise<void> {
        const payload = {
            feedId: feedId
        };
        await http.post(`${API_URL}/subscription`, payload, http.WithCredentials.Yes);
    }

    export async function unsubscribe(feedId: number): Promise<void> {
        const payload = {
            feedId: feedId
        };
        await http.delete_(`${API_URL}/subscription`, payload, http.WithCredentials.Yes);
    }

    export async function getSubscriptions(): Promise<FeedSmall[]> {
        const resp = await http.get(`${API_URL}/subscription/user`, http.WithCredentials.Yes);
        const feeds = await resp.json();
        return feeds;
    }

    export async function getSubscriptionInfo(feedId: number): Promise<FeedUserInfo> {
        const payload = {
            feedId: feedId
        };
        const resp = await http.post(`${API_URL}/subscription/user`, payload, http.WithCredentials.Yes);
        return resp.json();
    }
}

