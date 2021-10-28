import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
// import { getAllVideoThunk } from "../../store/video";
import './Homepage.css'
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
        <>
          <div className='navigation-tabs'>
            <div className='popular-tab'>
              <Link id='popular' to='/videos/popular'>Popular</Link>
            </div>
            <div className='new-tab'>
              <Link id='new' to='/videos/new'>New</Link>
            </div>

          </div>
          <div className='featured-home'>
            <ReactPlayer
            controls={true}
            url={featured?.video_url}
            />
          </div>
        </>
    )
}


export default Homepage;
