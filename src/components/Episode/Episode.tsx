import "./Episode.css";
import { Card, Skeleton, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import { DefaultParams, useLocation, useRoute } from "wouter";
import { Episode as EpisodeModel } from "../../models/episode";
import sanitizeHtml from "sanitize-html";
import PlayButton from "../PlayButton/PlayButton";
import Artwork from "../Artwork/Artwork";
import util from "../../functions/util";
import { episode as episodes } from "../../functions/episode";
import api from "../../functions/api";

// interface Props {
// 	episode: EpisodeModel;
// }
const { Title } = Typography;

interface FeedRouterProperties extends DefaultParams {
	episode_id: string;
	feed_title: string;
}

export const Episode: React.FC = () => {
	const mountedRef = useRef(true);

	const params = useRoute<FeedRouterProperties>(
		"/feed/:feed_title/:episode_id"
	)[1];
	const [episode, setEpisode] = useState<EpisodeModel | null>(null);
	const [loading, setLoading] = useState(true);
	const feedTitle = decodeURI(params?.feed_title ?? "");
	const setLocation = useLocation()[1];

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
				setEpisode(await episodes.getByID(id));
			} catch (err) {
				console.error(err);
				if (err.response.status === 404) {
					setLocation("/404");
				}
			} finally {
				setLoading(false);
			}
		}
	}, [params?.episode_id, setLocation]);

	useEffect(() => {
		Promise.all([load(), getArtwork()]);
		return () => {
			mountedRef.current = false;
		};
	}, [load, getArtwork]);

	return (
		<div className="Episode">
			<Card>
				{loading && <Skeleton title paragraph={{ rows: 12 }} />}
				{episode && !loading && (
					<>
						<header>
							<Artwork src={image} width="11rem" />
							<section>
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
							</section>
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
