import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { deleteVideoThunk, specificVideoThunk } from '../../store/video';
import { useParams, useHistory, NavLink, Link } from 'react-router-dom';
import ReactPlayer from 'react-player'
import { addCommentThunk, getCommentThunk } from '../../store/comment';
import './SpecificVideo.css'
const SpecificVideo = () => {
    const user = useSelector((state) => state.session.user);
    const videos = useSelector((state) => state.videos?.videos)
    const comments = useSelector((state) => state.comments)
    const {videoId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory()
    const [commentContent, setCommentContent] = useState('')
    const [videoOwner, setVideoOwner] = useState({})
    console.log('owner of video',videoOwner)



    // Gets
    useEffect(() => {
        dispatch(getCommentThunk(videoId))
        dispatch(specificVideoThunk(videoId))
    }, [dispatch, videoId])

    useEffect(() => {
        if (!videos?.user_id){
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${videos.user_id}`);
            const videoOwner = await response.json();
            setVideoOwner(videoOwner);
        })();
    }, [videos?.user_id])
    const handleDeleteComment = (commentId) => {

    }

    const handleDeleteVideo = (videoId) => {
        dispatch(deleteVideoThunk(videoId))
    }

    // Submits form and sends the comment to the store
    const handleSubmit = (e) => {
        e.preventDefault()
        const newComment = {
            user_id: user.id,
            video_id: videoId,
            content: commentContent
        }
        dispatch(addCommentThunk(newComment, videoId))
        setCommentContent('')
    
    }

    function EditDeleteVideo(){
        if (user && videos?.user_id === user?.id) {
            return (
                <div className='video-btn-container'>
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
            <div className='content-container'>
                <h1>{videos?.title}</h1>
                <div className='comment-user'>
                    <div className='owner-pic'>
                        <Link to={`/users/${videoOwner.id}`}><img className='profile-pic' src={videoOwner.avatar_url} alt="" /></Link>
                    </div>
                    <div className='username'>
                       <Link to={`/users/${videoOwner.id}`}>
                        {videoOwner.username}
                        </Link>
                    </div>
                </div>
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
                    required={true}
                    onChange={(e) => setCommentContent(e.target.value)
                    }
                    />
                    <button type='submit'>Submit</button>
                </form>
            </div>
            <div className='comment-list'>
                <ul>
                    {comments?.map((comment) => (
                        <div className='single-comment' key={comment.id}>
                            <div className='comment-user'>
                                <div className='profile-pic-container'>
                                    <NavLink to={`/users/${comment?.users?.id}`}><img className='profile-pic' src={comment?.users?.avatar_url} alt="" /></NavLink>
                                </div>
                                <div className='username'>
                                    <NavLink to={`/users/${comment?.users?.id}`}>{comment?.users?.username}</NavLink>
                                </div>
                            </div>
                            <p className='comment-content'>{comment.content}</p>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}


export default SpecificVideo;
