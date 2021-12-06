const CREATE_VIDEO = "CREATE/VIDEO";
const GET_SPEICIFIC_VIDEO = "LOAD/VIDEO";
const EDIT_VIDEO = "EDIT";
const DELETE_VIDEO = "DELETE/VIDEO";
const GET_ALL = "GET/VIDEO";

const editVideoAction = (video) => ({
  type: EDIT_VIDEO,
  payload: video,
});

const getAllVideoAction = (videos) => ({
  type: GET_ALL,
  payload: videos,
});

const createVideoAction = (video) => ({
  type: CREATE_VIDEO,
  payload: video,
});

const specificVideoAction = (video) => ({
  type: GET_SPEICIFIC_VIDEO,
  payload: video,
});

export const popularVideoThunk = () => async(dispatch) => {
  const res = await fetch("/api/videos/popular")
  if(res.ok) {
    const videos = await res.json();
    videos.videos.sort((a, b) => (b.likes.length > a.likes.length)? 1: -1)
    dispatch(getAllVideoAction(videos))
  } else{
    return "cannot get popular videos"
  }

}

export const getAllVideoThunk = () => async (dispatch) => {
  const res = await fetch("/api/videos");
  if (res.ok) {
    const videos = await res.json();
    dispatch(getAllVideoAction(videos));
  } else {
    return "Cannot get all videos";
  }
};

export const deleteVideoThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/videos/${id}`, {
    method: "DELETE",
  })
  if (response.ok) {
    const video = await response.json();

    dispatch(getAllVideoAction(video));
  } else{
    return "error"
  }
};

export const editVideoThunk = (video) => async (dispatch) => {

  const res = await fetch(`/api/videos/${video.id}`, {
    method: "PATCH",
    body: JSON.stringify(video),
    headers: {
      "content-type": "application/json",
    },
  });

  if (res.ok) {

    const editedVideo = await res.json();
    dispatch(editVideoAction(editedVideo));
    return editedVideo;
  } else {
    return ["An error occured. Please try again"];
  }
};




export const specificVideoThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/videos/${id}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(specificVideoAction(data));
  } else {
    return "An error occured. Please try again";
  }
  return res;
};

export const createVideoThunk = (video) => async (dispatch) => {
  const res = await fetch("/api/videos", {
    method: "POST",
    body: video,
  });

  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return;
    }
    dispatch(createVideoAction(data));

    return data;
  }
};

const initialState = [];

function videoReducer(state = initialState, action) {
  const newState = {...state} ;
  switch (action.type) {

    case GET_ALL:
      return {
        videos: action.payload
      };

    case CREATE_VIDEO:
      return {
        videos: action.payload
      };

    case GET_SPEICIFIC_VIDEO:
      return {
        videos: action.payload,
      };
    case DELETE_VIDEO:
      return {
        newState,
        videos: action.payload,
      };

    default:
      return state;
  }
}
export default videoReducer;
