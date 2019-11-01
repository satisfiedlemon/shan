import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';

function NewUser({}) {

  const server = config.server.url;
  const [ userName, setUserName ] = useState();
  const [ fullName, setFullName ] = useState();

  const createUser = (e) => {
    e.preventDefault();
    try {
      axios.post(`${server}/user`, {
        user_name: userName,
        full_name: fullName
      });
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h2>Create a New User</h2>

      <form onSubmit={createUser}>
        <input type="text" placeholder="Enter User Name" value={userName || ''} onChange={e => setUserName(e.target.value)} />
        <input type="text" placeholder="Enter Full Name" value={fullName || ''} onChange={e => setFullName(e.target.value)} />
        <button>Create</button>
      </form>
    </div>
  )
}

export default NewUser;