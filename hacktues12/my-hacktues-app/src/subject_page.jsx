import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function subjectAPP(){

    const scrollToSection = (id) => {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
};
    function generalSubjects(){
        return(
            <div>
                <div className='div1'>Основни предмети</div>
                <button className="b1" onClick={() => scrollToSection("eng")}>Английски език</button>
                <button className="b2" onClick={() => scrollToSection("math")}>Математика</button>
                <button className="b3"onClick={() => scrollToSection("bul")}>Български</button>
                <button className="b4" onClick={() => scrollToSection("his")}>История</button>
                <button className="b5" onClick={() => scrollToSection("che")}>Химия</button>
                <button className="b6" onClick={() => scrollToSection("geo")}>География</button>
                <button className="b7"onClick={() => scrollToSection("fiz")}>Физика</button>
            </div>
        )
    }
    function secandorySubjects(){
        return(
            <div>
                <div className='div2'>Специализирани предмети</div>
                <button className="b9" onClick={() => scrollToSection("prog")}>Програмиране</button>
                <button className="b10" onClick={() => scrollToSection("bis")}>Предприемачество и Бизнес</button>
            </div>
        )
    }

    function engTxt( {message} ){
        
        return(
                <div id='eng'>
                    <img src='pp.png' width='30' />
                        {message}

                </div>
        )

        
    }
    function matTxt( {message} ){
        
        return(
                <div id='math'>
                    <img src='pp.png' width='30' />
                        {message}

                </div>
        )

        
    }

    function bulTxt( {message} ){
        
        return(
                <div id='bul'>
                    <img src='pp.png' width='30' />
                        {message}

                </div>
        )

        
    }

    function hisTxt( {message} ){
        
        return(
                <div id='his'>
                    <img src='pp.png' width='30' />
                        {message}

                </div>
        )

        
    }

    function cheTxt( {message} ){
        
        return(
                <div id='che'>
                    <img src='pp.png' width='30' />
                        {message}

                </div>
        )

        
    }

    function geoTxt( {message} ){
        
        return(
                <div id='geo'>
                    <img src='pp.png' width='30' />
                        
                        {message}

                </div>
        )

        
    }
    function fizTxt( {message} ){
        
        return(
                <div id='fiz'>
                    <img src='pp.png' width='30' />
                        
                        {message}

                </div>
        )

        
    }
    function bisTxt( {message} ){
        
        return(
                <div id='bis'>
                    <img src='pp.png' width='30' />
                       
                        {message}

                </div>
        )

        
    }
    function progTxt( {message} ){
        
        return(
                <div id='prog'>
                    <img src='pp.png' width='30' />
                        
                        {message}

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