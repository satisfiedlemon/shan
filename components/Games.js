import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from "yup";
import config from '../config';

import GameUsers from './search/GameUsers';
import NewGame from './create/NewGame';
import InputTableCell from './table/InputTableCell';

function Games({}) {

  const server = config.server.url;
  const [ games, setGames ] = useState([]);
  const [pager, setPager] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    axios
      .get(`${server}/game`, { signal: signal })
      .then(data => {
        console.log(data.data)
        setGames(data.data);
        setPager(data.data.page);
        setTotalPage(data.data.lastPage);
      }).catch(err => console.log(err));

      return function cleanup() {
        abortController.abort();
      }
  }, []);

  // useEffect(() => {
  //   axios.get(`${server}/game`).then(data => {
  //     setGames(data.data.data);
  //   }).catch(err => console.log(err));
  // }, [games]);

  const nextPage = async () => {
    if (pager != totalPage) {
      setPager(pager++);

      await axios
        .get(`${server}/game?page=${pager}`)
        .then(data => {
          setGames(data.data);
          setPager(data.data.page);
        })
        .catch(err => console.log(err));
    }
  }

  const prevPage = async () => {
    if (pager > 1) {
      setPager(pager--);
    
      await axios
        .get(`${server}/game?page=${pager}`)
        .then(data => {
          setPager(data.data.page);
          setGames(data.data);
        })
        .catch(err => console.log(err));
    }
  }

  const goToPage = async (page) => {
    setPager(page);

    await axios
        .get(`${server}/game?page=${page}`)
        .then(data => {
          setPager(data.data.page);
          setGames(data.data);
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
          {games.data ? (
            games.data.map((game, index) => {
              return (
                <Formik
                  key={index}
                  initialValues={{
                    name: game.name,
                    minBet: game.minimum_bet,
                    maxBet: game.maximum_bet,
                    fee: game.fee
                  }}
                  validationSchema={Yup.object({
                    name: Yup.string()
                      .min(3, "Must be 3 characters or less")
                      .max(50, "Too long")
                      .required("Required"),
                    minBet: Yup.number()
                      .required("Required"),
                    maxBet: Yup.number()  
                      .required("Required"),
                    fee: Yup.number()  
                      .required("Required"),
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    try {
                      axios.put(`${server}/game/${game.id}`, {
                        name: values.name,
                        minimum_bet: values.minBet,
                        maximum_bet: values.maxBet,
                        fee: values.fee,
                        updated_at: new Date()
                      });
                    } catch (err) {
                      console.log(err)
                    }
                  }}
                >
                  <tr>
                    <td data-col="ID">{game.id}</td>
                    <td data-col="Name">
                      <InputTableCell data="name" type="text" value={game.name} />
                    </td>
                    <td data-col="Min Bet">
                      <InputTableCell data="minBet" type="number" value={game.minimum_bet} />
                    </td>
                    <td data-col="Max Bet">
                      <InputTableCell data="maxBet" type="number" value={game.maximum_bet} />
                    </td>
                    <td data-col="Fee">
                      <InputTableCell data="fee" type="number" value={game.fee} />
                    </td>
                    <td data-col="Created At">{game.created_at}</td>
                    <td data-col="Updated At">{game.updated_at}</td>
                  </tr>
                </Formik>
              );
            })
          ) : (
            <tr>
              <td colSpan="100%">No games</td>
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

      <GameUsers />

      <NewGame setter={setGames} />
    </div>
  );
}

export default Games;