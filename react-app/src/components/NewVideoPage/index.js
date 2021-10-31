import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllVideoThunk } from "../../store/video";
import './NewVideoPage.css'
import VideoCard from "../VideoCard";
import NavigationTabs from "../NavigationTabs";

function NewVideoPage() {
    const dispatch = useDispatch()
    const videos = useSelector((state) => state?.videos?.videos?.videos)

    useEffect(() => {
        dispatch(getAllVideoThunk())
    }, [dispatch])


    return (
        <>
            <div className='main-content-area'>
                <NavigationTabs />
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
