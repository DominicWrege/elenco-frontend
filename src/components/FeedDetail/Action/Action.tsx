import "./Action.css";
import { useCallback, useEffect, useState } from "react";
import { user } from "../../../functions/user";
import { FeedUserInfo } from "../../../models/api";
import HideButton from "../HideButton/HideButton";
import { SubscribeButton } from "../SubscribeButton/Subscribe";

interface Props {
	feedId?: number;
}

const Action: React.FC<Props> = ({ feedId }) => {
	const [userFeedInfo, setUserFeedInfo] = useState<FeedUserInfo | null>(null);

	const load = useCallback(async () => {
		if (feedId) {
			try {
				let s = await user.getSubscriptionInfo(feedId);
				console.log(s);

				setUserFeedInfo(s);
			} catch (err) {
				console.log(err);
			}
		}
	}, [feedId]);

	useEffect(() => {
		load();
	}, [load]);

	if (!feedId) {
		return null;
	}

	if (userFeedInfo) {
		return (
			<div className="Action">
				<SubscribeButton feedId={feedId} status={userFeedInfo?.hasSubscribed} />
				<HideButton
					status={userFeedInfo?.status}
					isOwner={userFeedInfo?.isOwner}
				></HideButton>
			</div>
		);
	}

	return null;
};

export default Action;
