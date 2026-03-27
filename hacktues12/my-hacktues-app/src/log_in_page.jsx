import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './log_in_page.css'
import App from './App'

function NavBar(){
     const [page, setPage] = useState("login");
    return(
      <div className="header">
        <img src="img1.png" width="50"></img>
        <button className='butm'onClick={() => setPage("mainpage")}>Main page</button>
        <button className='but1' onClick={() => setPage("subjects")} >Subjects</button>
        <button className='but2' >Teachers</button>
        <button className='but3' onClick={() => setPage("subscription")}>Subscripton</button>
        <button className='but4' onClick={() => setPage("login") }>Log in</button>

      {page === "mainpage" && <App/> }
      {page === "login" && <AuthPage />}
      {page === "subjects" && <SubjectApp />}
      {page === "subscription" && <SubscriptionApp />}
      </div>
    )
  }

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <>
      <NavBar />

      <div className="authContainer">
        <div className="authCard">
          <h1>{isLogin ? "Вход" : "Регистрация"}</h1>

          {!isLogin && (
            <input
              type="text"
              placeholder="Име"
              className="inputField"
            />
          )}

          <input
            type="email"
            placeholder="Имейл"
            className="inputField"
          />

          <input
            type="password"
            placeholder="Парола"
            className="inputField"
          />

          <button className="subscribeBtn">
            {isLogin ? "Вход" : "Създай акаунт"}
          </button>

          <p className="switchText">
            {isLogin ? "Нямаш акаунт?" : "Вече имаш профил?"}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Регистрирай се" : " Влез"}
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

export default AuthPage;