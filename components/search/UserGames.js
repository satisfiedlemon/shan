import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';

function UserGames({ setter }) {

  const server = config.server.url;
  const [ userGames, setUserGames ] = useState([]);
  let [ userId, setUserId ] = useState();
  const [pager, setPager] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const search = (e) => {
    e.preventDefault();

    axios.get(`${server}/user/${userId}/games`).then(data => {
      console.log(data)
      setUserGames(data.data);
      // setter(data.data);
    }).catch(err => console.log(err));
  }

  const nextPage = async () => {
    if (pager != totalPage) {
      setPager(pager++);

      await axios
        .get(`${server}/user?page=${pager}`)
        .then(data => {
          setUsers(data.data);
          setPager(data.data.page);
        })
        .catch(err => console.log(err));
    }
  }

  const prevPage = async () => {
    if (pager > 1) {
      setPager(pager--);
    
      await axios
        .get(`${server}/user?page=${pager}`)
        .then(data => {
          setPager(data.data.page);
          setUsers(data.data);
        })
        .catch(err => console.log(err));
    }
  }

  const goToPage = async (page) => {
    setPager(page);

    await axios
        .get(`${server}/user?page=${page}`)
        .then(data => {
          setPager(data.data.page);
          setUsers(data.data);
        })
        .catch(err => console.log(err));
  }

  const paginate = () => {
    let ar = [];

    for (let i = 1; i <= totalPage; i++) {
      ar.push(<p key={i} onClick={() => goToPage(i)}>{i}</p>);
    }

    return ar;
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

      <ul>
        <li>
          <p onClick={() => prevPage()}>Previous</p>
        </li>
        <li>
          { paginate() }
        </li>
        <li>
          <p onClick={() => nextPage()}>Next</p>
        </li>
      </ul>
    </div>
  )
}

export default UserGames;