import { UserShort } from "./user";


export interface CommentModel {
    id: number,
    feedId: number,
    content:string,
    created: string
    user: UserShort
}

export interface NewComment{
    userId: number,
    feedId: number,
    content: string
}

export default CommentModel;