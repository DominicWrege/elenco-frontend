import React, { useEffect, useState } from "react";
import "./SubmitFeed.css";
import FeedForm, { SubmitEvent } from "../../components/FeedForm/FeedForm";
import { API_URL } from "../../env";
import { http } from "../../functions/http";
import { Category, FeedPreview, FeedResult, TopCategory } from "../../models/feeds";
import { FeedDetail } from "../FeedDetail/FeedDetail";
import PodcastPlayer from "../../components/PodcastPlayer/PodcastPlayer";
import { Divider, Typography } from "antd";
const { Title } = Typography;


interface FormBody {
    feed_url: string
}

export function SubmitFeed(): JSX.Element {

    const [feed, setFeed] = useState<FeedResult | null>(null)


    const handleSubmit = (event: SubmitEvent): void => {
        console.log(event);
        submitPreview(event.url).then((newFeed: FeedPreview) => {
            setFeed({
                ...newFeed,
                categories: castCategories(newFeed.categories),
            });

        }).catch((err: http.HttpError) => {
            console.log(err.message);
            console.log(err.statusCode);
        });
    };


    const castCategories = (categories: Map<string, Array<string>>): TopCategory[] => {
        let newCategories: TopCategory[] = [];
        let i = 0;
        for (const [topCategory, subCategory] of Object.entries(categories)) {
            // console.log(topCategory, subCategory);
            newCategories.push({
                id: i,
                description: topCategory,
                children: subCategory.map(description => {
                    return {
                        id: ++i,
                        description: description
                    }
                })
            });
            i += 1;
        }
        return newCategories;
    };

    const submitPreview = async (url: string): Promise<FeedPreview> => {
        const body: FormBody = {
            feed_url: url
        };
        console.log(body);
        const resp = await http.post(`${API_URL}/api/feed/preview`, body, http.WithCredentials.No);
        return resp.json();
    };

    useEffect(() => {
        console.log("aaaaaaaaa");
        submitPreview("https://freakshow.fm/feed/m4a").then((newFeed: FeedPreview) => {
            setFeed({
                ...newFeed,
                categories: castCategories(newFeed.categories),
            });
        }).catch((err: http.HttpError) => {
            console.log(err.message);
            console.log(err.statusCode);
        });
    }, []);



    return (
        <div className="SubmitFeed">
            <FeedForm onSubmit={handleSubmit} />

            <div className="Feed-detail-wrapper">
                <FeedDetail feed={feed} episodes={<PodcastPlayer name="test" />} />
            </div>

        </div>
    );
}


export default SubmitFeed;

