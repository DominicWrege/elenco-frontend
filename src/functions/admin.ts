import { API_URL } from "../env";
import { FeedModerator, FeedStatus } from "../models/feeds";
import { http } from "./http";

export namespace admin {

    export async function newFeeds(): Promise<FeedModerator[]> {

        const resp = await http.get(`${API_URL}/admin/all-unassigned`, http.WithCredentials.Yes);
        return resp.json();
    }

    export async function assignFeeds(feedIds: number[]): Promise<void> {
        const body = {
            feedIds: feedIds
        };
        await http.post(`${API_URL}/admin/assign-for-review`, body, http.WithCredentials.Yes)

    }

    export async function moderatorInbox(): Promise<FeedModerator[]> {
        const resp = await http.get(`${API_URL}/admin/inbox`, http.WithCredentials.Yes);
        return resp.json();
    }

    export async function reviewFeeds(feedIds: number[], action: FeedStatus): Promise<void> {
        const body = {
            action: action,
            feedIds: feedIds
        };
        await http.patch(`${API_URL}/admin/review`, body, http.WithCredentials.Yes);
    }

}