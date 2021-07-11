import React, { useCallback, useEffect, useState } from "react";
import "./Preview.css";
import { FeedEpisodeModel } from "../../models/feeds";
import { http } from "../../functions/http";
import { API_URL } from "../../env";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Card, Result, Typography } from "antd";
import { FeedDetail } from "../../components/FeedDetail/FeedDetail";
import { useLocation } from "wouter";
import ApiError, { FormBody, PreviewJson } from "../../models/api";
import category from "../../functions/category";
const { Title, Text } = Typography;

async function getPreview(url: string): Promise<PreviewJson> {
	const body: FormBody = {
		feedUrl: url,
	};
	const resp = await http.post(
		`${API_URL}/feed/preview`,
		body,
		http.WithCredentials.Yes
	);
	return resp.json();
}

const Preview: React.FC = () => {
	const [feed, setFeed] = useState<FeedEpisodeModel | null>(null);
	const [feedExist, setFeedExists] = useState<boolean>(false);
	const setLocation = useLocation()[1];
	const [feedUrl, setFeedUrl] = useState<string | null>(null);
	const [error, setError] = useState<ApiError | null>(null);

	const [saveLoading, setSaveLoading] = useState(false);

	const handleSaveFeed = async (): Promise<void> => {
		if (feedUrl) {
			setSaveLoading(true);
			const body: FormBody = {
				feedUrl: feedUrl,
			};
			try {
				await http.post(`${API_URL}/feed/new`, body, http.WithCredentials.Yes);
				setSaveLoading(false);
				setLocation("/new/done");
			} catch (err: http.HttpError | any) {
				setSaveLoading(false);
				console.log(err.c);
				setError(err.json);
			}
		}
	};

	const renderActions = (): JSX.Element | null => {
		const save_btn = feedExist ? (
			<Button disabled type="primary">
				Save Feed
			</Button>
		) : (
			<Button type="primary" onClick={handleSaveFeed} loading={saveLoading}>
				Save Feed
			</Button>
		);

		const preText = feedExist ? (
			<Text type="danger" key="extras541">
				Feed already exists
			</Text>
		) : null;
		return (
			<div className="Preview-card-extras" key="extras771">
				{preText}
				{save_btn}
			</div>
		);
	};

	const init = useCallback(async () => {
		const params = new URLSearchParams(window.location.search);
		const paramsUrl = params.get("url");

		if (paramsUrl) {
			setFeedUrl(paramsUrl);
			try {
				const preview = await getPreview(paramsUrl);
				setFeed({
					...preview.feed,
					episodes: {
						items: preview.feed.episodes,
						offset: 0
					},
					categories: category.castCategories(preview.feed.categories),
				});
				setFeedExists(preview.exists);
			} catch (err: http.HttpError | any) {
				setError(err.json);
			}
		}
	}, []);

	useEffect(() => {
		init();
	}, [init]);

	const goBack = () => setLocation("/new/feed");

	if (error) {
		return (
			<Card>
				<Result
					status="error"
					title={<div>Error Code: {error.statusCode}</div>}
					subTitle={error.message}
					extra={
						<Button type="primary" onClick={goBack} key="extra-b876565">
							Go Back
						</Button>
					}
				/>
			</Card>
		);
	}

	return (
		<div className="Preview">
			<Card
				id="Preview-card"
				title={
					<div className="Preview-card-title">
						<Button
							type="text"
							icon={<ArrowLeftOutlined />}
							onClick={goBack}
						></Button>
						<Title level={4}>Preview</Title>
					</div>
				}
				extra={[renderActions()]}
			>
				<FeedDetail feed={feed} loadingFeed={feed === null} />
			</Card>
		</div>
	);
};

export default Preview;
