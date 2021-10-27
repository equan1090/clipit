
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import {useSelector} from 'react-redux'
import './Users.css'

function User() {
  const currentUser = useSelector((state) => state.session.user)
  const [user, setUser] = useState({});
  const [videos, setVideos] = useState({})
  const { userId }  = useParams();

  // Gets information about the User for each profile page
  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  // Grabs all videos that belongs to Profile Page User
  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const res = await fetch(`/api/users/${userId}/videos`)
      const videos = await res.json();
      setVideos(videos)
    })();
  }, [userId])

  if (!user) {
    return null;
  }

  // If logged in user owns profile page, then it displays different results
  function Owner() {
    if(currentUser.id === +userId){
      return (
        <div>
            <p>Upload your first video <Link to='/upload'>here</Link></p>
        </div>
      )
    }else{
      return (
        <div>
          <p>This user has not uploaded a video</p>
        </div>
      )
    }
  }

  let featured;

  if (videos.videos?.length > 0){
    featured = videos?.videos?.reduce(function(prev, current) {
      return (prev.likes_count > current.likes_count) ? prev : current
    })

  }

  if (featured){

    return (
      <div className='profile-wrapper'>
        <div className='profile-main'>
          <div className='profile-featured-video'>
            <h1>Featured</h1>
            <h3>{featured?.title}</h3>
            <ReactPlayer
              controls={true}
              url={featured?.video_url}
            />
            <div className='profile-user'>
              <div className='profile-user-pic'>
                <img className='profile-user-pic' src={user?.avatar_url} alt="" />
              </div>
              <div className='profile-username'>
                {user?.username}
              </div>
            </div>
          </div>
          <div className='featured-comments'>
          </div>
        </div>
      </div>
    );
  }else{
    return(
      <>
        <div className='profile-container'>
          <div className='new-user-pic'>
            <img className='new-user-pic' src={user?.avatar_url} alt="New User Image" />
          </div>
          <div className='new-username'>
            <h2>{user?.username}</h2>
          </div>
        </div>
        <div className='new-content-container'>
          <div className='go-upload'>
            <Owner />
          </div>
        </div>
      </>
    )
  }

}
export default User;
