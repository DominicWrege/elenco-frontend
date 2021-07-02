import { Table } from "antd";
import { useState } from "react";
import { Link } from "wouter";
import { API_URL } from "../../env";
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
		render: (title) => <Link href={`/feed/${encodeURI(title)}`}>{title}</Link>,
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
		render: (author) => (
			<Link href={`/author/${encodeURI(author)}`}>{author}</Link>
		),
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
		sorter: {
			compare: (a, b) => {
				const dateA = Date.parse(a.submitted);
				const dateB = Date.parse(b.submitted);
				return dateA - dateB;
			},
			multiple: 1,
		},
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

interface Props {
	feeds: FeedModerator[];
	onChange: (keys: number[] | any, rows: FeedModerator[]) => void;
}

export const FeedTable: React.FC<Props> = ({ feeds, onChange }) => {
	return (
		<div className="FeedTable">
			<Table
				bordered
				showHeader
				rowSelection={{
					onChange,
				}}
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

export default FeedTable;
