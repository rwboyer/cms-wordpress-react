import React, {useState, useEffect} from 'react'
import axios from 'axios'

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData)
  const [url, setUrl] = useState(initialUrl)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    function getFetchUrl() {
      console.log(url)
      return url
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
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
}

export default useDataApi