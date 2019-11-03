import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from "yup";
import config from '../config';

import GameUsers from './search/GameUsers';
import NewGame from './create/NewGame';
import InputTableCell from './.table/InputTableCell';

function Games({}) {

  const server = config.server.url;
  const [ games, setGames ] = useState([]);

  useEffect(() => {
    axios.get(`${server}/game`).then(data => {
      setGames(data.data);
    }).catch(err => console.log(err));
  }, []);

  return (
    <div className="main-content">
      <h2>Games</h2>

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
          {games.map((game, index) => {
            return (
              <tr key={index}>
                <td data-col="ID">
                  
                </td>
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

      <GameUsers />

      <NewGame />
    </div>
  );
}

export default Games;