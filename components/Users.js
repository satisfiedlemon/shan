import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, useField } from 'formik';
import config from '../config';

import UserGames from './search/UserGames';
import NewUser from './create/NewUser';

function Users({}) {

  const server = config.server.url;
  const [ users, setUsers ] = useState([]);

  const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

  // Styled components ....
  const StyledSelect = styled.select`
    color: var(--blue);
  `;

  const StyledErrorMessage = styled.div`
    font-size: 12px;
    color: var(--red-600);
    width: 400px;
    margin-top: 0.25rem;
    &:before {
      content: "❌ ";
      font-size: 10px;
    }
    @media (prefers-color-scheme: dark) {
      color: var(--red-300);
    }
  `;

  const StyledLabel = styled.label`
    margin-top: 1rem;
  `;

  useEffect(() => {
    axios.get(`${server}/user`).then(data => {
      setUsers(data.data);
    }).catch(err => console.log(err));
  }, []);

  return (
    <div className="main-content">
      <h2>Users</h2>

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
          {users.map((user, index) => {
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

      <UserGames />

      <NewUser />

    </div>
  );
}

export default Users;