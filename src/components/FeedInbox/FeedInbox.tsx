import { Space, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
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
			<a href={`${link}`} target="_blank">
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
	{
		title: "Action",
		key: "action",
		fixed: "right" as any,
		sorter: true,
		render: () => (
			<Space size="middle">
				<a>Delete</a>
				<a className="ant-dropdown-link">More actions</a>
			</Space>
		),
	},
];

export const FeedInbox: React.FC = () => {
	const initData = useCallback(async () => {
		let feedJson = await admin.getIndox();
		console.log(feedJson);
		setFeeds(feedJson);
	}, []);

	const [feeds, setFeeds] = useState<FeedModerator[]>([]);

	useEffect(() => {
		initData();
	}, [initData]);

	return (
		<div className="FeedInbox">
			<Table
				bordered
				showHeader
				loading={feeds.length === 0}
				columns={columns}
				dataSource={feeds}
				rowKey={(feed) => feed.id}
				size="small"
			/>
		</div>
	);
};
export default FeedInbox;
