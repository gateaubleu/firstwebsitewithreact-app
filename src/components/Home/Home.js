import React from 'react';
import main from '../../assets/img/try.png';
import provideGround from '../../assets/img/provide.png';
import BgContainer from "../BgContainer";

function Home (){
    return (
        <div id="home">
          <BgContainer backgroundImage={main} />

            <div id="home-content" className="content container">
                <h1 style={{textTransform: 'uppercase', fontWeight: 'bold'}}>What we provide</h1>
                <p>Notre cheat est de bonne qualité, mais nous savons que personne ne veux se ruiner pour pouvoir activer à tous moment, donc nos prix sont assez bas par apport à la concurrence.</p>


                <img className="img-fluid mx-auto d-block" src={provideGround} alt=""/>

            </div>
        </div>
    );
}

export default Home;