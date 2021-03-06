import React, { useState, useEffect, useRef } from 'react';
import useInterval from '../lib/useinterval'

export default function Counter (){
  let [count, setCount] = useState(0)

  useInterval(() => {
    setCount(count + 1)
  }, 1000)
  
  return <h1>{count}</h1>
}