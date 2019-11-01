import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';

function NewGame({}) {

  const server = config.server.url;
  const [ name, setName ] = useState('');
  const [ maxBet, setMaxBet ] = useState();
  const [ minBet, setMinBet ] = useState();
  const [ fee, setFee ] = useState();

  const createGame = (e) => {
    e.preventDefault();
    try {
      axios.post(`${server}/game`, {
        name: name,
        minimum_bet: minBet,
        maximum_bet: maxBet,
        fee: fee
      });
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h2>Create a New Game</h2>

      <form onSubmit={createGame}>
        <input type="text" placeholder="Enter Game Name" value={name || ''} onChange={e => setName(e.target.value)} />
        <input type="text" placeholder="Enter the Minimum Bet Amount" value={minBet || ''} onChange={e => setMinBet(e.target.value)} />
        <input type="text" placeholder="Enter the Maximum Bet Amount" value={maxBet || ''} onChange={e => setMaxBet(e.target.value)} />
        <input type="text" placeholder="Enter the Fee" value={fee || ''} onChange={e => setFee(e.target.value)} />
        <button>Create</button>
      </form>
    </div>
  )
}

export default NewGame;