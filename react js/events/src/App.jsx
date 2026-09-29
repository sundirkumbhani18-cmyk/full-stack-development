import { useState } from "react"

function App() {

  const [login,setLogin] = useState(false)
  
  return (
    <>
      <button onClick={ () => setLogin(!login) }>Click</button>

      <h2>
        {
           login ? 'You are Login' : 'You are not login'
        }
      </h2>

    </>
  )



  
}

export default App
