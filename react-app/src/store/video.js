const CREATE_VIDEO = 'CREATE/VIDEO'
const GET_SPEICIFIC_VIDEO = 'LOAD'
const EDIT_VIDEO = 'EDIT'
const DELETE_VIDEO = "DELETE"


const editVideoAction = (video) => ({
    type: EDIT_VIDEO,
    payload: video
})

const createVideoAction = (video) => ({
    type: CREATE_VIDEO,
    payload: video
})

const specificVideoAction = (video) => ({
    type: GET_SPEICIFIC_VIDEO,
    payload: video
})

export const deleteVideoThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/videos/${id}`, {
        method: "DELETE",
    })

    if(response.ok) {
        const video = await response.json();
        dispatch(specificVideoAction(id))
        return video
    }

}

export const editVideoThunk = (video) => async(dispatch) => {
    console.log('This is video in editVideoThunk', video)
    const res = await fetch(`/api/videos/${video.id}`, {
        method: "PATCH",
        body: JSON.stringify(video),
        headers: {
            "content-type": "application/json",
        }
    })

    if (res.ok) {
        console.log('Made it in res.ok')
        const editedVideo = await res.json();
        dispatch(editVideoAction(editedVideo));
        return editedVideo
    }else{
        return ["An error occured. Please try again"]
    }

}

export const specificVideoThunk = (id) => async(dispatch) => {
    const res = await fetch(`/api/videos/${id}`)

    if (res.ok) {
        const data = await res.json();
        dispatch(specificVideoAction(data));
    } else{
        return ["An error occured. Please try again"]
    }
    return res
}

export const createVideoThunk = (video) => async(dispatch) => {

    const res = await fetch('/api/videos', {
        method: 'POST',
        body: video,
    })

    if (res.ok) {
        const data = await res.json();
        if(data.errors){
            return;
        }
        dispatch(createVideoAction(data));

        return data;
    }
}

const initialState = {};

function videoReducer(state = initialState, action) {
    const newState = {...state}
    switch (action.type) {
        case CREATE_VIDEO:
            return {
                newState,
                videos: action.payload
            }
        case GET_SPEICIFIC_VIDEO:
            return {
                videos: action.payload
            }
        case DELETE_VIDEO:
            return {
                newState,
                videos: action.payload
            }

        default:
            return state;
    }
}
export default videoReducer
