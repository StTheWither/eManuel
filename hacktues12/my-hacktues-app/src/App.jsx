import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import AuthPage from "./log_in_page.jsx";
import SubscriptionApp from "./subscription_page.jsx";
import SubjectApp from "./subject_page.jsx";
import './App.css'

function NavBar(){
     const [page, setPage] = useState("mainpage");
    return(
      <div className="header">
        <img src="img1.png" width="50"></img>
        <button className='butm'onClick={() => setPage("mainpage")}>Main page</button>
        <button className='but1' onClick={() => setPage("subjects")} >Subjects</button>
        <button className='but2' >Teachers</button>
        <button className='but3' onClick={() => setPage("subscription")}>Subscripton</button>
        <button className='but4' onClick={() => setPage("login") }>Log in</button>


    
      </div>
    )
  }


  function AppMainTxt(){
    return(
      <>
      <div className='maint'>
        Учете не зависимо то това къде сте.
      </div> 
      </>
    )
  }

function MyList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const apiUrl = "https://educrave.onrender.com/api/items";

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setItems(data); 
      })
      .catch(error => console.error("Error connecting to backend:", error));
  }, []);

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}



function App() {
  const [count, setCount] = useState(0)
  const apiUrl = process.env.REACT_APP_API_URL + "/api/items"; 



        
      

  
  return (
    <>
        <>  
        <NavBar setPage={setPage} />

      {page === "mainpage" && <AppMainTxt />}
      {page === "login" && <AuthPage />}
      {page === "subjects" && <SubjectApp />}
      {page === "subscription" && <SubscriptionApp />}
        </>

        <AppMainTxt />

    </>
  )
}


export default App;