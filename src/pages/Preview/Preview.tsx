import React, { useEffect, useState } from "react";
import "./Preview.css";
import { FeedModel, TopCategory } from "../../models/feeds";
import { http } from "../../functions/http";
import { API_URL } from "../../env";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, Result, Skeleton, Typography } from "antd";
import { FeedDetail } from "../FeedDetail/FeedDetail";
import { useLocation } from "wouter";
import ApiError, { FormBody, PreviewJson } from "../../models/api";
const { Title, Text } = Typography;



const Preview: React.FC = () => {

    const [feed, setFeed] = useState<FeedModel | null>(null);
    const [feedExist, setFeedExists] = useState<boolean>(false);
    const setLocation = useLocation()[1];
    const [feedUrl, setFeedUrl] = useState<string | null>(null);
    const [error, setError] = useState<ApiError | null>(null);

    const getPreview = async (url: string): Promise<PreviewJson> => {
        const body: FormBody = {
            feedUrl: url
        };
        const resp = await http.post(`${API_URL}/api/feed/preview`, body, http.WithCredentials.Yes);
        return resp.json();
    };

    const castCategories = (categories: Map<string, Array<string>>): TopCategory[] => {
        let newCategories: TopCategory[] = [];
        let i: number = 0;
        for (const [topCategory, subCategory] of Object.entries(categories)) {
            // console.log(topCategory, subCategory);
            newCategories.push({
                id: i,
                description: topCategory,
                children: subCategory.map(description => {
                    return {
                        id: i++,
                        description: description
                    }
                })
            });
            i++;
        }
        return newCategories;
    };


    const handleSaveFeed = async (): Promise<void> => {
        if (feedUrl) {
            const body: FormBody = {
                feedUrl: feedUrl
            };
            try {
                const resp = await http.post(`${API_URL}/api/feed/new`, body, http.WithCredentials.Yes);
                console.log(resp);
                setLocation("/new-feed");
            } catch (err: http.HttpError | any) {
                console.log(err.c);
                // console.log(await err.json())
                setError(err.json);
            }
        }
    };

    const renderActions = (): JSX.Element | null => {
        const save_btn = feedExist ? <Button disabled type="primary">Save Feed</Button> :
            <Button type="primary" onClick={handleSaveFeed}>Save Feed</Button>;

        const preText = feedExist ? <Text type="danger" key="extras541">Feed already exists</Text>
            : null;
        return (
            <div className="Preview-card-extras" key="extras771">
                {preText}
                {save_btn}
            </div >
        );

    };

    const renderPreview = (): JSX.Element | null => {
        if (!feed) {
            return null;
        }
        return (
            <Card
                id="Preview-card"
                title={
                    <div className="Preview-card-title">
                        <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => setLocation("/new-feed")}>
                        </Button>
                        <Title level={4}>Preview</Title>
                    </div >}
                extra={
                    [
                        renderActions()
                    ]
                } >
                <FeedDetail feed={feed} />
            </Card >

        );
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const paramsUrl = params.get("url");
        console.log(paramsUrl);
        if (paramsUrl) {
            setFeedUrl(paramsUrl);
            getPreview(paramsUrl).then((preview: PreviewJson) => {
                setFeed({
                    ...preview.feed,
                    categories: castCategories(preview.feed.categories),
                });
                setFeedExists(preview.exists);
            }).catch((err: http.HttpError) => {
                console.log(err);
                // console.log(err.message);
                // console.log(err.statusCode);
            });
        }
    }, []);

    return (
        <div className="Preview">
            { !error &&
                renderPreview()
            }


            {error &&
                <Card >
                    <Result
                        status="error"
                        title={<div>Error Code: {error.statusCode}</div>}
                        subTitle={
                            error.message
                        }
                        extra={
                            <Button type="primary" key="extra-b876565">
                                Go Back
                            </Button>
                        }
                    />
                </Card>
            }
            {!feed && !error &&
                <Card className="Preview-loading">
                    < Skeleton active avatar paragraph={{ rows: 12 }} />
                </Card>
            }
        </div>

    );
}

export default Preview;