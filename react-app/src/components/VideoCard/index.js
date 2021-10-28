import React, {useEffect, useState} from "react";
import './VideoCard.css'
import ReactPlayer from "react-player";

function VideoCard(props) {
    console.log('Inside video card', props.video)
    const [videoOwner, setVideoOwner] = useState({})
    const video = props?.video
    useEffect(() => {

        (async () => {
            const response = await fetch(`/api/users/${props.video?.user_id}`)
            const user = await response.json();
            setVideoOwner(user)
        })();

    }, [props.video?.user_id])
    console.log('this is videoowner', videoOwner)
    return(
        <>
            <div className='video-card-container'>
                <div className='video-card'>
                    <div className='card-owner'>
                        <img className='owner-profile-pic' src={videoOwner?.avatar_url} alt="" />
                        <strong>{videoOwner.username}</strong>
                    </div>
                    <div className='video-title'>
                        <h2>{video.title}</h2>
                    </div>
                    <div className='card-video'>
                        <ReactPlayer
                            url={props.video?.video_url}
                        />
                    </div>
                </div>
                {/* <div className='card-comments'>

                </div> */}
            </div>
        </>
    )


}

export default VideoCard;
