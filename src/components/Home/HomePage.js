import React from 'react';
import main from '../../assets/img/try.png';
import provideGround from '../../assets/img/provide.png';
import BgContainer from "../BgContainer";

function HomePage (){
    return (
        <div id="home">
          <BgContainer backgroundImage={main} />

            <div id="home-content" className="content container">
                <h1 style={{textTransform: 'uppercase', fontWeight: 'bold'}}>What we provide</h1>
                <p>Our cheat is external, and made for legit player, Cheap, safe with a lot of humanized features, stay under the radar and never get vac banned again, come with us and grab some balls.</p>

                <img className="img-fluid mx-auto d-block" src={provideGround} alt=""/>

            </div>
        </div>
    );
}

export default HomePage;