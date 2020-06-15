import React, {useState, useEffect, useReducer} from 'react'
import axios from 'axios'

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return { ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case 'FETCH_FAILURE':
      return { ...state,
      isLoading: false,
      isError: true
    };
    default:
      throw new Error();
  }
};

const useReducerApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl)

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  })

  useEffect(() => {
    function getFetchUrl() {
      console.log(url)
      return url
    }

    async function fetchData() {
      dispatch({ type: 'FETCH_INIT' });
      try{
        const result = await axios(getFetchUrl());
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      }
      catch(error){
        dispatch({ type: 'FETCH_FAILURE' });
      }
    }

    fetchData();
  }, [url]);

  return [state, setUrl];
}

export default useReducerApi