import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './subscription_page.css'


function NavBar(){
     const [page, setPage] = useState("subscription");
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
  

function SubscriptionSection() {
  const [selectedPlan, setSelectedPlan] = useState(1)

  const plans = {
    1: { label: "1 месец", price: "5€" },
    3: { label: "3 месеца", price: "10€" },
    12: { label: "12 месеца", price: "20€" }
  }

  return (
    <div className="pricing">
      <h1>Абонамент</h1>

      <div className="planSelector">
        {Object.keys(plans).map((key) => (
          <button
            key={key}
            className={selectedPlan == key ? "activePlan" : ""}
            onClick={() => setSelectedPlan(key)}
          >
            {plans[key].label}
          </button>
        ))}
      </div>

      <div className="singleCard">
        <h2>{plans[selectedPlan].label}</h2>
        <h1>{plans[selectedPlan].price}</h1>

        <ul>
          <li>Всички предмети</li>
          <li>Неограничени тестове</li>
          <li>AI помощ</li>
        </ul>

        <button className="subscribeBtn">
          Абонирай се
        </button>
      </div>
    </div>
  )
}

function SubscriptionApp() {
  return (
    <>
      <NavBar />
      <SubscriptionSection />
    </>
  )
}

export default SubscriptionApp
