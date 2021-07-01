import { API_URL } from "../env";
import { FeedModel, FeedModerator } from "../models/feeds";
import { http } from "./http";

export namespace admin {



    export async function getIndox(): Promise<FeedModerator[]> {

        const resp = await http.get(`${API_URL}/admin/inbox`, http.WithCredentials.Yes);
        return resp.json();
    }

}