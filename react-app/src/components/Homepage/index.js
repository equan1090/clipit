import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import githublogo from '../../images/github-logo.png'
import linkedinlogo from '../../images/linkedin.png'
// import { getAllVideoThunk } from "../../store/video";
import './Homepage.css'
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
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
          <div className='text-wrapper'>
            <ul className='dynamic-text'>
              <li><span>Share clips like these & impress</span></li>
            </ul>
          </div>
          <div className="signup-login-container">
            <div className="home-video-area">
              <ReactPlayer
              controls={true}
              url={featured?.video_url}
              />
            </div>
            <div className="login-and-signup-area">
                <div className="login-area">
                  <LoginForm />
                </div>
                <div className="sign-up-area">
                  Not registered? Sign up &nbsp;<Link to='/sign-up'>here</Link>
                </div>
            </div>
          <div className='footer'>
            <a target="_blank" href="https://github.com/equan1090">
              <img src={githublogo} alt="" />
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/eric-quan-821139190/">
              <img id='linkedin' src={linkedinlogo} alt="" />
            </a>
          </div>
          </div>

        </>
    )
}


export default Homepage;
