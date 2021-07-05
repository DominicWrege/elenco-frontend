import { PageHeader } from "antd";
import { useCallback, useEffect, useState } from "react";
import { admin } from "../../functions/admin";
import ApiError from "../../models/api";
import { FeedModerator } from "../../models/feeds";
import FeedTable from "../FeedTable/FeedTable";

export const FeedReviewed: React.FC = () => {
    const [feeds, setFeeds] = useState<FeedModerator[]>([]);

    const initData = useCallback(async () => {
        try {
            const feedJson = await admin.getReviewed();
            setFeeds(feedJson);
        } catch (err: any | ApiError) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        initData();
    }, [initData])

    return (
        <div className="FeedReviewed">
            <PageHeader
                className="PageHeader"
                title="All Reviewed">
            </PageHeader>
            <FeedTable feeds={feeds}></FeedTable>
        </div>
    )
}
