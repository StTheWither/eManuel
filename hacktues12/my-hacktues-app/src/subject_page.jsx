import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import SubscriptionApp from './subscription_page'
import AuthPage from './log_in_page'
import SubjectAPP from './subject_page'
import './subject_page.css'

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


      
      {page === "login" && <AuthPage />}
      {page === "subjects" && <SubjectAPP />}
      {page === "subscription" && <SubscriptionApp />}
      </div>
    )
  }

function SubjectAPP(){

    

    const ScrollToSection = (id) => {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
};
    function GeneralSubjects(){
        return(
            <div>
                <div className='div1'>Основни предмети</div>
                <button className="b1" onClick={() => ScrollToSection("eng")}>Английски език</button>
                <button className="b2" onClick={() => ScrollToSection("math")}>Математика</button>
                <button className="b3"onClick={() => ScrollToSection("bul")}>Български</button>
                <button className="b4" onClick={() => ScrollToSection("his")}>История</button>
                <button className="b5" onClick={() => ScrollToSection("che")}>Химия</button>
                <button className="b6" onClick={() => ScrollToSection("geo")}>География</button>
                <button className="b7"onClick={() => ScrollToSection("fiz")}>Физика</button>
            </div>
        )
    }
    function SecandorySubjects(){
        return(
            <div>
                <div className='div2'>Специализирани предмети</div>
                <button className="b9" onClick={() => ScrollToSection("prog")}>Програмиране</button>
                <button className="b10" onClick={() => ScrollToSection("bis")}>Предприемачество и Бизнес</button>
            </div>
        )
    

    function EngTxt( {message} ){
        
        return(
                <div id='eng'>
                    <img src='pp.png' width='30' />
                        {message}

                </div>
        )

        
    }
    function MatTxt( {message} ){
        
        return(
                <div id='math'>
                    

                </div>
        )

        
    }

    function BulTxt( {message} ){
        
        return(
                <div id='bul'>
                    <img src='pp.png' width='30' />
                        {message}

                </div>
        )

        
    }

    function HisTxt( {message} ){
        
        return(
                <div id='his'>
                    <img src='pp.png' width='30' />
                        {message}

                </div>
        )

        
    }

    function CheTxt( {message} ){
        
        return(
                <div id='che'>
                    <img src='pp.png' width='30' />
                        {message}

                </div>
        )

        
    }

    function GeoTxt( {message} ){
        
        return(
                <div id='geo'>
                    <img src='pp.png' width='30' />
                        
                        {message}

                </div>
        )

        
    }
    function FizTxt( {message} ){
        
        return(
                <div id='fiz'>
                    <img src='pp.png' width='30' />
                        
                        {message}

                </div>
        )

        
    }
    function BisTxt( {message} ){
        
        return(
                <div id='bis'>
                    <img src='pp.png' width='30' />
                       
                        {message}

                </div>
        )

        
    }
    function ProgTxt( {message} ){
        
        return(
                <div id='prog'>
                    <img src='pp.png' width='30' />
                        {message}

                </div>
        )

        
    }

    }



    return(
        <>
            <>
                <NavBar />
            </>
            <>
                <GeneralSubjects />
            </>
            <>
                <SecandorySubjects />
            </>
        </>
    )
}

export default SubjectAPP;