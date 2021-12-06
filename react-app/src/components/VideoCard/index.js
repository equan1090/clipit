import React, {useEffect, useState} from "react";
import './VideoCard.css'
import {Link} from 'react-router-dom'
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { getCommentThunk } from "../../store/comment";

function VideoCard(props) {

    const [videoOwner, setVideoOwner] = useState({})
    const video = props?.video
    const likes = props?.video?.likes
    const dispatch = useDispatch();



    useEffect(() => {

        (async () => {
            const response = await fetch(`/api/users/${video.user_id}`)
            const user = await response.json();
            setVideoOwner(user)
        })();

    }, [video.user_id])

    useEffect(() => {
        dispatch(getCommentThunk(video?.id));
    }, [dispatch, video])

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
                    <div className='more-video-info'>
                        <p>{likes.length} Likes</p>
                        <p>{video?.comments?.length} Comments</p>
                    </div>
                </div>

            </div>
        </>
    )


}

export default VideoCard;
