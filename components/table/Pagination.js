import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import config from '../../config';

function Pagination({ pageData, newPageData, pageNumber, totalPages, currentPage }) {

  const server = config.server.url;

  const nextPage = async () => {
    if (currentPage != totalPages) {
      pageNumber(currentPage++);

      await axios
        .get(`${server}/${pageData}?page=${currentPage}`)
        .then(data => {
          newPageData(data.data);
          pageNumber(data.data.page);
        })
        .catch(err => console.log(err));
    }
  }

  const prevPage = async () => {
    if (currentPage > 1) {
      pageNumber(currentPage--);
    
      await axios
        .get(`${server}/${pageData}?page=${currentPage}`)
        .then(data => {
          pageNumber(data.data.page);
          newPageData(data.data);
        })
        .catch(err => console.log(err));
    }
  }

  const goToPage = async (page) => {
    pageNumber(page);

    await axios
        .get(`${server}/${pageData}?page=${page}`)
        .then(data => {
          pageNumber(data.data.page);
          newPageData(data.data);
        })
        .catch(err => console.log(err));
  }

  const paginate = () => {
    let ar = [];

    for (let i = 1; i <= totalPages; i++) {
      ar.push(<p key={i} className="pages" onClick={() => goToPage(i)}>{i}</p>);
    }

    return ar;
  }

  return (
    <>
      <ul className="pagination">
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
    </>
  )
}

export default Pagination;