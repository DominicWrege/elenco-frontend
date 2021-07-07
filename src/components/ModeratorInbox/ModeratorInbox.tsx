import { Button, message, PageHeader, Space } from "antd";
import { useCallback, useEffect, useState } from "react";
import { admin } from "../../functions/admin";
import util from "../../functions/util";
// eslint-disable-next-line
import ApiError from "../../models/api";
import { FeedModerator, FeedStatus } from "../../models/feeds";
import FeedTable from "../FeedTable/FeedTable";

export const ModeratorInbox = (props) => {
	const [feeds, setFeeds] = useState<FeedModerator[]>([]);

	const [selectedRows, setSelectedRows] = useState<number[]>([]);
	const [approveLoadingButton, setApproveLoadingButton] = useState(false);
	const [blockLoadingButton, setBlockLoadingButton] = useState(false);

	const initData = useCallback(async () => {
		try {
			console.log("ddd");

			const feedJson = await admin.moderatorInbox();
			console.log(feedJson);
			setFeeds(feedJson);
		} catch (err: any | ApiError) {
			console.log(err);
		}
	}, []);

	useEffect(() => {
		initData();
	}, [initData]);

	const onChange = (keys: number[] | any, rows: FeedModerator[]): void => {
		console.log(rows);
		setSelectedRows(keys);
	};

	const reviewFeeds = async (feedStatus: FeedStatus): Promise<void> => {
		if (selectedRows.length === 0) {
			message.warning("Please select at least any rows.");
			return;
		}
		try {
			await admin.reviewFeeds(selectedRows, feedStatus);
			setFeeds(util.removeRows(selectedRows, feeds));
			message.success("success");
		} catch (err) {
			console.log(err);
		} finally {
			setSelectedRows([]);
		}
	};

	const handleApprove = async () => {
		setApproveLoadingButton(true);
		reviewFeeds(FeedStatus.Online);
		setApproveLoadingButton(false);
	};
	const handleBlock = async () => {
		setBlockLoadingButton(true);
		reviewFeeds(FeedStatus.Blocked);
		setBlockLoadingButton(false);
	};

	return (
		<div className="ModeratoInbox">
			<PageHeader
				className="PageHeader"
				title="My Inbox"
				extra={
					<Space size="middle">
						<Button
							type="primary"
							onClick={handleApprove}
							loading={approveLoadingButton}
							disabled={selectedRows.length === 0}
						>
							Approve
						</Button>
						<Button
							type="primary"
							onClick={handleBlock}
							loading={blockLoadingButton}
							disabled={selectedRows.length === 0}
							danger
						>
							Block
						</Button>
					</Space>
				}
			/>
			<FeedTable feeds={feeds} onChange={onChange} />
		</div>
	);
};

export default ModeratorInbox;
