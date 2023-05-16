import React, { useState } from 'react'
import "./Counter.scss"

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleCount = (increment: boolean) => {
    increment ? setCount((count) => count + 1) : setCount((count) => count - 1);
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => handleCount(true)}>Increment</button>
      <button onClick={() => handleCount(false)}>Decrement</button>
    </div>
  )
}

export default Counter