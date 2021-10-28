import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideoCard from "../VideoCard";
import NavigationTabs from "../NavigationTabs";
import { popularVideoThunk } from "../../store/video";

function PopularVideoPage() {
    const dispatch = useDispatch()
    const videos = useSelector((state) => state.videos.videos?.videos)
    console.log('', videos)
    useEffect(() => {
        dispatch(popularVideoThunk())
    }, [dispatch])

    console.log()
    return(
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

export default PopularVideoPage;
