import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentThunk, editCommentThunk } from "../../store/comment";
import './CommentComponent.css'
import deleteIcon from '../../images/delete.png'
import editIcon from '../../images/edit-icon.png'
function CommentComponent({comment}) {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
    const {videoId} = useParams()
    const [isOpen, setIsOpen] = useState(false)
    const [content, setContent] = useState(comment?.content)
    const [showEdit, setShowEdit] = useState(false)

    const toggle = () => {
      setIsOpen(!isOpen)
    }
    function TooLong ({comment}) {
      if(comment.content.length >= 260){
        return(
          <button id='showbtn' onClick={toggle}>
            {isOpen ? 'Show Less' : 'Show More'}
          </button>
        )
      } else{
        return null;
      }
    }
    function RenderAll({comment}) {
      if(isOpen) {
        return (
          <div>
            {comment.content}
          </div>
        )
      }
      return(
        <div>
          {comment.content.slice(0, 260)}
        </div>
      )
    }



    const handleDeleteComment = (commentId) => {
      dispatch(deleteCommentThunk(commentId, videoId));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const changed = {
        id: comment?.id,
        content
      }

      dispatch(editCommentThunk(changed, videoId))
      setShowEdit(false)
    }

    const editComment = (e) => {
      e.preventDefault()
      setShowEdit(true)

    }
    function EditDeleteComment(comment) {

      if (user?.id === comment?.comment?.user_id) {
        return (
          <div className="more-option">
            <button className="edit-comment"
            onClick={editComment}>
              <img src={editIcon} alt="" />
            </button>
            <button
              className="delete-comment"

              onClick={() => {
                handleDeleteComment(comment.comment?.id);
              }}
            >
              <img src={deleteIcon} alt="" />
            </button>
          </div>
        );
      }
      return null;
    }

    if(showEdit){
      return(
        <>
        <div className="comment-user">
                  <div className="profile-pic-container">
                    <NavLink to={`/users/${comment?.users?.id}`}>
                      <img
                        className="profile-pic"
                        src={comment?.users?.avatar_url}
                        alt=""
                      />
                    </NavLink>
                    <NavLink to={`/users/${comment?.users?.id}`}>
                      {comment?.users?.username}
                    </NavLink>
                  </div>
                </div>

          <form onSubmit={handleSubmit}>
              <textarea

                cols="50"
                rows="5"
                placeholder="Comment"
                value={content}
                required={true}
                onChange={(e) => setContent(e.target.value)}
              />
              <button type="submit"
              >Submit</button>
          </form>
        </>
      )
    }else{

      return (
          <>

          <div className="single-comment" key={comment.comment?.id}>
                <div className="comment-user">
                  <div className="profile-pic-container">
                    <NavLink to={`/users/${comment?.users?.id}`}>
                      <img
                        className="profile-pic"
                        src={comment?.users?.avatar_url}
                        alt=""
                      />
                    </NavLink>
                    <NavLink className='comment-user' to={`/users/${comment?.users?.id}`}>
                      {comment?.users?.username}
                    </NavLink>
                  </div>

                </div>
                <div className="comment-content">
                  <RenderAll comment={comment}/>
                </div>
                <div className='showmore-btn'>
                  <TooLong comment={comment}/>
                </div>
                <EditDeleteComment comment={comment} />
              </div>
          </>
      )
    }


}

export default CommentComponent;
