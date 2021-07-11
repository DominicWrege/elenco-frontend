import { FeedPreview, FeedStatus } from "./feeds";

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

export interface Author {
    id: number,
    name: string
}

export interface FeedUserInfo {
    hasSubscribed: boolean,
    isOwner: boolean,
    status: FeedStatus | null
}

export interface MetaStatistic {
    episodesDuration: number,
    countEpisodes: number,
    countAuthors: number,
    countFeeds: number,
}

export default ApiError;