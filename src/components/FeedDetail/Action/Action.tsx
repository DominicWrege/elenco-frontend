import "./Action.css";
import { useCallback, useEffect, useState } from "react";
import { user } from "../../../functions/user";
import { FeedUserInfo } from "../../../models/api";
import HideButton from "../HideButton/HideButton";
import { SubscribeButton } from "../SubscribeButton/Subscribe";
import React from "react";

interface Props {
	feedId?: number;
}

const Action: React.FC<Props> = React.memo(({ feedId }) => {
	const [userFeedInfo, setUserFeedInfo] = useState<FeedUserInfo | null>(null);
	const load = useCallback(async () => {
		if (feedId) {
			try {
				setUserFeedInfo(await user.getSubscriptionInfo(feedId));
			} catch (err) {
				console.log(err);
			}
		}
	}, [feedId]);

	const subscribe = async (feedId: number): Promise<void> => {
		await user.subscribe(feedId);
		UpdateUserState(true);
	};

	const UpdateUserState = (status: boolean) => {
		if (userFeedInfo) {
			setUserFeedInfo({ ...userFeedInfo, hasSubscribed: status });
		}
	}

	const unsubscribe = async (feedId: number): Promise<void> => {
		await user.unsubscribe(feedId);
		UpdateUserState(false);
	};

	useEffect(() => {
		load();
	}, [load]);

	if (!feedId) {
		return null;
	}

	if (userFeedInfo) {
		return (
			<div className="Action">
				<SubscribeButton feedId={feedId}
					isSubscribed={userFeedInfo?.hasSubscribed}
					onSubscribe={subscribe}
					onUnSubscribe={unsubscribe} />
				<HideButton
					feedId={feedId}
					status={userFeedInfo?.status}
					isOwner={userFeedInfo?.isOwner}
				></HideButton>
			</div>
		);
	}

	return null;
});

export default Action;
