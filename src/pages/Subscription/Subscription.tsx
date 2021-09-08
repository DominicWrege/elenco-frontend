import "./Subscription.css";
import { useCallback, useEffect, useRef, useState } from "react";
import FeedFilter, {
	sortBy,
	SortByValue,
} from "../../components/FeedFilter/FeedFilter";
import FeedGridList from "../../components/FeedGridList/FeedGridList";
import { user } from "../../functions/user";
import { FeedSmall } from "../../models/feeds";
import { Typography } from "antd";
import { http } from "../../functions/http";
import { useLocation } from "wouter";
const { Title } = Typography;

export const Subscription = () => {
	const mountedRef = useRef(true);
	const setLocation = useLocation()[1];

	const [feeds, setFeeds] = useState<FeedSmall[]>([]);
	const [currentSortBy, setCurrentSortBy] = useState<SortByValue>(sortBy.title);
	const [loading, setLoading] = useState(true);

	const loadFeeds = useCallback(async () => {
		try {
			setFeeds(await user.getSubscriptions());
			setLoading(false);
		} catch (err: http.HttpError | any) {
			console.error(err);
			setLocation("/login");
		}
	}, []);

	const onChangeFilter = (value: SortByValue) => {
		setCurrentSortBy(value);
	};

	useEffect(() => {
		loadFeeds();
		return () => {
			setLoading(false);
			mountedRef.current = false;
		};
	}, [loadFeeds]);

	return (
		<div className="Subscription">
			<header>
				<Title>Subscription</Title>
			</header>
			<div className="Subscription-body">
				<section className="Subscription-header">
					<FeedFilter onChange={onChangeFilter} />
				</section>
				<FeedGridList
					feeds={feeds}
					sortedBy={currentSortBy}
					loading={loading}
				/>
			</div>
		</div>
	);
};

export default Subscription;
