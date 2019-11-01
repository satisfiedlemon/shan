import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';

function GameUsers({}) {

  const server = config.server.url;
  const [ gameUsers, setGameUsers ] = useState([]);
  let [ gameId, setGameId ] = useState();

  const search = (e) => {
    e.preventDefault();

    axios.get(`${server}/game/${gameId}/users`).then(data => {
      setGameUsers(data.data);
    }).catch(err => console.log(err));
  }

  return (
    <div>
      <h2>Game's Users</h2>

      <form onSubmit={search}>
        <input type="text" placeholder="Enter Game ID" value={gameId || ''} onChange={e => setGameId(e.target.value)} />
        <button>Search</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Full Name</th>
            <th>Balance</th>
            <th>Total Deposit</th>
            <th>Status</th>
            <th>User Type</th>
            <th>Phone</th>
            <th>Last Login</th>
            <th>Updated At</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {gameUsers.map((user, index) => {
            return (
              <tr key={index}>
                <td data-col="ID">{user.id}</td>
                <td data-col="User Name">{user.user_name}</td>
                <td data-col="Full Name">{user.full_name}</td>
                <td data-col="Balance">{user.balance}</td>
                <td data-col="Total Deposit">{user.total_deposit}</td>
                <td data-col="Status">{user.status}</td>
                <td data-col="User Type">{user.user_type}</td>
                <td data-col="Phone">{user.phone}</td>
                <td data-col="Last Login">{user.last_login}</td>
                <td data-col="Updated At">{user.updated_at}</td>
                <td data-col="Created At">{user.created_at}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default GameUsers;