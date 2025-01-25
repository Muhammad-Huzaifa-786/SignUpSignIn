import React from 'react'
import { useNavigate } from 'react-router-dom'
function Welcome() {
    const navigate = useNavigate()
  return (
      <div><br /><br />
      <button onClick={()=>{
            navigate(localStorage.getItem('token') ? '/dashboard' : '/login')
        }}>Click Me </button>

    </div>
  )
}

export default Welcome