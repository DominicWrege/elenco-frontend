import { FeedPreview } from "./feeds";

export interface ApiError {
    message: string
    statusCode: number
}


export interface PreviewJson {
    exists: boolean,
    feed: FeedPreview
}


export interface FormBody {
    feedUrl: string
}


export default ApiError;