import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './subscription_page.css'



function SubscriptionSection() {
  const [selectedPlan, setSelectedPlan] = useState(1)

  function navBar(){
    return(
      <div className="header">
        <img src="img1.png" width="50"></img>
        <button className='but1'  >Subjects</button>
        <button className='but2' >Teachers</button>
         <button className='but3'>Subscripton</button>
        <button className='but4' >Sign in</button>
      </div>
    )
  }
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
      <navBar />
      <SubscriptionSection />
    </>
  )
}

export default SubscriptionApp



createRoot(document.getElementById('root')).render(
    <StrictMode>
        <SubscriptionApp/>
    </StrictMode>
)