import React from "react";
import { PlayerEpisode } from "../models/episode";


export interface EpisodeContext {
    guid: string,
    value: PlayerEpisode
}

type Episode = null | EpisodeContext;

export interface PodcastPlayerValue {
    currentEpisode: Episode,
    setCurrentEpisode: React.Dispatch<React.SetStateAction<Episode>>
}


export const PodcastPlayerContext = React.createContext<PodcastPlayerValue | null>(null);
