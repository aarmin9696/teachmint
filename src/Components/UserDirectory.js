// UserDirectory.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserDirectory = () => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            const usersData = response.data;
    
            // Fetch and update posts for each user
            const updatedUsers = await Promise.all(
              usersData.map(async (user) => {
                const postsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
                const userPosts = postsResponse.data;
                return { ...user, posts: userPosts };
              })
            );
    
            setUsers(updatedUsers);
          } catch (error) {
            console.error('Error fetching users and posts:', error);
          }
        };
    
        fetchUserData();
      }, []);
  return (
    <div className='directory'>
      <h1>User Directory</h1>
      {users.map(user => (
        <div key={user.id} className="user-card">
          {/* Link to user profile page */}
          <Link to={`/user/${user.id}`}>
            <div className="user-info">
              {/* User name in top left */}
              <p className="user-name">{`Name: ${user.name}`}</p>
              {/* Total number of posts in top right */}
              <p className="post-count">{`Posts: ${user.posts ? user.posts.length : 0}`}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UserDirectory;
