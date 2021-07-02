import { API_URL } from "../env";
import { FeedModerator } from "../models/feeds";
import { http } from "./http";

export namespace admin {

    export async function getInbox(): Promise<FeedModerator[]> {

        const resp = await http.get(`${API_URL}/admin/all-unassigned`, http.WithCredentials.Yes);
        return resp.json();
    }

    export async function assignFeeds(feedIds: number[]): Promise<void> {

        const body = {
            feedIds: feedIds
        };

        await http.post(`${API_URL}/admin/assign-for-review`, body, http.WithCredentials.Yes)


    }

}