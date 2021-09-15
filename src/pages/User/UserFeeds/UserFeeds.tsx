import { Radio, RadioChangeEvent, Typography } from "antd";
import "./UserFeeds.css";
import { useCallback, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { user } from "../../../functions/user";
import { FeedStatus, SubmittedFeeds, FeedSmall } from "../../../models/feeds";
import FeedGridList from "../../../components/FeedGridList/FeedGridList";
import FeedFilter, {
	sortBy,
	SortByValue,
} from "../../../components/FeedFilter/FeedFilter";
import util from "../../../functions/util";
import useLocation from "wouter/use-location";
import React from "react";
const { Title } = Typography;

function renderRadioButtons(
	submittedFeeds: SubmittedFeeds | null
): JSX.Element[] {
	return Object.keys(FeedStatus).map((status) => {
		let count = 0;
		if (submittedFeeds && submittedFeeds[status.toLowerCase()]) {
			count = submittedFeeds[status.toLowerCase()].length;
		}
		return (
			<Radio.Button key={status} value={status.toLowerCase()}>
				{status} ({count})
			</Radio.Button>
		);
	});
}

function initFilter(): FeedStatus {
	// console.log(util.urlParameter("select"));
	const selection = util.urlParameter("select")?.toLocaleLowerCase();
	if (selection?.localeCompare(FeedStatus.Queued.toLocaleLowerCase()) === 0) {
		return FeedStatus.Queued;
	} else if (
		selection?.localeCompare(FeedStatus.Offline.toLocaleLowerCase()) === 0
	) {
		return FeedStatus.Offline;
	} else if (
		selection?.localeCompare(FeedStatus.Blocked.toLocaleLowerCase()) === 0
	) {
		return FeedStatus.Blocked;
	}
	return FeedStatus.Online;
}

// function renderSortByOptions(sortBy: SortByType): JSX.Element[] {
//   return Object.entries(sortBy).map(([key, prop]: [string, any]) => {
//     return (
//       <Select.Option key={prop.name} value={key}>
//         {prop.name}
//       </Select.Option>
//     );
//   });
// }

let submittedFeeds: SubmittedFeeds | null = null;

export const UserFeeds: React.FC = React.memo(() => {
	const mountedRef = useRef(true);
	const setLocation = useLocation()[1];

	const [feedsList, setFeedsList] = useState<FeedSmall[]>([]);
	const [filter, setFilter] = useState<FeedStatus>(initFilter());
	const [loading, setLoading] = useState(true);
	const [currentSortBy, setCurrentSortBy] = useState<SortByValue>(sortBy.title);

	const getFeeds = useCallback(async () => {
		try {
			const feeds: SubmittedFeeds = await user.getSubmittedFeeds();
			submittedFeeds = feeds;
			setFeedsList(feeds[filter.toLowerCase()]);
			setLoading(false);
		} catch (err) {
			console.error(err);
			setLocation("/login");
		}
	}, [filter, setLocation]);

	useEffect(() => {
		getFeeds();
		return () => {
			setLoading(false);
			mountedRef.current = false;
		};
		// const select = util.urlParameter("select");
	}, [getFeeds]);

	const handelFilterChange = (event: RadioChangeEvent): void => {
		event.preventDefault();
		const filter = event.target.value ?? "online";
		setLocation(encodeURI(`feeds?select=${filter}`), { replace: false });
		setFilter(filter);
		if (submittedFeeds) {
			setFeedsList(submittedFeeds[filter] ?? []);
		} else {
			setFeedsList([]);
		}
	};

	const onChangeFilter = (value: SortByValue) => {
		setCurrentSortBy(value);
	};

	return (
		<div className="UserFeeds">
			<header>
				<Title>Submitted Feeds</Title>
			</header>
			<section className="UserFeeds-body">
				<section className="UserFeeds-header">
					<Radio.Group
						defaultValue={filter.toLowerCase()}
						buttonStyle="solid"
						onChange={handelFilterChange}
					>
						{renderRadioButtons(submittedFeeds)}
					</Radio.Group>
					<FeedFilter onChange={onChangeFilter} />
				</section>
				<FeedGridList
					feeds={feedsList}
					sortedBy={currentSortBy}
					loading={loading}
				/>
			</section>
		</div>
	);
});

export default UserFeeds;
