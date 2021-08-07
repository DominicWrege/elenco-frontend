import { API_URL } from "../env";
import CommentModel, { NewComment } from "../models/comment";
import { http } from "./http";

export namespace comment {

    export async function post(body: NewComment): Promise<CommentModel> {
        const resp = await http.post(`${API_URL}/comment`, body, http.WithCredentials.Yes);
        const comment: CommentModel = await resp.json();
        return comment;
    }

    export async function get_for_feed(feedId: number): Promise<CommentModel[]> {
        const resp = await http.get(`${API_URL}/comments/${feedId}`, http.WithCredentials.No);
        const comments: CommentModel[] = await resp.json();
        return comments;
    }
}


export default comment;