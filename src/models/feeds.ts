import { Episode } from "./episode";

export interface Meta {
    rss_url: string,
    language?: string
    linkWeb?: string,
    categories: TopCategory[]
}

export interface FeedModel {
    title: string,
    id: number,
    url: string,
    img?: string,
    imgCache?: string,
    author: string,
    linkWeb?: string,
    description: string,
    subtitle?: string,
    language?: string,
    lastModified: string, // Datetime UTC
    categories: TopCategory[],
    episodes: Episode[]
}

export interface UserFeedModel {
    id: number,
    title: string,
    subtitle?: string,
    img?: string,
    authorName: string,
    status?: FeedStatus,
    submitted: string
}


export enum FeedStatus {
    Online = "Online",
    Queued = "Queued",
    Offline = "Offline",
    Blocked = "Blocked",
}

export interface SubmittedFeeds {
    blocked: UserFeedModel[],
    online: UserFeedModel[],
    offline: UserFeedModel[],
    queued: UserFeedModel[]
}

export interface FeedPreview {
    title: string,
    id: number,
    url: string,
    img?: string,
    author: string,
    linkWeb?: string,
    description: string,
    subtitle?: string,
    language?: string,
    lastModified: string, // Datetime UTC
    categories: Map<string, Array<string>>
    episodes: Episode[]
}

export interface FeedShort {
    img?: string
    title: string,
    description: string,
    linkWeb?: string,
}

export interface Show {
    title: string,
    subtitle?: string,
    summary: string,
    link?: string
}

export interface TopCategory {
    id: number,
    description: string,
    children: Category[]
}


export interface Category {
    id: number,
    description: string,
}

export function compareByDescription(a: FeedModel, b: FeedModel): number {
    return a.description.localeCompare(b.description) ? 1 : -1;
}

export interface Completion {
    title: string,
    authorName: string
}

