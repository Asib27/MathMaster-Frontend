import { useState, useEffect } from 'react'

const Test = ({ x }) => {
  const [count, setCount] = useState(x)

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleClick = () => {
    setCount(p => p + 1)
  }

  if (!isClient) {
    return (
      <>Loading...</>
    )
  } else {
    return (
      <div>
        <h3>{count}</h3>
        <button className='px-2 border' onClick={handleClick}>INC</button>
      </div>
    )
  }
}

export default Test
