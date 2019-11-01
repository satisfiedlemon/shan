import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';

function NewPayment({}) {

  const server = config.server.url;
  const [ userId, setUserId ] = useState();
  const [ amountPaid, setAmountPaid ] = useState();
  const [ coins, setCoins ] = useState();
  const [ bonus, setBonus ] = useState();

  const createPayment = (e) => {
    e.preventDefault();
    try {
      axios.post(`${server}/payment`, {
        user_id: userId,
        amount_paid: amountPaid,
        coins: coins,
        bonus: bonus
      });
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h2>Create a New Payment</h2>

      <form onSubmit={createPayment}>
        <input type="text" placeholder="Enter User ID" value={userId || ''} onChange={e => setUserId(e.target.value)} />
        <input type="text" placeholder="Enter Amount Paid" value={amountPaid || ''} onChange={e => setAmountPaid(e.target.value)} />
        <input type="text" placeholder="Enter Coins" value={coins || ''} onChange={e => setCoins(e.target.value)} />
        <input type="text" placeholder="Enter Bonus" value={bonus || ''} onChange={e => setBonus(e.target.value)} />
        <button>Create</button>
      </form>
    </div>
  )
}

export default NewPayment;