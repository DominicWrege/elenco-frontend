import { Url } from "url";

export interface Meta {
    rss_url: string,
    language?: string
    link_web?: string,
    categories: TopCategory[]
}

export interface FeedResult {
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
}


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

export function compareByDescription(a: FeedResult, b: FeedResult): number {
    return a.description.localeCompare(b.description) ? 1 : -1;
}

export interface Completion {
    title: string,
    authorName: string
}