import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './log_in_page.css'



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

export default AuthPage
