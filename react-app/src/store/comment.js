const ADD_COMMENT = "ADD";
const LOAD_COMMENT = "LOAD/COMMENT";
const DELETE_COMMENT = "DELETE/COMMENT";

// const addCommentAction = (comments) => ({
//   type: ADD_COMMENT,
//   payload: comments,
// });

// const deleteCommentAction = (comments) => ({
//   type: DELETE_COMMENT,
//   payload: comments,
// });


const loadCommentAction = (comments) => ({
  type: LOAD_COMMENT,
  payload: comments,
});

export const deleteCommentThunk = (id, videoId) => async (dispatch) => {
  const res = await fetch(`/api/videos/${videoId}/comments`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (res.ok) {

    let comment = await res.json();
    dispatch(loadCommentAction(comment));
  }
};

export const editCommentThunk = (comment, id) => async(dispatch) => {
  const res = await fetch(`/api/videos/${id}/comments`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment)
  })

  if(res.ok){

    const editted = await res.json();

    dispatch(loadCommentAction(editted))
  }
}

export const getCommentThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/videos/${id}/comments`);

  if (res.ok) {
    const comments = await res.json();
    dispatch(loadCommentAction(comments));
  }
};

export const addCommentThunk = (comment, videoId) => async (dispatch) => {
  const res = await fetch(`/api/videos/${videoId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  if (res.ok) {
    const new_comment = await res.json();
    dispatch(loadCommentAction(new_comment));
  } else {
    return "Failed to add comment";
  }
};

const initialState = [];

function commentReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case ADD_COMMENT:
      return {
        newState,
        comments: action.payload,
      };
    case LOAD_COMMENT:
      return action.payload.comments;

    case DELETE_COMMENT:
      return action.payload.comments;
    default:
      return state;
  }
}

export default commentReducer;
