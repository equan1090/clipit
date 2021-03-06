import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteVideoThunk, specificVideoThunk } from "../../store/video";
import { useParams, useHistory, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import CommentComponent from "../CommentComponent";
import {
  addCommentThunk,
  getCommentThunk,
} from "../../store/comment";
import "./SpecificVideo.css";
import editIcon from '../../images/edit-icon.png'
import deleteIcon from '../../images/delete.png'
import heartIcon from '../../images/heart.svg'
import { addLikeThunk, deleteSingleLike, setAllLikes } from "../../store/like";


const SpecificVideo = () => {
  const user = useSelector((state) => state.session.user);
  const videos = useSelector((state) => state.videos?.videos);
  const comments = useSelector((state) => state.comments);
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [commentContent, setCommentContent] = useState("");
  const [videoOwner, setVideoOwner] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const likes = useSelector((state) => state.likes)
  let userLiked = likes.filter(like => like?.user_id === user?.id && like?.video_id === videos?.id)
  let videoLiked = likes.filter(like => like?.video_id === videos?.id)




  const toggle = () => {
    setIsOpen(!isOpen)
  }
  function TooLong() {
    if(videos?.description?.length >= 260){
      return(
        <button id='showbtn' onClick={toggle}>
          {isOpen ? 'Show Less' : 'Show More'}
        </button>
      )
    } else{
      return null;
    }
  }
  function RenderAll() {
    if(isOpen) {
      return (
        <div>
          {videos?.description}
        </div>
      )
    } else{
      return (
        <div>
          {videos?.description?.slice(0, 260)}
        </div>
      )
    }
  }




  // Gets all comments, specific video, and likes
  useEffect(() => {
    dispatch(getCommentThunk(videoId));
    dispatch(specificVideoThunk(videoId));
    dispatch(setAllLikes())
  }, [dispatch, videoId]);



  // Sets the video owner
  useEffect(() => {
    if (!videos?.user_id) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${videos.user_id}`);
      const videoOwner = await response.json();
      setVideoOwner(videoOwner);
    })();
  }, [videos?.user_id]);

  const handleDeleteVideo = (videoId) => {
    dispatch(deleteVideoThunk(videoId));

  };

  //Creates a new comment
  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      user_id: user.id,
      video_id: videoId,
      content: commentContent,
    };
    dispatch(addCommentThunk(newComment, videoId));
    setCommentContent("");
  };


  //Display buttons for edit and deleting a video
  //Only works if logged in user owns the video
  function EditDeleteVideo() {
    if (user && videos?.user_id === user?.id) {
      return (
        <div className="video-btn-container">
          <button
            className="edit-comment"
            type="button"
            onClick={() => {
              history.push(`/videos/${videoId}/edit`);
            }}
          >
            <img src={editIcon} alt="" />
          </button>
          <button
            className="delete-comment"
            type="button"
            onClick={() => {
              handleDeleteVideo(videoId);
              history.push(`/videos/popular`);
            }}
          >
            <img src={deleteIcon} alt="" />
          </button>
        </div>
      );
    } else {
      return null;
    }
  }

  // Add and Delete likes from video
  const likeBtn = (e) => {
    e.preventDefault()

    if(userLiked.length) {
      dispatch(deleteSingleLike(userLiked[0]?.id))

    }else {
      dispatch(addLikeThunk({user_id: user?.id, video_id: videos?.id}))
    }

  }


  return (
    <div>
      <div className="content-container">
        <h1>{videos?.title}</h1>
        <div className="comment-user">
          <div className="owner-pic">
            <Link to={`/users/${videoOwner.id}`}>
              <img className="profile-pic" src={videoOwner.avatar_url} alt="" />
            </Link>
          </div>
          <div className="username">
            <Link id='specific-user' to={`/users/${videoOwner.id}`}>{videoOwner.username}</Link>
          </div>
        </div>
        <ReactPlayer controls={true} url={videos?.video_url} />
      </div>
      <div className='video-icons'>
        <div className='like-btn-container'>
          <form id='like-form' onSubmit={likeBtn}>
            {videoLiked.length}
            {userLiked?.length ?
              <button className='like-btn'><img id='like-img' src={heartIcon} alt="" /></button>:
              <button className='like-btn'><img id='unlike-img' src={heartIcon} alt="" /></button>
            }
          </form>
        </div>
        <div>
          <EditDeleteVideo id={comments?.id} />
        </div>
      </div>

      {/* Video description area */}

      <div className='description-area-wrapper'>
        <div className='video-description'>
          <RenderAll />
          <TooLong />
        </div>
        <div className='showmore-btn'>
        </div>
      </div>

      {/* Comment input box */}
      <div className="add-comment-area">

        <form onSubmit={handleSubmit}>
          <textarea
            cols="50"
            rows="5"
            placeholder="Comment"
            value={commentContent}
            required={true}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <button id='post-comment-btn' type="submit">Post</button>
        </form>

      </div>
      {/* Comment List Area */}
      <div className="comment-area-wrapper">
        <div className="comment-list">
          {comments?.map((comment) => (
            <div key={comment?.id}>
              <CommentComponent comment={comment} likes={videoLiked} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificVideo;
