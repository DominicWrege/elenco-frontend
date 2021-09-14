import { Button, message, PageHeader } from "antd";
import { useCallback, useEffect, useState } from "react";
import { API_URL_WS } from "../../env";
import { admin } from "../../functions/admin";
import util from "../../functions/util";
import { FeedModerator } from "../../models/feeds";
import FeedTable from "../FeedTable/FeedTable";

export const NewFeedOverview: React.FC = () => {
	const [selectedRows, setSelectedRows] = useState<number[]>([]);
	const [loadingButton, setLoadingButton] = useState(false);
	const [feeds, setFeeds] = useState<FeedModerator[]>([]);

	const initData = useCallback(async () => {
		let feedJson = await admin.newFeeds();
		setFeeds(feedJson);
	}, []);

	useEffect(() => {
		initData();
		const feedSocket = new WebSocket(`${API_URL_WS}/admin/socket/unassigned`);

		feedSocket.addEventListener("open", (e) => {
			if (feedSocket.readyState === 1) {
				feedSocket.addEventListener("message", (event) => {
					// console.log(event);
					if (event?.data) {
						setFeeds((feeds) => {
							const json = JSON.parse(event.data);
							return [json, ...feeds];
						});
					}
				});
			}
		});

		return () => {
			feedSocket.close();
		};
	}, [initData]);

	const onChange = (keys: number[] | any, rows: FeedModerator[]): void => {
		setSelectedRows(keys);
	};

	const handleButtonClick = async (): Promise<void> => {
		if (selectedRows.length === 0) {
			message.warning("Please select at least any rows.");
			return;
		}
		try {
			setLoadingButton(true);
			await admin.assignFeeds(selectedRows);
			setFeeds(util.removeRows(selectedRows, feeds));
			message.success("success");
		} catch (err) {
			console.log(err);
		} finally {
			setLoadingButton(false);
			setSelectedRows([]);
		}
	};

	return (
		<div className="NewFeedOverview">
			<PageHeader
				className="PageHeader"
				title="Incoming Feeds"
				extra={
					<Button
						disabled={selectedRows.length === 0}
						loading={loadingButton}
						type="primary"
						onClick={handleButtonClick}
					>
						Claim For Review
					</Button>
				}
			/>

			<FeedTable feeds={feeds} onChange={onChange} />
		</div>
	);
};
export default NewFeedOverview;
