import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Link } from "wouter";
import util from "../../functions/util";
import { FeedModerator } from "../../models/feeds";

export const sortByString = (key: string) => (a, b) =>
	a[key].localeCompare(b[key]);

export const sortByDate = (key: string): ((a, b) => number) => {
	const fn = (a, b) => {
		const dateA = Date.parse(a[key]);
		const dateB = Date.parse(b[key]);
		return dateA - dateB;
	};
	return fn;
};

export const defaultColumns: ColumnsType<FeedModerator> = [
	{
		title: "title",
		dataIndex: "title",
		key: "title",
		sorter: sortByString("title"),
		render: (title) => <Link href={`/feed/${encodeURI(title)}`}>{title}</Link>,
		fixed: false,
	},
	{
		title: "Author Name",
		dataIndex: "authorName",
		key: "authorName",
		ellipsis: true,
		fixed: false,
		sorter: sortByString("authorName"),
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
		title: "Submitted",
		dataIndex: "submitted",
		key: "submitted",
		render: (date) => util.formatDate(date),
		width: "10em",
		fixed: false,
		sorter: sortByDate("submitted"),
	},

	{
		title: "Username",
		dataIndex: "username",
		key: "username",
		ellipsis: true,
		width: "14em",
		fixed: false,
		sorter: sortByString("username"),
	},
	{
		title: "Feed URL",
		dataIndex: "url",
		key: "url",
		fixed: false,
		width: "6em",
		render: (url) => (
			<a href={url} target="_blank" rel="noreferrer">
				URL
			</a>
		),
	},
];

interface Props {
	feeds: FeedModerator[];
	onChange?: (keys: number[] | any, rows: FeedModerator[]) => void;
	columns?: ColumnsType<FeedModerator>;
}

export const FeedTable: React.FC<Props> = ({
	feeds,
	onChange,
	columns = defaultColumns,
}) => {
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
