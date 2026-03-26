import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function subjectAPP(){
    function generalSubjects(){
        return(
            <div>
                <div className='div1'>Основни предмети</div>
                <button className="b1">Английски език</button>
                <button className="b2">Математика</button>
                <button className="b3">Български</button>
                <button className="b4">История</button>
                <button className="b5">Химия</button>
                <button className="b6">География</button>
                <button className="b7">Физика</button>
            </div>
        )
    }
    function secandorySubjects(){
        return(
            <div>
                <div className='div2'>Специализирани предмети</div>
                <button className="b9">Програмиране</button>
                <button className="b10">Предприемачество и Бизнес</button>
            </div>
        )
    }


    return(
            <>
            <navBar />
            <generalSubjects />
            <secandorySubjects />
            </>
    )
}