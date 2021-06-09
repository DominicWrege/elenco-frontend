import React, { useContext } from "react";
import Episode from "../../models/episode";
import EpisodeItem from "../EpisodeItem/EpisodeItem";
import { Typography, List } from 'antd';
import { FeedShort } from "../../models/feeds";
import { EpisodeContext, PodcastPlayerContext } from "../../contexts/PlayerContext";
import { PlayerStatus } from "../PodcastPlayer/PodcastPlayer";

const { Title } = Typography;


interface Properties {
    episodes: Episode[]
    feedMeta: FeedShort
}

const EpisodeList: React.FC<Properties> = ({ episodes, feedMeta }) => {

    const episodeContext = useContext(PodcastPlayerContext);
    const setEpisodeStatus = (episode: Episode, playingEpisode: EpisodeContext | null | undefined): PlayerStatus => {

        if (!playingEpisode || episode.guid !== playingEpisode?.guid) {
            return PlayerStatus.Pause;
        }

        return PlayerStatus.Playing;
    };

    return (
        <List
            size="large"
            header={<Title level={5}>Episodes</Title>}
            bordered
            dataSource={episodes}
            renderItem={item => <EpisodeItem key={item.id} episode={item} feedMeta={feedMeta} status={setEpisodeStatus(item, episodeContext?.currentEpisode)} ></EpisodeItem>}
        />
    );
}

export default EpisodeList;