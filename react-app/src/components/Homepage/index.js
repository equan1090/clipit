import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import githublogo from '../../images/github-logo.png'
import linkedinlogo from '../../images/linkedin.png'

import './Homepage.css'
import LoginForm from "../auth/LoginForm";

const Homepage = () => {

    const [videos, setVideos] = useState({})


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
                  Not registered? Sign up &nbsp;<Link to='/sign-up' className='sign-up-here'>here</Link>
                </div>
            </div>
          <div className='footer'>
            <a target="_blank" href="https://github.com/equan1090" rel="noreferrer">
              <img src={githublogo} alt="" />
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/eric-quan-821139190/" rel="noreferrer">
              <img id='linkedin' src={linkedinlogo} alt="" />
            </a>
          </div>
          </div>

        </>
    )
}


export default Homepage;
