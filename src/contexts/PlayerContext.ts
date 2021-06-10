import React from "react";
import { PlayerAction, PlayerStatus } from "../components/PodcastPlayer/PodcastPlayer";
import { PlayerEpisode } from "../models/episode";


export interface EpisodeContext {
    guid: string,
    value: PlayerEpisode
}

type Episode = null | EpisodeContext;

export interface PodcastPlayerContext {
    status: PlayerStatus,
    setStatus: React.Dispatch<React.SetStateAction<PlayerStatus>>,
    action: PlayerAction | null,
    setAction: React.Dispatch<React.SetStateAction<PlayerAction | null>>
    episode: Episode,
    setEpisode: React.Dispatch<React.SetStateAction<Episode>>
}


export const PodcastPlayerContext = React.createContext<PodcastPlayerContext | null>(null);
