import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)


  function loginPage(){
    return(
      <div>
          <p>Want to join out cause</p>
          <button className='loginbut'>LOGIN</button>
      </div>
    )
  }

      function openSub(){
         window.location.href = 'subject_page.jsx';
          
        
      }

  function navBar(){
    return(
      <div className="header">
        <img src="img1.png" width="50"></img>
        <button className='but1' onClick={openSub} >Subjects</button>
        <button className='but2' >Teachers</button>
         <button className='but3'>Subscripton</button>
        <button className='but4' >Sign in</button>
      </div>
    )
  }

  return (
    <>
      
              
      <navBar/>
      
    </>
  )
}


export default App
