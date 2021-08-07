import "./Episode.css";
import { Card, Skeleton, Typography } from "antd";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { DefaultParams, useRoute } from "wouter";
import api from "../../functions/api";
import { Episode as EpisodeModel } from "../../models/episode";
import sanitizeHtml from "sanitize-html";
import PlayButton from "../PlayButton/PlayButton";
import Artwork from "../Artwork/Artwork";
import util from "../../functions/util";
// interface Props {
// 	episode: EpisodeModel;
// }
const { Title } = Typography;

interface FeedRouterProperties extends DefaultParams {
	episode_id: string;
	feed_title: string;
}

export const Episode: React.FC = () => {
	const params = useRoute<FeedRouterProperties>(
		"/feed/:feed_title/:episode_id"
	)[1];
	const [episode, setEpisode] = useState<EpisodeModel | null>(null);
	const [loading, setLoading] = useState(true);
	const feedTitle = decodeURI(params?.feed_title ?? "");

	const [image, setImage] = useState<string | null>(null);

	const getArtwork = useCallback(async () => {
		try {
			if (feedTitle) {
				const image = await api.getImage(feedTitle);
				setImage(image.img);
			}
		} catch (err) {
			console.error(err);
		}
	}, [feedTitle]);

	const load = useCallback(async () => {
		if (params?.episode_id) {
			try {
				let id = parseInt(params?.episode_id, 10);
				const json_episode = await api.getEpisode(id);
				console.log(json_episode);
				setEpisode(json_episode);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		}
	}, [params?.episode_id]);

	useEffect(() => {
		Promise.all([load(), getArtwork()]);
	}, [load, getArtwork]);

	return (
		<div className="Episode">
			<Card>
				{loading && <Skeleton title paragraph={{ rows: 12 }} />}
				{episode && !loading && (
					<>
						<header>
							<Artwork src={image} width="9rem" />
							<PlayButton
								feedTitle={feedTitle}
								episode={episode}
								image={image}
							/>
							<div className="Episode-title">
								<Title level={3}>{episode?.title}</Title>
								<Title level={5}>{feedTitle}</Title>
								<div className="EpisodeItem-text-body">
									<div className="EpisodeItem-text-small">
										<p>{util.formatDuration(episode.duration)}</p>
										<p>{util.formatDate(episode.published)}</p>
									</div>
								</div>
							</div>
						</header>

						<div
							className="Episode-show-notes"
							dangerouslySetInnerHTML={{
								__html: sanitizeHtml(episode?.showNotes),
							}}
						></div>
					</>
				)}
			</Card>
		</div>
	);
};

export default Episode;
