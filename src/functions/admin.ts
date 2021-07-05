import { API_URL } from "../env";
import { FeedModerator, FeedStatus } from "../models/feeds";
import { http } from "./http";


const basePath = `${API_URL}/admin`;


export namespace admin {

    export async function newFeeds(): Promise<FeedModerator[]> {

        const resp = await http.get(`${basePath}/review/unassigned`, http.WithCredentials.Yes);
        return resp.json();
    }

    export async function assignFeeds(feedIds: number[]): Promise<void> {
        const body = {
            feedIds: feedIds
        };
        await http.patch(`${basePath}/review/assign`, body, http.WithCredentials.Yes)

    }

    export async function getReviewed(): Promise<FeedModerator[]> {
        const resp = await http.get(`${basePath}/review/reviewed`, http.WithCredentials.Yes)
        return resp.json();
    }

    export async function moderatorInbox(): Promise<FeedModerator[]> {
        const resp = await http.get(`${basePath}/review/inbox`, http.WithCredentials.Yes);
        return resp.json();
    }

    export async function reviewFeeds(feedIds: number[], action: FeedStatus): Promise<void> {
        const body = {
            action: action,
            feedIds: feedIds
        };
        await http.patch(`${basePath}/review`, body, http.WithCredentials.Yes);
    }

}