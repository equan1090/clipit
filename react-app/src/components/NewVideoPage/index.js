import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllVideoThunk } from "../../store/video";
import './NewVideoPage.css'
import VideoCard from "../VideoCard";
import NavigationTabs from "../NavigationTabs";

function NewVideoPage() {
    const dispatch = useDispatch()
    const videos = useSelector((state) => state?.videos)

    useEffect(() => {
        dispatch(getAllVideoThunk())
    }, [dispatch])


    return (
        <>
            <NavigationTabs />
            <div className='main-content-area'>
                {videos?.map((video) => (
                    <div key={video.id} className='one-card'>
                        <VideoCard video={video}/>
                    </div>
                ))}
            </div>
        </>
    )


}

export default NewVideoPage;
