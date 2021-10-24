const ADD_COMMENT = 'ADD'
const LOAD_COMMENT = 'LOAD'

const loadCommentAction = (comments) => ({
    type: LOAD_COMMENT,
    payload: comments
})

const addCommentAction = (comments) => ({
    type: ADD_COMMENT,
    payload: comments
})

export const loadCommentThunk = (id) => async(dispatch) => {
    const res = await fetch(`/api/videos/${id}/comments`)
    if (res.ok) {
        const comments = await res.json();
        dispatch(loadCommentAction(comments))
    }else {
        return "Failed to get video's comments"
    }
}

export const addCommentThunk = (comment) => async (dispatch) => {
    const res = await fetch(`/api/videos/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    })
    if (res.ok) {
        const new_comment = await res.json();
        dispatch(addCommentAction(new_comment))
    }else {
        return "Failed to add comment"
    }
}

const initialState = {};

function commentReducer(state = initialState, action) {
    const newState = {...state}
    switch (action.type) {
        case ADD_COMMENT:
            return {
                newState,
                comments: action.payload
            }
        default:
            return state;
    }
}

export default commentReducer;
