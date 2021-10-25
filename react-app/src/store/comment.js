const ADD_COMMENT = 'ADD'
const DELETE_COMMENT = 'DELETE'


const addCommentAction = (comments) => ({
    type: ADD_COMMENT,
    payload: comments
})


// const loadCommentAction = (comments) => ({
//     type: LOAD_COMMENT,
//     payload: comments
// })

export const deleteCommentThunk = (id) => async(dispatch) => {
    const res = await fetch('/api/videos/comments', {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id})
    })
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

// export const loadCommentThunk = (videoId) => async(dispatch) => {
//     const res = await fetch('/api/videos/comments', {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({videoId})
//     })
//     if(res.ok) {
//         const comments = await res.json()
//         dispatch(loadCommentAction(comments))
//     }

// }

const initialState = {};

function commentReducer(state = initialState, action) {
    const newState = {...state}
    switch (action.type) {
        case ADD_COMMENT:
            return {
                newState,
                comments: action.payload
            }
        // case LOAD_COMMENT:
        //     return action.payload
        default:
            return state;
    }
}

export default commentReducer;
