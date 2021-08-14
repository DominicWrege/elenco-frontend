import "./EpisodeItem.css";
import React, { PropsWithChildren, useContext } from "react";
import Episode from "../../models/episode";
import { Typography, List } from "antd";
import { util } from "../../functions/util";
import { PlayCircleFilled, PauseCircleFilled } from "@ant-design/icons";
import { PlayerContext } from "../../contexts/PlayerContext";
import { FeedShort } from "../../models/feeds";
import { toPlayerEpisode } from "../PodcastPlayer/PodcastPlayer";
import { PlayerAction, PlayerStatus } from "../PodcastPlayer/types";
import { Link } from "wouter";
const { Title } = Typography;

interface Properties {
	episode: Episode;
	feedMeta: FeedShort;
	key: React.Key;
	status?: PlayerStatus;
}

// function compare

const EpisodeItem: React.FC<Properties> = React.memo(
	({ episode, feedMeta, status }) => {
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

		const renderTitle = (): JSX.Element => {
			const title = (
				<Title
					className={episode.explicit ? "EpisodeItem-explicit" : ""}
					level={4}
				>
					{episode.title}
				</Title>
			);

			if (episode.id) {
				return (
					<Link href={`/feed/${feedMeta.title}/${episode.id}`}>{title}</Link>
				);
			}

			return title;
		};

		const renderDescription = (episode: Episode): JSX.Element | null => {
			if (!episode.description) {
				return null;
			}

			let description = util.removeHtml(episode.description);

			if (description.trim().length < 2) {
				return null;
			}

			return <p>{util.removeHtml(description)}...</p>;
		};

		return (
			<List.Item className="EpisodeItem">
				<div className="EpisodeItem-play-pause">
					{(status === PlayerStatus.Init || status === PlayerStatus.Pause) && (
						<PlayCircleFilled onClick={handlePlay} />
					)}
					{status === PlayerStatus.Playing && (
						<PauseCircleFilled onClick={handlePause} />
					)}
				</div>
				<section className="EpisodeItem-body-wrapper">
					{renderTitle()}
					<div className="EpisodeItem-text-body">
						<div className="EpisodeItem-text-small">
							<p>{util.formatDuration(episode.duration)}</p>
							<p>{util.formatDate(episode.published)}</p>
						</div>
						{renderDescription(episode)}
					</div>
				</section>
			</List.Item>
		);
	},
	(
		prevProps: Readonly<PropsWithChildren<Properties>>,
		nextProps: Readonly<PropsWithChildren<Properties>>
	): boolean => {
		return prevProps.status === nextProps.status;
	}
);

export default EpisodeItem;
