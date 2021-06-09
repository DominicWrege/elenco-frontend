import React from "react";
import { Episode, PlayerEpisode } from "../models/episode";
import { FeedShort } from "../models/feeds";

type context = null | PlayerEpisode;


export interface PodcastPlayerValue {
    currentEpisode: context,
    setCurrentEpisode: React.Dispatch<React.SetStateAction<context>>
}


export const PodcastPlayerContext = React.createContext<PodcastPlayerValue | null>(null);
