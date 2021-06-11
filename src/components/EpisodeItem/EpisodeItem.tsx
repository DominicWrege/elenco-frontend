import "./EpisodeItem.css";
import React, { PropsWithChildren, useContext } from "react";
import Episode from "../../models/episode";
import { Typography, List } from 'antd';
import { formatDate, formatDuration } from "../../functions/util";
import { stripHtml } from "string-strip-html";
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import { PlayerContext } from "../../contexts/PlayerContext";
import { FeedShort } from "../../models/feeds";
import { toPlayerEpisode } from "../PodcastPlayer/PodcastPlayer";
import { PlayerAction, PlayerStatus } from "../PodcastPlayer/types";
const { Title } = Typography;


interface Properties {
    episode: Episode
    feedMeta: FeedShort
    key: React.Key
    status?: PlayerStatus
}

// function compare

const EpisodeItem: React.FC<Properties> = React.memo(({ episode, feedMeta, status }) => {

    const player = useContext(PlayerContext);

    // console.log("render");
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
}, (prevProps: Readonly<PropsWithChildren<Properties>>, nextProps: Readonly<PropsWithChildren<Properties>>): boolean => {

    return prevProps.status === nextProps.status;
});




export default EpisodeItem;