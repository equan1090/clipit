import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteVideoThunk, specificVideoThunk } from "../../store/video";
import { useParams, useHistory, NavLink, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import CommentComponent from "../CommentComponent";
import {
  addCommentThunk,
  deleteCommentThunk,
  getCommentThunk,
  editCommentThunk
} from "../../store/comment";
import "./SpecificVideo.css";

const SpecificVideo = () => {
  const user = useSelector((state) => state.session.user);
  const videos = useSelector((state) => state.videos?.videos);
  const comments = useSelector((state) => state.comments);
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [commentContent, setCommentContent] = useState("");
  const [videoOwner, setVideoOwner] = useState({})
  const [showEdit, setShowEdit] = useState(false)

  // Gets
  useEffect(() => {
    dispatch(getCommentThunk(videoId));
    dispatch(specificVideoThunk(videoId));
  }, [dispatch, videoId]);

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
  // const handleDeleteComment = (commentId) => {
  //   dispatch(deleteCommentThunk(commentId, videoId));
  // };

  const handleDeleteVideo = (videoId) => {
    dispatch(deleteVideoThunk(videoId));
  };

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

  function EditDeleteVideo() {
    if (user && videos?.user_id === user?.id) {
      return (
        <div className="video-btn-container">
          <button
            className="edit-btn"
            type="button"
            onClick={() => {
              history.push(`/videos/${videoId}/edit`);
            }}
          >
            Edit Video
          </button>
          <button
            className="delete-btn"
            type="button"
            onClick={() => {
              handleDeleteVideo(videoId);
              history.push("/");
            }}
          >
            Delete Video
          </button>
        </div>
      );
    } else {
      return null;
    }
  }

  function LoggedIn(){
    if(user){
      return (
        <form onSubmit={handleSubmit}>
        <textarea
          cols="50"
          rows="5"
          placeholder="Comment"
          value={commentContent}
          required={true}
          onChange={(e) => setCommentContent(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      )
    } else{
      return (
        <>
          <p>Log in to comment!</p>
        </>
      )
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
            <Link to={`/users/${videoOwner.id}`}>{videoOwner.username}</Link>
          </div>
        </div>
        <ReactPlayer controls={true} url={videos?.video_url} />
      </div>
      <div>
        <EditDeleteVideo id={comments?.id} />
      </div>
      <div className="add-comment-area">
        <LoggedIn />
      </div>
      <div className="comment-area-wrapper">
        <div className="comment-list">
          {comments?.map((comment) => (
            <div>
              <CommentComponent key={comment?.id} comment={comment} />
            </div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificVideo;
