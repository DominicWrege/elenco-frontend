import { Button } from "antd";
import { FeedStatus } from "../../../models/feeds";

interface Property {
	isOwner: boolean;
	status?: FeedStatus | null;
}

const HideButton: React.FC<Property> = ({ isOwner, status }) => {
	/// update status on click

	if (!isOwner) {
		return null;
	}

	if (status === FeedStatus.Offline) {
		return (
			<Button type="primary" className="HideButton">
				Online
			</Button>
		);
	} else if (status === FeedStatus.Online) {
		return (
			<Button type="primary" className="HideButton" danger>
				Hide Feed
			</Button>
		);
	}

	return null;
};

export default HideButton;
