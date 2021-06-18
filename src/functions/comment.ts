import { API_URL } from "../env";
import { NewComment } from "../models/comment";
import { http } from "./http";

export namespace comment{

    export async function post(body: NewComment): Promise<Comment> {
        const resp = await http.post(`${API_URL}/api/comment`, body, http.WithCredentials.Yes);
        const comment: Comment = await resp.json();
        return comment;
    }

    export async function get_for_feed(feedId: number) : Promise<Comment[]>{
        const resp = await http.get(`${API_URL}/api/comment/${feedId}`, http.WithCredentials.Yes);
        const comments: Comment[] = await resp.json();
        return comments;
    }
}


export default comment;