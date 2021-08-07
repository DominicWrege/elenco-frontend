import "./PlayButton.css";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import { PlayerAction, PlayerStatus } from "../PodcastPlayer/types";
import { PlayCircleFilled, PauseCircleFilled } from "@ant-design/icons";
import { toPlayerEpisode } from "../PodcastPlayer/PodcastPlayer";
import { FeedShort } from "../../models/feeds";
import Episode from "../../models/episode";

interface Props {
	image?: string | null;
	feedTitle: string;
	episode: Episode;
}

const PlayButton: React.FC<Props> = ({ image, feedTitle, episode }) => {
	const player = useContext(PlayerContext);

	const handlePlay = (_event): void => {
		const feedMeta: FeedShort = {
			img: image,
			title: feedTitle,
			linkWeb: episode.webLink,
		};
		if (player?.episode === null || player?.episode.guid !== episode.guid) {
			const playerEpisode = toPlayerEpisode(episode, feedMeta);
			player?.setEpisode({ guid: episode.guid, value: playerEpisode });
		}

		player?.setAction(PlayerAction.Play);
	};
	const handlePause = (_event): void => {
		player?.setAction(PlayerAction.Pause);
	};
	if (
		player?.episode?.guid === episode.guid &&
		player?.status === PlayerStatus.Playing
	) {
		return (
			<div className="PlayButton">
				<PauseCircleFilled onClick={handlePause} />
			</div>
		);
	}
	return (
		<div className="PlayButton">
			<PlayCircleFilled onClick={handlePlay} />
		</div>
	);
};

export default PlayButton;
