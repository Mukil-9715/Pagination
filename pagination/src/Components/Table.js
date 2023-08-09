import React, { useState, useEffect } from "react";
import "./Table.css";

const BeerList = () => {
  const perPage = 10;
  const [beer, setBeer] = useState([]);
  const [Page, setPage] = useState(1);

  useEffect(() => {
    fetchdata(Page);
  }, [Page]);

  const fetchdata = (page) => {
    const apiUrl = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setBeer(data);
      });
  };

  const handlePagination = () => {
    const pagination = [];

    pagination.push(
      <button
        key="previous"
        onClick={() => setPage(Page - 1)}
        disabled={Page === 1}
      >
        Previous
      </button>
    );

    for (let i = Math.max(1, Page - 1); i <= Math.min(10, Page + 1); i++) {
      pagination.push(
        <button
          key={i}
          className={Page === i ? "active" : ""}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      );
    }

    pagination.push(
      <button
        className="button"
        key="next"
        onClick={() => setPage(Page + 1)}
        disabled={Page === 10}
      >
        Next
      </button>
    );

    return pagination;
  };

  return (
    <div className="beer-list">
      <h1>Pagination Task</h1>
      <table className="beer-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Tagline</th>
            <th>First Brewed</th>
            <th>ABV</th>
            <th>Image Url</th>
            <th>Volume (Value)(Unit)</th>
          </tr>
        </thead>
        <tbody>
          {beer.map((beer) => (
            <tr>
              <td>{beer.id}</td>
              <td>{beer.name}</td>
              <td>{beer.tagline}</td>
              <td>{beer.first_brewed}</td>
              <td>{beer.abv}</td>
              <td>{beer.image_url}</td>
              <td>{beer.volume.value} {beer.volume.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">{handlePagination()}</div>
    </div>
  );
};

export default BeerList;
