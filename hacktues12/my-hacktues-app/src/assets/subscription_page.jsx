import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './subscription_page.css'

function NavBar() {
  return (
    <nav className="navbar">
      <h2>EduPlatform</h2>
      <button className="loginBtn">Login</button>
    </nav>
  )
}

function PricingCard({ title, price, features }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <h2>{price}</h2>

      <ul>
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      <button className="subscribeBtn">Абонирай се</button>
    </div>
  )
}

function SubscriptionSection() {
  return (
    <div className="pricing">
      <h1>Абонаментни планове</h1>

      <div className="cards">
        <PricingCard
          title="Basic"
          price="5€/месец"
          features={[
            "Основни предмети",
            "Ограничени тестове"
          ]}
        />

        <PricingCard
          title="Pro"
          price="10€/месец"
          features={[
            "Всички предмети",
            "Неограничени тестове",
            "AI помощ"
          ]}
        />

        <PricingCard
          title="Premium"
          price="20€/месец"
          features={[
            "Всичко от Pro",
            "Персонални уроци",
            "Приоритетна поддръжка"
          ]}
        />
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