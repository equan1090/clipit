import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editVideoThunk, specificVideoThunk } from "../../store/video";
import './EditVideo.css'
const EditVideo = () => {
    const video = useSelector(store => store.videos?.videos)
    const user = useSelector((state) => state.session.user);
    const [errors, setErrors] = useState([])

    const [title, setTitle] = useState(video?.title)
    const [description, setDescription] = useState(video?.description)

    const history = useHistory();
    const dispatch = useDispatch()
    const {videoId} = useParams();



    useEffect(() => {
        dispatch(specificVideoThunk(videoId))
    }, [dispatch, videoId])

    if (!user) {
        history.push('/')
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let errors = []
        if(title.length < 5 || title.length > 30) errors.push('Title must be between 5 and 30 characters')
        if(errors.length) {
            setErrors(errors)
            return null
        }
        setErrors([])

        const updatedVideo = {
            id: videoId,
            title,
            description: description,
            created_at: video?.created_at,
            likes_count: video?.likes_count,
            comment_count: video?.comment_count,
            video_url: video?.video_url,

        }

        dispatch(editVideoThunk(updatedVideo));
        history.push(`/videos/${video?.id}`)
    }

    return (
        <div className='edit-wrapper'>
            <div className='edit-container'>
                <form onSubmit={handleSubmit} className='edit-video-form'>
                    <div>
                        {errors.map((error, idx) => (
                            <div className='errors' key={idx}>{error}</div>
                        ))}
                    </div>
                    <input type="text"
                    name='title'
                    onChange={(e) => {setTitle(e.target.value)}}
                    value={title}
                    required={true}
                    />
                    <textarea name="" id="" cols="30" rows="10"
                        value={description}
                        onChange={(e) => {setDescription(e.target.value)}} />
                    <button type='submit' className='edit-form-submit'>Edit Project</button>
                </form>
            </div>
        </div>
    )
}

export default EditVideo;
