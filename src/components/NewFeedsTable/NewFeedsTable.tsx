import { Button, message, PageHeader, Space, Table } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { API_IP, API_URL } from "../../env";
import { admin } from "../../functions/admin";
import util from "../../functions/util";
import { FeedModerator } from "../../models/feeds";

const columns = [
	{
		title: "title",
		dataIndex: "title",
		key: "title",
		sorter: {
			compare: (a, b) => a.title.localeCompare(b.title),
			multiple: 1,
		},
		fixed: false,
	},

	{
		title: "Author Name",
		dataIndex: "authorName",
		key: "authorName",
		ellipsis: true,
		fixed: false,
		sorter: {
			compare: (a, b) => a.authorName.localeCompare(b.authorName),
			multiple: 1,
		},
	},
	{
		title: "Website",
		dataIndex: "linkWeb",
		key: "linkWeb",
		render: (link) => (
			<a href={`${link}`} target="_blank" rel="noreferrer">
				Website
			</a>
		),
		width: "6em",
		fixed: false,
	},
	{
		title: "submitted",
		dataIndex: "submitted",
		key: "submitted",
		render: (date) => util.formatDate(date),
		width: "10em",
		fixed: false,
	},

	{
		title: "username",
		dataIndex: "username",
		key: "username",
		ellipsis: true,
		width: "12em",
		fixed: false,
	},
	{
		title: "url",
		dataIndex: "url",
		key: "url",
		fixed: false,
	},
];

export const FeedInbox: React.FC = () => {
	const [selectedRows, setSelectedRows] = useState<number[]>([]);
	const [loadingButton, setLoadingButton] = useState(false);
	const [feeds, setFeeds] = useState<FeedModerator[]>([]);

	const initData = useCallback(async () => {
		let feedJson = await admin.getInbox();
		console.log(feedJson);
		setFeeds(feedJson);
	}, []);

	useEffect(() => {
		initData();
		const feedSocket = new WebSocket(`ws://${API_IP}/admin/fedd-live-update`);

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

	const rowSelection = {
		onChange: (keys: number[] | any, rows: FeedModerator[]) => {
			// console.log(rows);
			setSelectedRows(keys);
		},
	};

	const handleButtonClick = async () => {
		console.log(selectedRows);
		if (selectedRows.length > 0) {
			try {
				setLoadingButton(true);
				await admin.assignFeeds(selectedRows);
				for (const id of selectedRows) {
					const index = feeds.findIndex(
						(feed: FeedModerator) => feed.id === id
					);
					feeds.splice(index, 1);
				}
				setFeeds([...feeds]);
				message.success("success");
			} catch (err) {
				console.log(err);
			} finally {
				setLoadingButton(false);
				setSelectedRows([]);
			}
		}
	};

	return (
		<div className="FeedInbox">
			<PageHeader
				style={{ background: "#fff" }}
				title="Inbox"
				extra={
					<Button
						loading={loadingButton}
						type="primary"
						onClick={handleButtonClick}
					>
						Claim For Review
					</Button>
				}
			/>
			<Table
				bordered
				showHeader
				rowSelection={rowSelection}
				loading={feeds.length === 0}
				columns={columns}
				dataSource={feeds}
				rowKey={(feed) => feed.id}
				size="small"
				pagination={{ pageSize: 25 }}
			/>
		</div>
	);
};
export default FeedInbox;
