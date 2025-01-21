import React from 'react'

function App() {
  return (
    <div>
      <h1>Remote App</h1>
      <p>Remote app is running on port 3001!</p>
      <span style={{color: "red"}}>
        This is a remote component that is being rendered in the host app.
      </span>
    </div>
  )
}

export default App
