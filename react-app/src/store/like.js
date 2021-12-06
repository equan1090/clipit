const SET_LIKE = "SETLIKES"

const load = (likes) => ({
    type: SET_LIKE,
    payload: likes
})


export const addLikeThunk = (like) => async (dispatch) => {
    const res = await fetch("/api/videos/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(like)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(load(data))
    } else {
        return "ADD LIKE FAILED"
    }
}

export const deleteSingleLike = (id) => async (dispatch) => {

    const res = await fetch("/api/videos/likes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({like_id: id})
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(load(data))
    }
}

export const setAllLikes = () => async(dispatch) => {
    const res = await fetch("/api/videos/likes")
    if(res.ok) {
        const data = await res.json()
        dispatch(load(data))
    }
    else{
        return "SETALLLIKES THUNK ERROR"
    }
}

const initialState = []
const likeReducer = (state = initialState, action) => {
    let newState
    switch(action.type) {
        case SET_LIKE:
            newState = action.payload.likes
            return newState
        default:
            return state
    }
}

export default likeReducer;
