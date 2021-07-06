import { PageHeader } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useCallback, useEffect, useState } from "react";
import { admin } from "../../functions/admin";
import util from "../../functions/util";
import ApiError from "../../models/api";
import { FeedModerator } from "../../models/feeds";
import FeedTable, {
	defaultColumns,
	sortByDate,
	sortByString,
} from "../FeedTable/FeedTable";

const columns = [
	...defaultColumns,
	{
		title: "Reviewer",
		dataIndex: "reviewerName",
		key: "reviewer",
		// width: "11em",
	},
	{
		title: "Status",
		dataIndex: "status",
		key: "status",
		sorter: sortByString("status"),
	},
	{
		title: "Reviewed",
		dataIndex: "modified",
		key: "modified",
		render: (date) => util.formatDate(date),

		width: "10em",
		sorter: sortByDate("modified"),
	},
];

export const FeedReviewed: React.FC = () => {
	const [feeds, setFeeds] = useState<FeedModerator[]>([]);

	const initData = useCallback(async () => {
		try {
			const feedJson = await admin.getReviewed();
			console.log(feedJson);

			setFeeds(feedJson);
		} catch (err: any | ApiError) {
			console.log(err);
		}
	}, []);

	useEffect(() => {
		initData();
	}, [initData]);

	return (
		<div className="FeedReviewed">
			<PageHeader className="PageHeader" title="All Reviewed"></PageHeader>
			<FeedTable feeds={feeds} columns={columns}></FeedTable>
		</div>
	);
};
