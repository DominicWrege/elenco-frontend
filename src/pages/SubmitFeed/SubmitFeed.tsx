import React, { useEffect, useState } from "react";
import "./SubmitFeed.css";
import FeedForm, { SubmitEvent } from "../../components/FeedForm/FeedForm";
import { API_URL } from "../../env";
import { http } from "../../functions/http";
import { Category, FeedPreview, FeedModel, TopCategory } from "../../models/feeds";
import { FeedDetail } from "../FeedDetail/FeedDetail";
import PodcastPlayer from "../../components/PodcastPlayer/PodcastPlayer";
import { useLocation } from "wouter";
import { url } from "inspector";


export function SubmitFeed(): JSX.Element {
    const [_, setLocation] = useLocation();

    const handleSubmit = (event: SubmitEvent): void => {
            const urlParam = event.url;
            const uri = encodeURI(`/preview?url=${urlParam}`);
            setLocation(uri);
    
    };

    return (
        <div className="SubmitFeed">
            <FeedForm onSubmit={handleSubmit} />
        </div>
    );
}


export default SubmitFeed;

