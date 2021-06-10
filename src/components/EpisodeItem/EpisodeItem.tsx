import "./EpisodeItem.css";
import React, { useContext, useEffect, useState } from "react";
import Episode from "../../models/episode";
import { Typography, List } from 'antd';
import { formatDate, formatDuration } from "../../functions/util";
import { stripHtml } from "string-strip-html";
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import { PodcastPlayerContext } from "../../contexts/PlayerContext";
import { PlayerAction, PlayerStatus, toPlayerEpisode } from "../PodcastPlayer/PodcastPlayer";
import { FeedShort } from "../../models/feeds";
const { Title } = Typography;



interface Properties {
    episode: Episode
    feedMeta: FeedShort
    key: React.Key
    status?: PlayerStatus
}

const EpisodeItem: React.FC<Properties> = ({ episode, feedMeta, status = PlayerStatus.Init }) => {

    const player = useContext(PodcastPlayerContext);
    // const [guide, setguide] = useState(episode.guid.slice());
    const handlePlay = (_event): void => {
        if (player?.episode === null || player?.episode.guid !== episode.guid) {
            const playerEpisode = toPlayerEpisode(episode, feedMeta);
            player?.setEpisode({ guid: episode.guid, value: playerEpisode });
        }

        player?.setAction(PlayerAction.Play);
    };
    const handlePause = (_event): void => {
        player?.setAction(PlayerAction.Pause);
    };



    return (
        <List.Item className="EpisodeItem">
            <div className="EpisodeItem-play-pause">
                {(status === PlayerStatus.Init || status === PlayerStatus.Pause) &&
                    <PlayCircleFilled onClick={handlePlay} />
                }
                {status === PlayerStatus.Playing &&
                    <PauseCircleFilled onClick={handlePause} />
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