import { API_URL } from "../env"
import { FeedResult } from "../models/feeds";
import { http } from "./http"

export async function getByName(name: string): Promise<FeedResult> {
    const url = encodeURI(`${API_URL}/api/feed/${name}`);
    // const url = `${API_URL}/api/feed/${name}`;
    // console.log(url);

    const resp = await http.get(url);
    if (resp.status === 400) {
        throw "Feed was not found";
    }
    return resp.json();
}


export default {}