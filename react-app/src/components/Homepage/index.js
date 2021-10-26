import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllVideoThunk } from "../../store/video";

const Homepage = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const [featuredVideo, setFeaturedVideo] = useState({})
    const videos = useSelector((state) => state.videos)
    useEffect(() => {
        dispatch(getAllVideoThunk())
    }, [dispatch])

    return (
        <div>
            <p>Hello</p>
        </div>
    )
}


export default Homepage;
