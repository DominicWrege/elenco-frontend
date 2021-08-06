import "./HideButton.css";
import { message, Switch } from "antd";
import { useState } from "react";
import feed from "../../../functions/feed";
import { FeedStatus } from "../../../models/feeds";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

interface Property {
	isOwner: boolean;
	status?: FeedStatus | null;
	feedId: number;
}

const HideButton: React.FC<Property> = ({ isOwner, status, feedId }) => {
	const [innerStatus, setInnerStatus] = useState(status);
	const [loading, setLoading] = useState(false);

	if (!isOwner) {
		return null;
	}

	const updateStatus = async (action: FeedStatus): Promise<void> => {
		try {
			setLoading(true);
			await feed.update(feedId, action);
			setInnerStatus(action);
			message.success(
				`The Feed is now set to visibility:  ${
					FeedStatus.Online === action ? "online" : "offline"
				}`
			);
		} catch (err) {
			console.log(err);
			message.error("error");
		} finally {
			setLoading(false);
		}
	};

	const setOffline = async (): Promise<void> => {
		await updateStatus(FeedStatus.Offline);
	};

	const setOnline = async (): Promise<void> => {
		await updateStatus(FeedStatus.Online);
	};

	const handler = async (checked: boolean, event: Event): Promise<void> => {
		if (checked) {
			await setOnline();
		} else {
			await setOffline();
		}
	};
	// if (status === FeedStatus.Offline) {
	// 	return (
	// 		<Button type="primary" className="HideButton" onClick={onlineHandler}>
	// 			Offline
	// 		</Button>
	// 	);
	// } else if (status === FeedStatus.Online) {
	// 	return (
	// 		<Button
	// 			type="primary"
	// 			onClick={offlineHandler}
	// 			className="HideButton"
	// 			size="small"
	// 			danger
	// 		>
	// 			Hide Feed
	// 		</Button>
	// 	);
	// }

	return (
		<div className="HideBtn">
			<div>Status:</div>
			<Switch
				checked={innerStatus === FeedStatus.Online}
				unCheckedChildren={<EyeInvisibleOutlined />}
				checkedChildren={<EyeOutlined />}
				onChange={handler}
				loading={loading}
			/>
		</div>
	);
};

export default HideButton;
