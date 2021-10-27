import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// import { getAllVideoThunk } from "../../store/video";

const Homepage = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const [featuredVideo, setFeaturedVideo] = useState(null)
    // const videos = useSelector((state) => state.videos)
    const [videos, setVideos] = useState({})
    // useEffect(() => {
    //     dispatch(getAllVideoThunk())
    // }, [dispatch])


    useEffect(() => {
        (async () => {
            const res = await fetch('/api/videos')
            const videos = await res.json();
            setVideos(videos);
        })();
    }, [])
    console.log(videos)
    let featured
    if(videos.videos?.length > 0) {
        featured = videos.videos?.reduce((prev, current) => {
            return (prev.likes_count > current.likes_count) ? prev : current
        })
    }
    console.log('this is featured',featured)


    return (
        <div>

        </div>
    )
}


export default Homepage;
