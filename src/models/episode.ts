import { Show } from "./feeds";

export interface Episode {
    title: string,
    description?: string
    duration?: number
    keywords?: string[],
    explicit: boolean,
    published?: string,
    showNotes: string,
    webLink?: string,
    guid: string,
    enclosure: Enclosure
}


export interface Enclosure {
    mediaUrl: string,
    length: number,
    mimeType: string
}


export interface EpisodeNext {
    items: Episode[],
    offset?: number
}

// https://docs.podlove.org/podlove-web-player/v5/configuration#config
export interface PlayerEpisode {
    version: number,
    base: string
    show: Show,
    title: string,
    subtitle?: string,
    summary: string,
    publicationDate: string, //ISO 8601 DateTime
    duration: string, // ISO 8601 Duration format ([hh]:[mm]:[ss].[sss]
    poster: string,
    link?: string,
    audio: Audio[],
    chapter: Chapter[],
    files: Audio[],
    contributors: any[],
    transcripts: string
}

export interface Audio {
    url: string,
    size: number,
    title: string,
    mimeType: string
}

export interface Chapter {
    start: string,
    title: string,
    href: string,
    image: string
}

export default Episode;



