import React, { useEffect, useState } from "react";
import { DefaultParams, useRoute } from "wouter";
import { getByName } from "../../functions/feed";
import type { FeedModel } from "../../models/feeds";
import { FeedDetail } from "../../pages/FeedDetail/FeedDetail";

interface FeedRouterProperties extends DefaultParams {
    name: string,
}

export function Feed(): React.ReactElement<void> {

    const [feed, setFeed] = useState<FeedModel | null>(null);
    const [_match, params] = useRoute<FeedRouterProperties>("/feed/:name");

    const loadFeed = async (name: string) => {
        try {
            const json_feed = await getByName(name);
            setFeed(json_feed);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {

        if (params?.name) {
            // const a = new URLSearchParams(window.location.search);
            // console.log(window.location.search);
            // console.log("page", a.get("page"));
            // console.log("name", a.get("name"));
            // setFeed(decodeURI(params.name));
            loadFeed(params.name);
        }
    }, [params?.name]);

    return (
        <div className="Feed">
            <FeedDetail feed={feed} />
        </div>
    );
}
