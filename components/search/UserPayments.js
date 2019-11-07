import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';

import Pagination from '../table/Pagination';

function UserPayments({ }) {

  const server = config.server.url;
  const [ results, setResults ] = useState([]);
  let [ userId, setUserId ] = useState();
  const [pager, setPager] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const search = (e) => {
    e.preventDefault();
    
    axios.get(`${server}/user/${userId}/payments`).then(data => {
      console.log(data.data)
      setResults(data.data);
      setTotalPage(data.data.lastPage);
      setPager(data.data.page);
    }).catch(err => console.log(err));
  }

  return (
    <div>
      <h2>User's Payments</h2>

      <form onSubmit={search}>
        <input type="text" placeholder="Enter User ID" value={userId || ''} onChange={e => setUserId(e.target.value)} />
        <button>Search</button>
      </form>

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
          {results.data ? (
            results.data.map((p, index) => {
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
            })
          ) : (
            <tr>
              <td colSpan="100%">No user payments</td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination pageData="user" searchData="payments" id={userId} newPageData={setResults} pageNumber={setPager} totalPages={totalPage} currentPage={pager}  />

    </div>
  )
}

export default UserPayments;