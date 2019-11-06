import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from "yup";
import config from '../config';

import UserPayments from './search/UserPayments';
import NewPayment from './create/NewPayment';
import InputTableCell from './table/InputTableCell';

function Payments({}) {

  const server = config.server.url;
  const [ payments, setPayments ] = useState([]);
  const [pager, setPager] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    axios
      .get(`${server}/payment`, { signal: signal })
      .then(data => {
        setPayments(data.data);
        setTotalPage(data.data.lastPage);
        setPager(data.data.page);
      }).catch(err => console.log(err));

      return function cleanup() {
        abortController.abort();
      }
  }, []);

  // useEffect(() => {
  //   axios.get(`${server}/payment`).then(data => {
  //     setPayments(data.data.data);
  //   }).catch(err => console.log(err));
  // }, [payments]);

  const nextPage = async () => {
    if (pager != totalPage) {
      setPager(pager++);

      await axios
        .get(`${server}/payment?page=${pager}`)
        .then(data => {
          setPayments(data.data);
          setPager(data.data.page);
        })
        .catch(err => console.log(err));
    }
  }

  const prevPage = async () => {
    if (pager > 1) {
      setPager(pager--);
    
      await axios
        .get(`${server}/payment?page=${pager}`)
        .then(data => {
          setPager(data.data.page);
          setPayments(data.data);
        })
        .catch(err => console.log(err));
    }
  }

  const goToPage = async (page) => {
    setPager(page);

    await axios
        .get(`${server}/payment?page=${page}`)
        .then(data => {
          setPager(data.data.page);
          setPayments(data.data);
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
                  <tr>
                    <td data-col="ID">{p.id}</td>
                    <td data-col="User ID">
                      <InputTableCell data="userId" type="number" value={p.user_id} />
                    </td>
                    <td data-col="Amount Paid">
                      <InputTableCell data="amountPaid" type="number" value={p.amount_paid} />
                    </td>
                    <td data-col="Coins">
                      <InputTableCell data="coins" type="number" value={p.coins} />
                    </td>
                    <td data-col="Bonus">
                      <InputTableCell data="bonus" type="number" value={p.bonus} />
                    </td>
                    <td data-col="Created At">{p.created_at}</td>
                    <td data-col="Updated At">{p.updated_at}</td>
                  </tr>
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

      <UserPayments />

      <NewPayment setter={setPayments} />
      
    </div>
  );
}

export default Payments;