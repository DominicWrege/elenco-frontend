import { API_URL } from "../env"
import { FeedModel } from "../models/feeds";
import { http } from "./http"

export async function getByName(name: string): Promise<FeedModel> {
    const url = encodeURI(`${API_URL}/api/feed/${name}`);
    // const url = `${API_URL}/api/feed/${name}`;
    // console.log(url);
    const resp = await http.get(url);
    return resp.json();
}


export default getByName;