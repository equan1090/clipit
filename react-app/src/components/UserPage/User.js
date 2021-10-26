import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

function User() {
  const [user, setUser] = useState({});
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

  if (!user) {
    return null;
  }

  return (
    <div className='profile-wrapper'>
      <div className='profile-main'>
        <div className='profile-featured-video'>

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
