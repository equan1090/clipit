import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentThunk, editCommentThunk } from "../../store/comment";
function CommentComponent({comment}) {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
    const {videoId} = useParams()



    const [content, setContent] = useState(comment?.content)
    const [showEdit, setShowEdit] = useState(false)

    const handleDeleteComment = (commentId) => {
      dispatch(deleteCommentThunk(commentId, videoId));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const updatedComment = {
        content
      }

      dispatch(editCommentThunk(updatedComment))
    }
    // const keyPress = (e) => {
    //     if(e.key === "Enter") {
    //         handleSubmit(e)
    //     }
    // }
    const editComment = (e) => {
      e.preventDefault()
      setShowEdit(true)

    }
    function EditDeleteComment(comment) {

      if (user?.id == comment?.comment?.user_id) {
        return (
          <div className="more-option">
            <button className="edit-comment"
            onClick={editComment}
            >Edit</button>
            <button
              className="delete-comment"
              onClick={() => {
                handleDeleteComment(comment.comment?.id);
              }}
            >
              Delete
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
                  <div className="option">
                    <button>
                      <img src="../../assets/optionIcon.svg" alt="" />
                    </button>
                  </div>
                </div>

          <form onSubmit={handleSubmit}>
              <textarea
                // onKeyPress={keyPress}
                cols="50"
                rows="5"
                placeholder="Comment"
                value={content}
                required={true}
                onChange={(e) => setContent(e.target.value)}
              />
              <button type="submit">Submit</button>
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
                    <NavLink to={`/users/${comment?.users?.id}`}>
                      {comment?.users?.username}
                    </NavLink>
                  </div>
                  <div className="option">
                    <button>
                      <img src="../../assets/optionIcon.svg" alt="" />
                    </button>
                  </div>
                </div>
                <div className="comment-content">
                  {comment.content}
                  </div>
                <EditDeleteComment comment={comment} />
              </div>
          </>
      )
    }


}

export default CommentComponent;
