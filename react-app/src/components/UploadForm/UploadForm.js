import React, { useState, useEffect } from 'react'
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import './UploadForm.css'

const UploadForm = () => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState(null);
    const [videoLoading, setVideoLoading] = useState(false);
    const user = useSelector((state) => state.session.user)
    const history = useHistory();


    if(!user){
        history.push('/login')
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        let errors = []
        const acceptedTypes = ["mp4", "webm", "mov", "wmv", "avi"]

        let fileArr = video ? video.name.split('.') : null
        let fileType = video ? fileArr[fileArr.length - 1] : null

        if(!video) errors.push('Please provide a video')
        if(video && !acceptedTypes.includes(fileType)) errors.push('Filetype must be an .mp4, .webm, .mov, .wmv or an .avi')
        if(title.length > 30) errors.push('Title must be 30 characters or less')
        if(title.length < 5) errors.push('Title must be at least 5 characters long')
        if(errors.length) {
            setErrors(errors)
            return null
        }
        setErrors('')

        const formData = new FormData();
        formData.append('video', video)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('user_id', user.id)

        setVideoLoading(true)
        const res = await fetch('/api/videos', {
            method: "POST",
            body: formData
        });

        if (res.ok) {
            const data = await res.json()
            setVideoLoading(false)
            history.push(`/videos/${data?.id}`)
        } else{

            setVideoLoading(false)

        }

        setVideoLoading(false)

    }
    const updateVideo = (e) => {
        const file = e.target.files[0];
        setVideo(file)
    }
    useEffect(() => {
        setVideo(null)
    }, [setVideo])


    return (
        <div className='upload-wrapper'>
            <div className='upload-container'>
                {errors && errors.map((error, ind) => (
                    <div className='errors' key={ind}>
                        {error}
                    </div>
                ))}
                <form onSubmit={handleSubmit}
                className='upload-form'>

                    <input type="text"
                    placeholder='Title'
                    name='title'
                    onChange={(e) => {setTitle(e.target.value)}}
                    value={title}
                    required={true}
                    />

                    <textarea name="" id="" cols="30" rows="10"
                    placeholder='Description'
                    value={description}
                    onChange={(e) => {setDescription(e.target.value)}} />

                    <input type="file"
                    accept="video/*"
                    onChange={updateVideo}
                    required={true}
                    />
                    <button type="submit">Submit</button>
                    {(videoLoading)&& <p>Loading...</p>}
                </form>

            </div>
            <div className='guidelines'>
                <div className="guideline-title">
                    <strong>Posting to Clip it</strong>
                </div>
                <ol>
                    <li>Behave like you would in real life</li>
                    <li>Look for the original source of content</li>
                    <li>Use appropriately</li>
                    <li>Follow community guidelines</li>
                    <li>Remember, this is not a real website</li>
                    <li>Enjoy this simple project</li>
                </ol>

            </div>
        </div>
    )
}

export default UploadForm;
