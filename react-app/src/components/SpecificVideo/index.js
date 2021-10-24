import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { deleteVideoThunk, specificVideoThunk } from '../../store/video';
import { useParams, useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player'
import { addCommentThunk } from '../../store/comment';

const SpecificVideo = () => {
    const user = useSelector((state) => state.session.user);
    const videos = useSelector((state) => state.videos?.videos)
    const {videoId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory()
    const [commentContent, setCommentContent] = useState('')

    useEffect(() => {
        dispatch(specificVideoThunk(videoId))
    }, [dispatch], videoId)

    const handleDeleteVideo = (videoId) => {
        dispatch(deleteVideoThunk(videoId))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newComment = {
            user_id: user.id,
            video_id: videoId,
            content: commentContent
        }
        dispatch(addCommentThunk(newComment))
    }

    function EditDeleteVideo(){
        if (user && videos?.user_id === user?.id) {
            return (
                <div>
                    <button className='edit-btn'
                    type='button'
                    onClick={() => {
                        history.push(`/videos/${videoId}/edit`)
                    }}
                    >
                        Edit Video</button>
                    <button className='delete-btn'
                    type='button'
                    onClick={() => {
                        handleDeleteVideo(videoId)
                        history.push("/")
                    }}>Delete Video</button>
                </div>
            )
        }else{
            return null
        }
    }

    return (
        <div>
            <div>
                {videos?.title}
                <ReactPlayer
                controls={true}
                url={videos?.video_url} />
            </div>
            <div>
                <EditDeleteVideo />
            </div>
            <div className='add-comment-area'>
                <form onSubmit={handleSubmit}>
                    <textarea cols="50" rows="5" placeholder='Comment'
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SpecificVideo;
