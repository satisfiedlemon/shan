import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from "yup";
import config from '../config';

import UserGames from './search/UserGames';
import NewUser from './create/NewUser';
import InputTableCell from './table/InputTableCell';
import SelectTableCell from './table/SelectTableCell';

function Users({}) {

  const server = config.server.url;
  const [ users, setUsers ] = useState([]);

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
              <Formik
                key={index}
                initialValues={{
                  userName: user.user_name,
                  fullName: user.full_name,
                  balance: user.balance,
                  totalDeposit: user.total_deposit,
                  status: user.status,
                  userType: user.user_type,
                  phone: user.phone
                }}
                validationSchema={Yup.object({
                  userName: Yup.string()
                    .min(3, "Must be 3 characters or less")
                    .max(50, "Too long")
                    .required("Required"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  try {
                    axios.put(`${server}/user/${user.id}`, {
                      user_name: values.userName,
                      full_name: values.fullName,
                      balance: values.balance,
                      total_deposit: values.totalDeposit,
                      status: values.status,
                      user_type: values.userType,
                      phone: values.phone,
                      updated_at: new Date()
                    });
                  } catch (err) {
                    console.log(err)
                  }

                  // setTimeout(() => {
                  //   alert("saved")
                  // }, 400);
                }}
              >
                <tr>
                  <td data-col="ID">{user.id}</td>
                  <td data-col="User Name">
                    <InputTableCell data="userName" value={user.user_name} type="text" />
                  </td>
                  <td data-col="Full Name">
                    <InputTableCell data="fullName" value={user.full_name} type="text" />
                  </td>
                  <td data-col="Balance">
                    <InputTableCell data="balance" value={user.balance} type="number" />
                  </td>
                  <td data-col="Total Deposit">
                    <InputTableCell data="totalDeposit" value={user.total_deposit} type="number" />
                  </td>
                  <td data-col="Status">
                    <SelectTableCell data="status" value={user.status} options={['active', 'inactive']} />
                  </td>
                  <td data-col="User Type">
                    <SelectTableCell data="userType" value={user.user_type} options={['player', 'admin']} />
                  </td>
                  <td data-col="Phone">
                    <InputTableCell data="phone" value={user.phone} type="text" />
                  </td>
                  <td data-col="Last Login">{user.last_login}</td>
                  <td data-col="Updated At">{user.updated_at}</td>
                  <td data-col="Created At">{user.created_at}</td>
                </tr>

              </Formik>
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