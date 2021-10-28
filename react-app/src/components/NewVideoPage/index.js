import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllVideoThunk } from "../../store/video";

import VideoCard from "../VideoCard";


function NewVideoPage() {
    const dispatch = useDispatch()
    const videos = useSelector((state) => state?.videos)

    useEffect(() => {
        dispatch(getAllVideoThunk())
    }, [dispatch])


    return (
        <>
            <div className='navigation-tabs'>
                <div className='popular-tab'>
                    <Link id='popular' to='/videos/popular'>Popular</Link>
                </div>
                <div className='new-tab'>
                    <Link id='new' to='/videos/new'>New</Link>
                </div>
            </div>
            <div className='main-content-area'>
                {videos?.map((video) => (
                    <div key={video.id}>
                        <VideoCard video={video}/>
                    </div>
                ))}
            </div>
        </>
    )


}

export default NewVideoPage;
