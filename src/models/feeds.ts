import { Episode } from "./episode";

export interface Meta {
    rss_url: string,
    language?: string
    link_web?: string,
    categories: TopCategory[]
}

export interface FeedModel {
    title: string,
    id: number,
    url: string,
    img?: string,
    img_cache?: string,
    author: string,
    link_web?: string,
    description: string,
    subtitle?: string,
    language?: string,
    last_modified: string, // Datetime UTC
    categories: TopCategory[],
    episodes: Episode[]
}

/// <reference path="./episode.ts" />
export interface FeedPreview {
    title: string,
    id: number,
    url: string,
    img?: string,
    author: string,
    link_web?: string,
    description: string,
    subtitle?: string,
    language?: string,
    last_modified: string, // Datetime UTC
    categories: Map<string, Array<string>>
    episodes: Episode[]
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

