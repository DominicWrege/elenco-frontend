import React, { useCallback, useContext, useEffect } from "react";
import Episode from "../../models/episode";
import EpisodeItem from "../EpisodeItem/EpisodeItem";
import { Typography, List } from 'antd';
import { FeedShort } from "../../models/feeds";
import { EpisodeContext, PlayerContext } from "../../contexts/PlayerContext";
import { PlayerStatus } from "../PodcastPlayer/types";

interface Properties {
    episodes: Episode[]
    feedMeta: FeedShort
}

const EpisodeList: React.FC<Properties> = ({ episodes, feedMeta }) => {

    const player = useContext(PlayerContext);


    const setEpisodeStatus = useCallback(
        (episode: Episode, playingEpisode: EpisodeContext | null | undefined): PlayerStatus => {
            // let ref = useRef(null);
            if (player && episode.guid === playingEpisode?.guid) {
                return player?.status ?? PlayerStatus.Pause;
            }

            return PlayerStatus.Pause;
        },
        [player?.status],
    );
    // const setEpisodeStatus = (episode: Episode, playingEpisode: EpisodeContext | null | undefined): PlayerStatus => {
    //     // let ref = useRef(null);
    //     if (player && episode.guid === playingEpisode?.guid) {
    //         return player?.status ?? PlayerStatus.Pause;
    //     }

    //     return PlayerStatus.Pause;
    // };

    // useEffect(() => {
    //     // console.log("list", player?.status)
    // }, [player?.status]);

    return (
        <List
            size="large"
            rowKey={episode => episode.title}
            dataSource={episodes}
            renderItem={episode =>
                <EpisodeItem
                    key={episode.title}
                    episode={episode}
                    feedMeta={feedMeta}
                    status={setEpisodeStatus(episode, player?.episode)}
                ></EpisodeItem>}
        />
    );
}

export default EpisodeList;