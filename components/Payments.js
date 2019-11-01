import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

import UserPayments from './search/UserPayments';
import NewPayment from './create/NewPayment';

function Payments({}) {

  const server = config.server.url;
  const [ payments, setPayments ] = useState([]);

  useEffect(() => {
    axios.get(`${server}/payment`).then(data => {
      setPayments(data.data);
    }).catch(err => console.log(err));
  }, []);

  return (
    <div className="main-content">
      <h2>Payments</h2>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Amount Paid</th>
            <th>Coins</th>
            <th>Bonus</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p, index) => {
            return (
              <tr key={index}>
                <td data-col="ID">{p.id}</td>
                <td data-col="User ID">{p.user_id}</td>
                <td data-col="Amount Paid">{p.amount_paid}</td>
                <td data-col="Coins">{p.coins}</td>
                <td data-col="Bonus">{p.bonus}</td>
                <td data-col="Created At">{p.created_at}</td>
                <td data-col="Updated At">{p.updated_at}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <UserPayments />

      <NewPayment />
      
    </div>
  );
}

export default Payments;