import React,  { useState } from 'react' 



const CounterButton = () => {
  const [state, setState] = useState(0)

  const changeNumber = () => {
      let newState = state+1;
      setState(newState)
  }
  

  return (
    <button onClick={changeNumber}>
      {state}
    </button>
  )
}

export default CounterButton;