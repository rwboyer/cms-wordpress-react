import React, {useState, useEffect} from 'react'
import axios from 'axios'

const useHackerNews = () => {
  const [data, setData] = useState({hits: []})
  const [query, setQuery] = useState("react")
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    function getFetchUrl() {
      console.log(query)
      return 'https://hn.algolia.com/api/v1/search?query=' + query;
    }

    async function fetchData() {
      setIsLoading(true)
      setIsError(false)
      try{
        const result = await axios(getFetchUrl());
        setData(result.data);
      }
      catch(error){
        setIsError(true)
      }
      setIsLoading(false)
    }

    fetchData();
  }, [query]);

  return [{ data, isLoading, isError }, setQuery];
}

export default useHackerNews