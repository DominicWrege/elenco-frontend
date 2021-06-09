import "./EpisodeItem.css";
import React, { useContext, useState } from "react";
import Episode from "../../models/episode";
import { Typography, List } from 'antd';
import { formatDate, formatDuration } from "../../functions/util";
import { stripHtml } from "string-strip-html";
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import { PodcastPlayerContext } from "../../contexts/PlayerContext";
import { PlayerStatus, toPlayerEpisode } from "../PodcastPlayer/PodcastPlayer";
import { FeedShort } from "../../models/feeds";
const { Title, Text, Paragraph } = Typography;



interface Properties {
    episode: Episode
    feedMeta: FeedShort
    key: React.Key
    status: PlayerStatus
}

const EpisodeItem: React.FC<Properties> = ({ episode, key, feedMeta, status = PlayerStatus.Pause }) => {

    const player = useContext(PodcastPlayerContext);

    const handlePlay = (_event) => {
        const playerEpisode = toPlayerEpisode(episode, feedMeta);
        player?.setCurrentEpisode({ guid: episode.guid, value: playerEpisode });
    };

    return (
        <List.Item key={key} className="EpisodeItem">
            <div className="EpisodeItem-play-pause">
                {status === PlayerStatus.Pause &&
                    <PlayCircleFilled onClick={handlePlay} />
                }
                {status === PlayerStatus.Playing &&
                    <PauseCircleFilled onClick={(e) => console.log("")} />
                }
            </div>
            <section className="EpisodeItem-text-body">
                <Title className={episode.explicit ? "EpisodeItem-explicit" : ""} level={3}>{episode.title}</Title>
                {/* <Paragraph ellipsis> */}
                <div className="EpisodeItem-text-small">
                    <p>{formatDuration(episode.duration)}</p>
                    <p>{formatDate(episode.published)}</p>
                </div>
                <p>
                    {stripHtml(episode.description ?? "").result}...
                </p>
                {/* </Paragraph> */}
                {/* <Text type="secondary">{episode.keywords?.map(item => item).join(", ")}</Text> */}
            </section>
        </List.Item>
    );
}

export default EpisodeItem;