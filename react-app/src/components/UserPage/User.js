
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import {useSelector} from 'react-redux'


function User() {
  const [user, setUser] = useState({});
  const [videos, setVideos] = useState({})
  const { userId }  = useParams();

  console.log('this is user',user)
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
  console.log('this is videos', videos)
  // const featured = videos.videos
  // console.log(featured)

  return (
    <div className='profile-wrapper'>
      <div className='profile-main'>
        <div className='profile-featured-video'>
          {videos.videos?.map((video) => (
            <div>{video.title}</div>
          ))}
          <strong>Username</strong> {user.username}
        </div>
        <div className='featured-comments'>

        </div>
      </div>
      <ul>
        <li>
        </li>
      </ul>
    </div>
  );
}
export default User;
