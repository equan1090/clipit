import React, {useEffect, useState} from "react";
import './VideoCard.css'
import {Link} from 'react-router-dom'
import ReactPlayer from "react-player";

function VideoCard(props) {

    const [videoOwner, setVideoOwner] = useState({})
    const video = props?.video


    useEffect(() => {

        (async () => {
            const response = await fetch(`/api/users/${video.user_id}`)
            const user = await response.json();
            setVideoOwner(user)
        })();

    }, [video.user_id])

    return(
        <>
            <div className='video-card-container'>
                <div className='video-card'>
                    <div className='card-owner'>
                        <Link to={`/users/${videoOwner?.id}`}>
                            <img className='owner-profile-pic' src={videoOwner?.avatar_url} alt="" />
                        </Link>
                        <Link to={`/users/${videoOwner?.id}`}>
                            <strong>{videoOwner.username}</strong>
                        </Link>
                    </div>
                    <div className='video-title'>
                        <Link to={`/videos/${video.id}`}>
                            <h2 id="title-card">{video.title}</h2>
                        </Link>
                    </div>
                    <Link to={`/videos/${video.id}`}>
                        <div className='card-video'>
                            <ReactPlayer
                                height={400}
                                url={props.video?.video_url}
                            />
                        </div>
                    </Link>
                </div>

            </div>
        </>
    )


}

export default VideoCard;
