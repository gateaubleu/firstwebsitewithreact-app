import React from 'react';
import top from "../assets/img/top-decor.png";

function BgContainer({backgroundImage}){
    return(
        <div className="bg-container">
            <img src={backgroundImage} className="bg-home" alt="csgo cheat"/>
            <img src={top} className="top-border-img" alt=""/>
        </div>
    );
}

export default BgContainer;