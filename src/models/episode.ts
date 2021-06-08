export interface Episode {
    title: string,
    id: number,
    description?: string
    duration?: number
    keywords?: string[],
    explicit: boolean,
    published: string,
    showNotes: string
    enclosure: Enclosure
}

export interface Enclosure {
    media_url: string,
    length: number,
    mime_type: string
}

export default Episode;