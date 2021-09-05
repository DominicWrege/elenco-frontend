import "./FeedDetail.css";

import type { FeedEpisodeModel, FeedSmall } from "../../models/feeds";
import { BackTop, Card, Skeleton, Tabs, Typography } from "antd";
import Artwork from "../Artwork/Artwork";
import FeedMetaInfo from "../FeedMetaInfo/FeedMetaInfo";
import { Link, useLocation } from "wouter";
import EpisodeList from "../EpisodeList/EpisodeList";
import { Comment } from "../../components/Comment/Comment";
import React, { useEffect, useState } from "react";
import FeedSmallList from "../FeedSmallList/FeedSmallList";
import { API_URL } from "../../env";
import util from "../../functions/util";
import Action from "./Action/Action";

const { Title, Paragraph } = Typography;

export enum SelectedTab {
	description = "description",
	episode = "episode",
	comments = "comments",
}

function stringToTab(name?: string): SelectedTab {
	if (name === "episode") {
		return SelectedTab.episode;
	} else if (name === "comments") {
		return SelectedTab.comments;
	}
	return SelectedTab.description;
}

interface Properties {
	feed: FeedEpisodeModel | null;
	showUserActions?: boolean;
	showComments?: boolean;
	relatedFeeds?: FeedSmall[];
	loadingFeed?: boolean;
	loadingRelated?: boolean;
	tabKey?: SelectedTab;
}

const TAB_Query = "tab";

export const FeedDetail: React.FC<Properties> = React.memo(({
	feed,
	showUserActions = false,
	showComments = false,
	relatedFeeds,
	loadingFeed = true,
	loadingRelated = true,
	tabKey = SelectedTab.description,
}) => {
	const [selectedTab, setSelectedTab] = useState(tabKey);
	const setLocation = useLocation()[1];

	const renderSubtitle = (subtitle?: string) => {
		if (!subtitle) {
			return null;
		}
		return <Paragraph>{subtitle}</Paragraph>;
	};

	useEffect(() => {
		const tab = util.urlParameter(TAB_Query);
		if (tab) {
			setSelectedTab(stringToTab(tab));
		}
	}, []);

	const handleTabSelect = (activeKey: string): void => {
		const uriParam = util.urlParameter("url");
		if (uriParam) {
			const param = [`url=${uriParam}`, `${TAB_Query}=${activeKey}`].join("&");
			setLocation(`${window.location.pathname}?${param}`);
		} else {
			setLocation(`${window.location.pathname}?${TAB_Query}=${activeKey}`);
		}
	};

	const renderArtwork = () => {
		const src = feed?.imgCache ? `${API_URL}/img/${feed?.imgCache}` : feed?.img;
		return <Artwork loading={loadingFeed} src={src ?? null} width={"17rem"} />;
	};

	return (
		<div className="FeedDetail">
			<header className="FeedDetail-header">
				<Skeleton
					loading={loadingFeed}
					title
					paragraph={{ rows: 1, width: "20rem" }}
				>
					{feed && (
						<>
							<Title level={3}>{feed.title}</Title>
							<Link href={`/author/${feed.authorName}`}>{feed.authorName}</Link>
						</>
					)}
				</Skeleton>
			</header>
			<section
				className={[
					"FeedDetail-main",
					relatedFeeds
						? "FeedDetail-main-three-columns"
						: "FeedDetail-main-two-columns",
				].join(" ")}
			>
				<aside className="FeedDetail-sidebar">
					{renderArtwork()}

					{feed && <>{showUserActions && <Action feedId={feed.id}></Action>}</>}

					{!feed && (
						<Card>
							<Skeleton loading={loadingFeed}></Skeleton>
						</Card>
					)}
					{feed && (
						<FeedMetaInfo
							feed={{
								rss_url: feed.url,
								language: feed.language,
								linkWeb: feed.linkWeb,
								categories: feed.categories,
							}}
						/>
					)}
				</aside>
				<Card className="FeedDetail-main-card FeedDetail-body">
					<Skeleton loading={loadingFeed} paragraph={{ rows: 8 }}>
						{feed && (
							<>
								<Tabs
									size="large"
									defaultActiveKey={selectedTab}
									onChange={handleTabSelect}
								>
									<Tabs.TabPane tab="Description" key="description">
										{renderSubtitle(feed.subtitle)}
										<Paragraph>{util.removeHtml(feed.description)}</Paragraph>
									</Tabs.TabPane>
									<Tabs.TabPane tab="Episodes" key="episode">
										<EpisodeList
											episodesList={showComments ? null : feed.episodes.items}
											feedMeta={{
												img: feed.img,
												title: feed.title,
												linkWeb: feed.linkWeb,
												id: feed.id,
											}}
										/>
									</Tabs.TabPane>
									{showComments && (
										<Tabs.TabPane tab="Comments" key="comments">
											<Comment feedId={feed.id} />
										</Tabs.TabPane>
									)}
								</Tabs>
							</>
						)}
					</Skeleton>
				</Card>
				{relatedFeeds && (
					<Card title="Related" className="FeedDetail-related">
						<FeedSmallList feeds={relatedFeeds} loading={loadingRelated} />
					</Card>
				)}
			</section>
			<BackTop />
		</div>
	);
});

export default FeedDetail;