import { TopCategory } from "./category";
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
    authorName: string,
    linkWeb?: string,
    description: string,
    subtitle?: string,
    language?: string,
    submitted: string, // Datetime UTC
    categories: TopCategory[],
}


export interface FeedEpisodeModel {
    title: string,
    id: number,
    url: string,
    img?: string,
    imgCache?: string,
    authorName: string,
    linkWeb?: string,
    description: string,
    subtitle?: string,
    language?: string,
    submitted: string, // Datetime UTC
    categories: TopCategory[],
    episodes: Episode[]
}

export interface SmallFeed {
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
    blocked: SmallFeed[],
    online: SmallFeed[],
    offline: SmallFeed[],
    queued: SmallFeed[]
}

export interface FeedPreview {
    title: string,
    id: number,
    url: string,
    img?: string,
    authorName: string,
    linkWeb?: string,
    description: string,
    subtitle?: string,
    language?: string,
    submitted: string, // Datetime UTC
    categories: Map<string, Array<string>>
    episodes: Episode[]
}

export interface FeedModerator {
    id: number,
    url: string,
    title: string,
    authorName: string,
    linkWeb?: string,
    status: string,
    submitted: string,
    lastModified: string,
    language: string,
    username: string,
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

export function compareByDescription(a: FeedEpisodeModel, b: FeedEpisodeModel): number {
    return a.description.localeCompare(b.description) ? 1 : -1;
}

export interface Completion {
    title: string,
    authorName: string
}

