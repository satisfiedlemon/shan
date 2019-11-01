import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';

function UserGames({}) {

  const server = config.server.url;
  const [ userGames, setUserGames ] = useState([]);
  let [ userId, setUserId ] = useState();

  const search = (e) => {
    e.preventDefault();

    axios.get(`${server}/user/${userId}/games`).then(data => {
      setUserGames(data.data);
    }).catch(err => console.log(err));
  }

  return (
    <div>
      <h2>User's Games</h2>

      <form onSubmit={search}>
        <input type="text" placeholder="Enter User ID" value={userId || ''} onChange={e => setUserId(e.target.value)} />
        <button>Search</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Min Bet</th>
            <th>Max Bet</th>
            <th>Fee</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {userGames.map((game, index) => {
            return (
              <tr key={index}>
                <td data-col="ID">{game.id}</td>
                <td data-col="Name">{game.name}</td>
                <td data-col="Min Bet">{game.minimum_bet}</td>
                <td data-col="Max Bet">{game.maximum_bet}</td>
                <td data-col="Fee">{game.fee}</td>
                <td data-col="Created At">{game.created_at}</td>
                <td data-col="Updated At">{game.updated_at}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UserGames;