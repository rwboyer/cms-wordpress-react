import React, { useState, useEffect } from "react";
//import ReactDOM from "react-dom";
import axios from 'axios';
import { useForm } from "react-hook-form";

export default function SearchResults() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux')
  const {register, handleSubmit} = useForm();

  useEffect(() => {
    function getFetchUrl() {
      console.log(query)
      return 'https://hn.algolia.com/api/v1/search?query=' + query;
    }

    async function fetchData() {
      const result = await axios(getFetchUrl());
      setData(result.data);
    }

    fetchData();
  }, [query]);

  function onSubmitForm(formData) {
    console.log('submit: ' + formData.query)
    setQuery(formData.query);
  }  

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <label>
          Query:
          <input type="text" name="query" ref={register} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

//const rootElement = document.getElementById("root");
//ReactDOM.render(<SearchResults />, rootElement);
