import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from "yup";
import config from '../config';

import UserPayments from './search/UserPayments';
import NewPayment from './create/NewPayment';
import InputTableCell from './table/InputTableCell';
import Pagination from './table/Pagination';

function Payments({}) {

  const server = config.server.url;
  const [ payments, setPayments ] = useState([]);
  const [pager, setPager] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    axios
      .get(`${server}/payment`)
      .then(data => {
        setPayments(data.data);
        setTotalPage(data.data.lastPage);
        setPager(data.data.page);
      }).catch(err => console.log(err));
  }, []);

  // useEffect(() => {
  //   axios.get(`${server}/payment`).then(data => {
  //     setPayments(data.data.data);
  //   }).catch(err => console.log(err));
  // }, [payments]);

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
          {payments.data ? (
            payments.data.map((p, index) => {
              return (
                <Formik
                  key={index}
                  initialValues={{
                    userId: p.user_id,
                    amountPaid: p.amount_paid,
                    coins: p.coins,
                    bonus: p.bonus
                  }}
                  validationSchema={Yup.object({
                    userId: Yup.number()
                      .integer()
                      .required("Required"),
                    amountPaid: Yup.number()
                      .required("Required"),
                    coins: Yup.number()  
                      .integer()
                      .required("Required"),
                    bonus: Yup.number()  
                      .integer()
                      .required("Required")
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    try {
                      axios.put(`${server}/payment/${p.id}`, {
                        user_id: values.userId,
                        amount_paid: values.amountPaid,
                        coins: values.coins,
                        bonus: values.bonus,
                        updated_at: new Date()
                      });
                    } catch (err) {
                      console.log(err)
                    }
                  }}
                >
                  {props => (
                    <tr>
                      <td data-col="ID">{p.id}</td>
                      <td data-col="User ID">
                        <InputTableCell data="userId" type="number" value={p.user_id} submit={props} />
                      </td>
                      <td data-col="Amount Paid">
                        <InputTableCell data="amountPaid" type="number" value={p.amount_paid} submit={props} />
                      </td>
                      <td data-col="Coins">
                        <InputTableCell data="coins" type="number" value={p.coins} submit={props} />
                      </td>
                      <td data-col="Bonus">
                        <InputTableCell data="bonus" type="number" value={p.bonus} submit={props} />
                      </td>
                      <td data-col="Created At">{p.created_at}</td>
                      <td data-col="Updated At">{p.updated_at}</td>
                    </tr>
                  )}
                </Formik>
              );
            })
          ) : (
            <tr>
              <td colSpan="100%">No payments</td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination pageData="payment" newPageData={setPayments} pageNumber={setPager} totalPages={totalPage} currentPage={pager}  />

      <UserPayments />

      <NewPayment setter={setPayments} />
      
    </div>
  );
}

export default Payments;